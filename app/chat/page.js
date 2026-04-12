'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { chat, FREE_CHAT_MODELS, getByopKey } from '@/lib/pollinations'
import { storage } from '@/lib/storage'
import { CHAT_MODES } from '@/lib/prompts'
import BYOPModal from '@/components/BYOPModal'
import { useConfirm } from '@/components/ConfirmModal'

function ChatContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initMode = searchParams.get('mode') || 'regular'

  const [mode, setMode] = useState(initMode)
  const [model, setModel] = useState('nova-fast') // default nova micro
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showBYOP, setShowBYOP] = useState(false)
  const [imagePrompt, setImagePrompt] = useState(null)
  const [savedTs, setSavedTs] = useState(null)
  const [imgFile, setImgFile] = useState(null)

  const bottomRef = useRef(null)
  const taRef = useRef(null)
  const fileRef = useRef(null)
  const currentMode = CHAT_MODES.find(m => m.id === mode) || CHAT_MODES[0]
  const { confirm, Modal } = useConfirm()

  // Load from history
  useEffect(() => {
    const stored = sessionStorage.getItem('load_chat')
    if (stored) {
      try {
        const c = JSON.parse(stored)
        setMessages(c.messages || [])
        setMode(c.mode || 'regular')
        setModel(c.model || 'nova-fast')
      } catch {}
      sessionStorage.removeItem('load_chat')
    }
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto'
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const switchMode = (m) => { setMode(m.id); setModel(m.model || 'nova-fast'); setMessages([]) }

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setImgFile(null)
    setLoading(true)

    try {
      const content = await chat(newMessages, model, currentMode.system)
      const final = [...newMessages, { role: 'assistant', content }]
      setMessages(final)
      storage.addChat({ mode, model, messages: final })
      setSavedTs(Date.now())
    } catch (e) {
      if (e.message === 'quota_exceeded') setShowBYOP(true)
      else setMessages(prev => [...prev, { role: 'system', content: `something broke: ${e.message}` }])
    } finally {
      setLoading(false)
    }
  }

  const renderContent = (text) => {
    if (mode !== 'story') return text
    const parts = text.split(/\[IMAGE:(.*?)\]/g)
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <button key={i} onClick={() => setImagePrompt(part.trim())}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'color-mix(in srgb, var(--ac) 15%, transparent)', color: 'var(--ac)', border: '1px solid var(--ac)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', cursor: 'pointer', margin: '2px', fontFamily: 'inherit' }}>
            generate scene
          </button>
        )
      }
      return part
    })
  }

  return (
    <>
      <Modal />
      <div className="chat-wrap">
        {/* controls */}
        <div style={{ borderBottom: '1px solid var(--bd)', padding: '8px 12px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="tabs">
            {CHAT_MODES.map(m => (
              <button key={m.id} className={`tab ${mode === m.id ? 'active' : ''}`} onClick={() => switchMode(m)}>
                {m.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--fg3)' }}>model:</span>
            <select value={model} onChange={e => setModel(e.target.value)} style={{ width: 'auto', padding: '3px 8px', fontSize: '0.75rem' }}>
              {FREE_CHAT_MODELS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            {getByopKey() && <span style={{ fontSize: '0.7rem', color: 'var(--ok)' }}>BYOP</span>}
            {savedTs && <a href="/history" style={{ fontSize: '0.7rem', color: 'var(--fg3)', marginLeft: 'auto' }}>saved to history</a>}
          </div>
          {currentMode.disclaimer && <p style={{ fontSize: '0.7rem', color: 'var(--fg3)', margin: 0 }}>{currentMode.disclaimer}</p>}
        </div>

        {/* messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--fg3)' }}>
              <p style={{ color: 'var(--fg3)', margin: 0 }}>{currentMode.placeholder}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginTop: '8px', marginBottom: 0 }}>shift+enter for newline</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role === 'user' ? 'user' : msg.role === 'system' ? 'sys' : 'ai'}`}>
              <div className="msg-bubble">
                <div className="msg-label">{msg.role === 'user' ? 'you' : msg.role === 'system' ? 'error' : currentMode.label}</div>
                <div>{renderContent(msg.content)}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg ai">
              <div className="msg-bubble">
                <div className="dots"><div className="dot" /><div className="dot" /><div className="dot" /></div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div className="chat-input-bar">
          {imgFile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--fg3)' }}>
              <span>attached: {imgFile.name}</span>
              <button onClick={() => setImgFile(null)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: 0 }}>✕</button>
            </div>
          )}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
            {/* image upload button */}
            <button
              onClick={() => fileRef.current?.click()}
              className="icon-btn"
              title="attach image"
              style={{ flexShrink: 0, marginBottom: '2px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.75} />
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.75} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 15l-5-5L5 21" />
              </svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setImgFile(e.target.files?.[0] || null)} />

            <textarea
              ref={taRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder={currentMode.placeholder}
              rows={1}
              style={{ resize: 'none', flex: 1, maxHeight: '120px', overflowY: 'auto' }}
            />
            <button onClick={send} disabled={!input.trim() || loading} className="btn btn-p" style={{ padding: '8px 14px', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          {messages.length > 0 && (
            <button
              onClick={async () => {
                const ok = await confirm('clear this chat? (already saved to history tho)')
                if (ok) setMessages([])
              }}
              style={{ fontSize: '0.7rem', color: 'var(--fg3)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
            >
              clear chat
            </button>
          )}
        </div>
      </div>

      {/* story image modal */}
      {imagePrompt && (
        <div className="modal-overlay" onClick={() => setImagePrompt(null)}>
          <div className="modal-box" style={{ padding: '20px' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '8px' }}>generate this scene?</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '12px' }}>{imagePrompt}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-p" style={{ flex: 1 }} onClick={() => {
                sessionStorage.setItem('prefill_prompt', imagePrompt)
                setImagePrompt(null)
                router.push('/image')
              }}>go to image page</button>
              <button className="btn btn-s" onClick={() => setImagePrompt(null)}>cancel</button>
            </div>
          </div>
        </div>
      )}

      {showBYOP && <BYOPModal onClose={() => setShowBYOP(false)} />}
    </>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: 'var(--fg3)' }}>loading...</div>}>
      <ChatContent />
    </Suspense>
  )
}

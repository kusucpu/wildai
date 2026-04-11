'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { chat, FREE_CHAT_MODELS, getByopKey } from '@/lib/pollinations'
import { storage } from '@/lib/storage'
import { CHAT_MODES } from '@/lib/prompts'
import BYOPModal from '@/components/BYOPModal'

function ChatContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initMode = searchParams.get('mode') || 'regular'

  const [mode, setMode] = useState(initMode)
  const [model, setModel] = useState(CHAT_MODES.find(m => m.id === initMode)?.model || 'mistral')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showBYOP, setShowBYOP] = useState(false)
  const [imagePrompt, setImagePrompt] = useState(null)
  const [savedId, setSavedId] = useState(null)

  const bottomRef = useRef(null)
  const taRef = useRef(null)
  const currentMode = CHAT_MODES.find(m => m.id === mode) || CHAT_MODES[0]

  // Load from history if redirected
  useEffect(() => {
    const stored = sessionStorage.getItem('load_chat')
    if (stored) {
      const chat = JSON.parse(stored)
      setMessages(chat.messages || [])
      setMode(chat.mode || 'regular')
      setModel(chat.model || 'mistral')
      sessionStorage.removeItem('load_chat')
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto'
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const switchMode = (m) => {
    setMode(m.id)
    setModel(m.model)
    setMessages([])
  }

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const content = await chat(newMessages, model, currentMode.system)
      const aiMsg = { role: 'assistant', content }
      const final = [...newMessages, aiMsg]
      setMessages(final)

      const saved = storage.addChat({ mode, model, messages: final })
      setSavedId(Date.now())
    } catch (e) {
      if (e.message === 'quota_exceeded') {
        setShowBYOP(true)
      } else {
        setMessages(prev => [...prev, { role: 'system', content: `bruh something broke: ${e.message}` }])
      }
    } finally {
      setLoading(false)
    }
  }

  // Parse [IMAGE:prompt] in story mode
  const renderContent = (text) => {
    if (mode !== 'story') return text
    const parts = text.split(/\[IMAGE:(.*?)\]/g)
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <button
            key={i}
            onClick={() => setImagePrompt(part.trim())}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'color-mix(in srgb, var(--ac) 15%, transparent)', color: 'var(--ac)', border: '1px solid var(--ac)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', cursor: 'pointer', margin: '2px', fontFamily: 'inherit' }}
          >
            🎨 generate: {part.trim().slice(0, 40)}{part.trim().length > 40 ? '...' : ''}
          </button>
        )
      }
      return part
    })
  }

  return (
    <>
      <div className="chat-wrap">
        {/* top controls */}
        <div style={{ borderBottom: '1px solid var(--bd)', padding: '8px 12px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="tabs">
            {CHAT_MODES.map(m => (
              <button key={m.id} className={`tab ${mode === m.id ? 'active' : ''}`} onClick={() => switchMode(m)}>
                {m.icon} {m.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--fg3)' }}>model:</span>
            <select value={model} onChange={e => setModel(e.target.value)} style={{ width: 'auto', padding: '3px 8px', fontSize: '0.75rem' }}>
              {FREE_CHAT_MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.name} — {m.note}</option>
              ))}
            </select>
            {getByopKey() && <span style={{ fontSize: '0.7rem', color: 'var(--ok)' }}>✓ BYOP</span>}
            {savedId && (
              <a href="/history" style={{ fontSize: '0.7rem', color: 'var(--fg3)', marginLeft: 'auto' }}>
                💾 saved to history →
              </a>
            )}
          </div>
          {currentMode.disclaimer && (
            <p style={{ fontSize: '0.7rem', color: 'var(--fg3)', margin: 0 }}>{currentMode.disclaimer}</p>
          )}
        </div>

        {/* messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--fg3)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{currentMode.icon}</div>
              <p style={{ color: 'var(--fg3)', margin: 0 }}>{currentMode.placeholder}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginTop: '8px', marginBottom: 0 }}>shift+enter for newline</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role === 'user' ? 'user' : msg.role === 'system' ? 'sys' : 'ai'}`}>
              <div className="msg-bubble">
                <div className="msg-label">
                  {msg.role === 'user' ? 'you' : msg.role === 'system' ? 'error' : currentMode.label}
                </div>
                <div>{renderContent(msg.content)}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg ai">
              <div className="msg-bubble">
                <div className="dots">
                  <div className="dot" /><div className="dot" /><div className="dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div className="chat-input-bar">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <textarea
              ref={taRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder={currentMode.placeholder}
              rows={1}
              style={{ resize: 'none', flex: 1, maxHeight: '120px', overflowY: 'auto' }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="btn btn-p"
              style={{ padding: '8px 14px', flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => { if (confirm('clear this chat? (it is saved to history tho ngl)')) setMessages([]) }}
              style={{ fontSize: '0.7rem', color: 'var(--fg3)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
            >
              🗑 clear chat
            </button>
          )}
        </div>
      </div>

      {/* image prompt modal (story mode) */}
      {imagePrompt && (
        <div className="modal-overlay" onClick={() => setImagePrompt(null)}>
          <div className="modal-box" style={{ padding: '20px' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '8px' }}>🎨 generate this scene?</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '12px' }}>{imagePrompt}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-p" style={{ flex: 1 }} onClick={() => {
                sessionStorage.setItem('prefill_prompt', imagePrompt)
                setImagePrompt(null)
                window.location.href = '/image'
              }}>
                generate in image page →
              </button>
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

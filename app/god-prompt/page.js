'use client'
import { useState } from 'react'
import { chat } from '@/lib/pollinations'
import { GOD_PROMPTS, META_PROMPT_SYSTEM } from '@/lib/prompts'
import BYOPModal from '@/components/BYOPModal'

export default function GodPromptPage() {
  const [tab, setTab] = useState('library')
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState(null)
  const [preview, setPreview] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showBYOP, setShowBYOP] = useState(false)

  const filtered = GOD_PROMPTS.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.includes(search.toLowerCase()))
  )

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const sendMeta = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMsgs = [...messages, userMsg]
    setMessages(newMsgs)
    setInput('')
    setLoading(true)
    try {
      const content = await chat(newMsgs, 'openai-fast', META_PROMPT_SYSTEM)
      setMessages([...newMsgs, { role: 'assistant', content }])
    } catch (e) {
      if (e.message === 'quota_exceeded') setShowBYOP(true)
      else setMessages(prev => [...prev, { role: 'system', content: 'api broke lol: ' + e.message }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ct" style={{ paddingTop: '16px', paddingBottom: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>⚡ God Prompt</h1>
        <p style={{ marginBottom: 0 }}>copy-paste ready prompts + AI prompt builder. no gatekeeping.</p>
      </div>

      <div className="tabs" style={{ marginBottom: '16px' }}>
        <button className={`tab ${tab === 'library' ? 'active' : ''}`} onClick={() => setTab('library')}>📚 Library</button>
        <button className={`tab ${tab === 'builder' ? 'active' : ''}`} onClick={() => setTab('builder')}>🤖 AI Builder</button>
      </div>

      {tab === 'library' && (
        <>
          <input
            placeholder="search prompts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {filtered.map(p => (
              <div key={p.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '0.95rem' }}>{p.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--fg3)' }}>⭐{p.votes.toLocaleString()}</span>
                </div>
                <p style={{ fontSize: '0.8rem', marginBottom: '8px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                  {p.tags.map(t => <span key={t} className="badge badge-ac">{t}</span>)}
                </div>
                {p.disclaimer && <p style={{ fontSize: '0.7rem', color: 'var(--warn)', marginBottom: '8px' }}>{p.disclaimer}</p>}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-p btn-sm" style={{ flex: 1 }} onClick={() => copy(p.template, p.id)}>
                    {copied === p.id ? '✓ copied!' : '📋 copy'}
                  </button>
                  <button className="btn btn-s btn-sm" onClick={() => setPreview(p)}>preview</button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--fg3)' }}>no prompts found for "{search}" lol</p>}
        </>
      )}

      {tab === 'builder' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '12px' }}>
            {messages.length === 0 && (
              <div className="card" style={{ fontSize: '0.8rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '4px' }}>🤖 Prompt Architecture Engine v2.1</p>
                <p style={{ marginBottom: 0, color: 'var(--fg3)' }}>describe your domain/task and I'll generate a production-ready prompt blueprint. one sentence is enough.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role === 'user' ? 'user' : m.role === 'system' ? 'sys' : 'ai'}`}>
                <div className="msg-bubble">
                  <div className="msg-label">{m.role === 'user' ? 'you' : m.role === 'system' ? 'error' : 'engine'}</div>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.8rem' }}>{m.content}</pre>
                </div>
              </div>
            ))}
            {loading && <div className="msg ai"><div className="msg-bubble"><div className="dots"><div className="dot" /><div className="dot" /><div className="dot" /></div></div></div>}
          </div>
          <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--bd)', paddingTop: '8px' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMeta() } }} placeholder="describe your task..." rows={2} style={{ flex: 1, resize: 'none' }} />
            <button className="btn btn-p" onClick={sendMeta} disabled={loading || !input.trim()}>send</button>
          </div>
        </div>
      )}

      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)}>
          <div className="modal-box" style={{ padding: '20px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3>{preview.name}</h3>
              <button className="icon-btn" onClick={() => setPreview(null)}>✕</button>
            </div>
            <div className="card" style={{ maxHeight: '50vh', overflowY: 'auto', marginBottom: '12px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem', fontFamily: 'inherit' }}>{preview.template}</pre>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-p" style={{ flex: 1 }} onClick={() => { copy(preview.template, 'preview'); setPreview(null) }}>copy & close</button>
              <button className="btn btn-s" onClick={() => setPreview(null)}>close</button>
            </div>
          </div>
        </div>
      )}

      {showBYOP && <BYOPModal onClose={() => setShowBYOP(false)} />}
    </div>
  )
}

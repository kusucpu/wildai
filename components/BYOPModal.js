'use client'
import { useState } from 'react'
import { setByopKey } from '@/lib/pollinations'

export default function BYOPModal({ onClose }) {
  const [key, setKey] = useState('')

  const save = () => {
    if (!key.trim()) return
    setByopKey(key.trim())
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
          <div>
            <h3>🔑 add your pollen key</h3>
            <p style={{ fontSize: '0.8rem', marginTop: '4px', marginBottom: 0 }}>quota ran out bestie 😬 time to BYOP</p>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="card" style={{ marginBottom: '12px', fontSize: '0.8rem' }}>
          <p style={{ marginBottom: '6px', fontWeight: 600 }}>what you get:</p>
          <div style={{ color: 'var(--fg2)', lineHeight: 1.8 }}>
            💬 unlimited chat (basically)<br />
            🚀 skip the rate limit queue<br />
            🔓 all free models unlocked
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginTop: '8px', marginBottom: 0 }}>
            no subscription. pay per use. get key at{' '}
            <a href="https://enter.pollinations.ai" target="_blank" rel="noopener">enter.pollinations.ai</a>
          </p>
        </div>

        <input
          type="password"
          placeholder="paste your pk_ or sk_ key here..."
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && save()}
          autoFocus
          style={{ marginBottom: '10px' }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-p" style={{ flex: 1 }} onClick={save}>save & unlock</button>
          <button className="btn btn-s" onClick={onClose}>nah I'll wait</button>
        </div>
      </div>
    </div>
  )
}

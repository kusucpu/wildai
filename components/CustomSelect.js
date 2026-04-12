'use client'
import { useState, useRef, useEffect } from 'react'

export default function CustomSelect({ value, onChange, options, label, style = {} }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const selected = options.find(o => (o.value ?? o.id) === value)
  const display = selected?.label || selected?.name || value

  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      {label && <div style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginBottom: '4px' }}>{label}</div>}
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', padding: '7px 10px', background: 'var(--bg2)', border: `1px solid ${open ? 'var(--ac)' : 'var(--bd)'}`, borderRadius: '8px', color: 'var(--fg)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', textAlign: 'left', transition: 'border-color 0.15s' }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{display}</span>
        <span style={{ opacity: 0.4, fontSize: '0.65rem', flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 600, background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.2)', maxHeight: '220px', overflowY: 'auto' }}>
          {options.map(opt => {
            const val = opt.value ?? opt.id
            const lbl = opt.label || opt.name
            const sub = opt.note || opt.desc
            const isActive = val === value
            return (
              <button
                key={val}
                onClick={() => { onChange(val); setOpen(false) }}
                style={{ width: '100%', padding: '8px 12px', background: isActive ? 'color-mix(in srgb, var(--ac) 12%, transparent)' : 'transparent', color: isActive ? 'var(--ac)' : 'var(--fg)', border: 'none', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
              >
                <span>{lbl}</span>
                {sub && <span style={{ fontSize: '0.7rem', color: isActive ? 'var(--ac)' : 'var(--fg3)', opacity: 0.8 }}>{sub}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

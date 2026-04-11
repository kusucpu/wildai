'use client'
const msgs = [
  "still cooking this one, give me a sec lmao",
  "coming soon™ (actually fr this time)",
  "construction zone rn, helmet required",
  "bro I only have one pair of hands 😭",
  "patience is a virtue or whatever"
]

export default function MaintenanceScreen({ feature = 'This' }) {
  const msg = msgs[Math.floor(Math.random() * msgs.length)]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '24px', gap: '12px' }}>
      <div style={{ fontSize: '3rem' }}>🚧</div>
      <h1>{feature}</h1>
      <p style={{ maxWidth: '280px' }}>{msg}</p>
      <p style={{ color: 'var(--fg3)', fontSize: '0.8rem', marginBottom: 0 }}>working on it between coffee breaks ☕</p>
      <a href="/" className="btn btn-s" style={{ marginTop: '8px' }}>← back to home</a>
    </div>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <Link href="/about" style={{ color: 'var(--fg3)', fontSize: '0.75rem' }}>about</Link>
        <Link href="/disclaimer" style={{ color: 'var(--fg3)', fontSize: '0.75rem' }}>disclaimer</Link>
        <Link href="/privacy" style={{ color: 'var(--fg3)', fontSize: '0.75rem' }}>privacy</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span>built with different ❤️ and</span>
        <span>☕</span>
        <span>—</span>
        <a href="https://google.com" target="_blank" rel="noopener" style={{ color: 'var(--fg3)' }}>Google</a>
        <a href="https://github.com" target="_blank" rel="noopener" style={{ color: 'var(--fg3)' }}>GitHub</a>
        <a href="https://vercel.com" target="_blank" rel="noopener" style={{ color: 'var(--fg3)' }}>Vercel</a>
        <a href="https://pollinations.ai" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://raw.githubusercontent.com/pollinations/pollinations/main/assets/logo.svg" alt="Pollinations" height="16" style={{ filter: 'var(--fg3)' }} />
        </a>
      </div>
    </footer>
  )
}

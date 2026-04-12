export default function PrivacyPage() {
  return (
    <div className="ct" style={{ paddingTop: '24px', paddingBottom: '48px', maxWidth: '680px' }}>
      <h1 style={{ marginBottom: '4px' }}>privacy policy</h1>
      <p style={{ color: 'var(--fg3)', marginBottom: '24px', fontSize: '0.8rem' }}>tl;dr: I don't have your data because I never collect it</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <section className="card">
          <h3 style={{ marginBottom: '8px' }}>tl;dr version</h3>
          <div style={{ fontSize: '0.85rem', lineHeight: 2 }}>
            ❌ no cookies<br />
            ❌ no analytics<br />
            ❌ no accounts<br />
            ❌ no email collection<br />
            ✅ chat + image history → your device localStorage only<br />
            ✅ API key (if BYOP) → your device only, never our server
          </div>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>what we "collect"</h2>
          <p>nothing on our end. seriously. no database. no backend storage. everything you do stays in your browser's localStorage. clear your browser data = I literally have nothing about you. it's genuinely that simple.</p>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>third parties</h2>
          <p><strong>Pollinations.ai</strong> — processes your chat messages and image prompts. they have their own privacy policy at pollinations.ai. if using BYOP, your key is sent to their API (encrypted HTTPS).</p>
          <p><strong>Vercel</strong> — hosts this site. standard CDN logs (IP, timestamp, page). auto-deleted after 24h. see vercel.com/legal/privacy-policy.</p>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>your rights</h2>
          <p><strong>Access your data:</strong> browser DevTools → Application → Local Storage → everything's right there.</p>
          <p><strong>Delete your data:</strong> History page → "delete all", or just clear browser storage. done. I have nothing to forget on my end.</p>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>security</h2>
          <p>HTTPS everywhere. no database = no database to hack. BYOP keys stored in localStorage (browser's own protection). don't use this on shared/public computers, or clear data when done.</p>
        </section>
        <p style={{ fontSize: '0.75rem', color: 'var(--fg3)', borderTop: '1px solid var(--bd)', paddingTop: '16px' }}>
          effective {new Date().getFullYear()} — if lawyers are reading this: hi, please don't sue, I'm just a dev with a cheap phone and dreams.
        </p>
      </div>
    </div>
  )
}

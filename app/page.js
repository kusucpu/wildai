import Link from 'next/link'

export default function Home() {
  return (
    <div className="ct pg-in" style={{ paddingTop: '32px', paddingBottom: '48px' }}>

      {/* hero */}
      <section style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-block', padding: '4px 12px', background: 'color-mix(in srgb, var(--ac) 12%, transparent)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--ac)', fontWeight: 600, marginBottom: '16px' }}>
          free tier • no login • no BS
        </div>
        <h1 style={{ marginBottom: '12px' }}>
          AI tools, but make it <span className="grad">actually free</span>
        </h1>
        <p style={{ maxWidth: '520px', margin: '0 auto 24px', fontSize: '1rem', color: 'var(--fg2)' }}>
          chat, generate images, craft god-tier prompts — all free. powered by pollinations.ai. built on a beat-up xiaomi by someone who had too much coffee and too much free time.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/chat" className="btn btn-p btn-lg">start chatting →</Link>
          <Link href="/image" className="btn btn-s btn-lg">generate images</Link>
        </div>
      </section>

      {/* features */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>what can u do here</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
          <FeatureCard icon="💬" title="Chat (no cap)" desc="regular chat, tarot readings, astrology, emotional support, interactive stories. pick your vibe." href="/chat" />
          <FeatureCard icon="🎨" title="Image Gen" desc="flux & z-image models. wallpapers, logos, thumbnails, stickers. free, no key needed." href="/image" />
          <FeatureCard icon="⚡" title="God Prompts" desc="battle-tested system prompts. copy, paste, become prompt engineer overnight. no gatekeeping." href="/god-prompt" />
          <FeatureCard icon="📜" title="History" desc="all your chats and generated images saved locally. 100MB limit, auto-cleanup. your data, your device." href="/history" />
          <FeatureCard icon="📰" title="Articles" desc="deep dives & tutorials. still brewing in the background..." href="/articles" badge="soon" />
          <FeatureCard icon="🎮" title="Games" desc="mini games incoming. give me a moment im just one person lol" href="/game" badge="soon" />
        </div>
      </section>

      {/* origin story */}
      <section className="card" style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '12px' }}>how this cursed thing exists</h2>
        <p>ngl this whole thing started during a 3am gabutting session. too much kopi, too much scrolling, thought "what if free AI tools didn't feel like they were designed by a committee of suits?" and just... started building.</p>
        <p>entire codebase written on a <strong>Xiaomi Redmi S2</strong> (cracked screen, questionable battery) using Acode app + free wifi + manual copy-paste to GitHub. no npm. no terminal (except openclaw for other stuff). pure chaos energy.</p>
        <p>huge thanks to: <a href="https://pollinations.ai" target="_blank" rel="noopener">Pollinations.ai</a> (the real MVP), <a href="https://vercel.com" target="_blank" rel="noopener">Vercel</a> (free hosting gods), <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>, and every AI that basically taught me to code. no VC. no ads. just spite against boring corporate tools.</p>
      </section>

    </div>
  )
}

function FeatureCard({ icon, title, desc, href, badge }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ height: '100%', transition: 'border-color 0.15s, transform 0.15s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ac)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.transform = 'none' }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{icon}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <h3>{title}</h3>
          {badge && <span className="badge badge-warn">{badge}</span>}
        </div>
        <p style={{ fontSize: '0.8rem', marginBottom: 0 }}>{desc}</p>
      </div>
    </Link>
  )
}

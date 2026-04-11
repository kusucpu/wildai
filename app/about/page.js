export default function AboutPage() {
  return (
    <div className="ct" style={{ paddingTop: '24px', paddingBottom: '48px', maxWidth: '680px' }}>
      <h1 style={{ marginBottom: '20px' }}>about this chaotic little project</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <section>
          <h2 style={{ marginBottom: '8px' }}>origin story (spoiler: caffeine)</h2>
          <p>ngl this whole thing was born out of pure nonsense. 3am, too much caffeine, and a burning question: "why do AI tools feel like they were designed by a committee that's never actually used them?"</p>
          <p>so I grabbed my <strong>Xiaomi Redmi S2</strong> (cracked screen, questionable battery life, absolutely zero regrets), connected to free public WiFi at the nearest coffee shop, and started building. entirely on mobile. no desktop. no npm locally. pure chaos.</p>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>the stack (chaotic edition)</h2>
          <div className="card" style={{ fontSize: '0.85rem', lineHeight: 2 }}>
            📱 <strong>Device:</strong> Xiaomi Redmi S2 (2018, still kicking)<br />
            ✏️ <strong>Editor:</strong> Acode (Android, surprisingly good ngl)<br />
            🤖 <strong>AI Teachers:</strong> ChatGPT, Claude, Gemini (basically my entire CS degree)<br />
            ⚡ <strong>Framework:</strong> Next.js 15 (App Router)<br />
            🎨 <strong>Styling:</strong> CSS Variables + Tailwind (minimal)<br />
            🧠 <strong>AI API:</strong> Pollinations.ai (the real MVP, fr)<br />
            🚀 <strong>Hosting:</strong> Vercel (free tier goat)<br />
            📦 <strong>Version Control:</strong> GitHub (manual copy-paste commits, don't judge)
          </div>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>the philosophy</h2>
          <p>I'm so tired of AI tools that cost more than my monthly grocery bill for features I'll use twice. WildAItech is:</p>
          <div className="card" style={{ fontSize: '0.85rem', lineHeight: 2 }}>
            ✅ actually free (not "free trial, then your rent")<br />
            ✅ no login BS (your data stays on YOUR device)<br />
            ✅ honest about limitations (I'm literally one person with a phone)<br />
            ✅ no corporate energy (just vibes and spite)
          </div>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>shoutouts</h2>
          <p>massive thanks to <a href="https://pollinations.ai" target="_blank" rel="noopener">Pollinations.ai</a> for making free AI APIs actually accessible. <a href="https://vercel.com" target="_blank" rel="noopener">Vercel</a> for free hosting that just works. <a href="https://github.com" target="_blank" rel="noopener">GitHub</a> for being the backbone of this whole thing. and every Stack Overflow answer and AI chat that taught me to code at 3am.</p>
        </section>
      </div>
    </div>
  )
}

export default function DisclaimerPage() {
  return (
    <div className="ct" style={{ paddingTop: '24px', paddingBottom: '48px', maxWidth: '680px' }}>
      <h1 style={{ marginBottom: '4px' }}>disclaimer</h1>
      <p style={{ color: 'var(--fg3)', marginBottom: '24px', fontSize: '0.8rem' }}>(read or don't, ur call)</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <section>
          <h2 style={{ marginBottom: '8px' }}>what this is</h2>
          <p>free AI tools for experimentation, creativity, and killing time. built by one sleep-deprived person on a budget phone. entertaining? hopefully. life advice? absolutely not.</p>
        </section>
        <section className="card" style={{ borderColor: 'var(--danger)' }}>
          <h2 style={{ marginBottom: '8px', color: 'var(--danger)' }}>🚨 mental health (read this one)</h2>
          <p>the "BFF" chat mode is NOT a licensed therapist. it's an AI chatbot that listens well. if you're in actual crisis:</p>
          <div style={{ fontSize: '0.85rem', lineHeight: 2 }}>
            🆘 <strong>US:</strong> call/text 988 (Suicide & Crisis Lifeline)<br />
            🆘 <strong>Text:</strong> HOME to 741741 (Crisis Text Line)<br />
            🆘 <strong>Worldwide:</strong> findahelpline.com
          </div>
          <p style={{ marginTop: '8px', marginBottom: 0, fontSize: '0.8rem' }}>I'm just some random dev. I cannot help with real emergencies. please reach out to actual professionals. fr.</p>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>AI-generated content</h2>
          <p>everything here runs through Pollinations.ai models. that means: it can be confidently wrong, biased (AI learns from the internet, yikes), and copyright status of outputs is legally gray. use commercial outputs at your own risk.</p>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>liability</h2>
          <p>free project, zero warranties, no refunds (it's free). if your boss catches you generating memes on company time, that's between you and HR. 👀</p>
        </section>
        <section>
          <h2 style={{ marginBottom: '8px' }}>BYOP</h2>
          <p>if you add your own Pollinations key: you pay them directly, I never see your key (stored locally in your browser only), you're responsible for your usage.</p>
        </section>
        <p style={{ fontSize: '0.75rem', color: 'var(--fg3)', borderTop: '1px solid var(--bd)', paddingTop: '16px' }}>
          if you read all of this, you deserve a cookie 🍪 — last updated {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}

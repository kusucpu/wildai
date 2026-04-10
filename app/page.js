import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="container py-12 fade-in">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="mb-4">
          AI tools, but make it{' '}
          <span className="gradient-text">chill</span>
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
          no corporate BS. no paywalls. just free AI that actually vibes with you.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/chat" className="btn btn-primary btn-lg">
            Start Chatting →
          </Link>
          <Link href="/image" className="btn btn-secondary btn-lg">
            Generate Images
          </Link>
        </div>
      </section>
      
      {/* Features */}
      <section className="mb-16">
        <h2 className="text-center mb-8">what you can do here</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="💬"
            title="Chat (No BS)"
            description="talk to AI that doesn't sound like a robot wrote the script"
            href="/chat"
          />
          
          <FeatureCard
            icon="🎨"
            title="Image Gen"
            description="create art, memes, whatever. flux model goes hard"
            href="/image"
          />
          
          <FeatureCard
            icon="⚡"
            title="God Prompts"
            description="steal battle-tested prompts. become prompt engineer overnight"
            href="/god-prompt"
          />
          
          <FeatureCard
            icon="🔮"
            title="Tarot Readings"
            description="ask the cards. blame mercury retrograde later"
            href="/chat"
            badge="fun"
          />
          
          <FeatureCard
            icon="📰"
            title="Articles"
            description="deep dives, tutorials, chaos"
            href="/articles"
            badge="soon"
          />
          
          <FeatureCard
            icon="📺"
            title="Viral Videos"
            description="trending stuff, curated by AI"
            href="/videos"
            badge="soon"
          />
        </div>
      </section>
      
      {/* Origin Story */}
      <section className="bg-[var(--bg-secondary)] rounded-2xl p-8 mb-16">
        <h2 className="text-center mb-6">how this exists</h2>
        
        <div className="max-w-3xl mx-auto space-y-4 text-lg text-[var(--text-secondary)]">
          <p>
            built this during a caffeine-fueled coding binge because I was bored 
            and had too much free time.
          </p>
          
          <p>
            tech stack: a beat-up <strong>Xiaomi Redmi S2</strong> (RIP battery), 
            stolen WiFi (jk it's free public ☕), way too much coffee, 
            and the homies at Google/ChatGPT/Claude who basically taught me everything.
          </p>
          
          <p>
            shoutout to:{' '}
            <a href="https://github.com" target="_blank" rel="noopener">GitHub</a> (code home),{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener">Vercel</a> (free hosting gods),{' '}
            <a href="https://pollinations.ai" target="_blank" rel="noopener">Pollinations.ai</a> (API saviors).
          </p>
          
          <p className="text-center font-semibold">
            no VC funding. no ads. no data selling. just vibes and spite against boring corporate tools.
          </p>
        </div>
      </section>
      
      {/* CTA */}
      <section className="text-center">
        <h2 className="mb-4">ready to vibe?</h2>
        <Link href="/chat" className="btn btn-primary btn-lg">
          Let's Go 🚀
        </Link>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, href, badge }) {
  return (
    <Link href={href} className="card group">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        {title}
        {badge && (
          <span className="text-xs bg-[var(--warning)] text-[var(--bg-primary)] px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </h3>
      <p className="text-[var(--text-secondary)]">{description}</p>
    </Link>
  )
}

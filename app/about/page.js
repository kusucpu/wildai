export default function AboutPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">about this chaotic project</h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-[var(--text-secondary)]">
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">the origin story</h2>
          <p>
            yo. this whole thing started because I was bored one night, 
            had too much coffee, and thought "what if AI tools didn't suck?"
          </p>
          <p>
            so I grabbed my beat-up Xiaomi Redmi S2 (yeah, the one with the cracked screen), 
            connected to free public WiFi at a coffee shop, and just... started building.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">the tech stack</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Hardware:</strong> Xiaomi Redmi S2 (2018 model, still kicking)</li>
            <li><strong>Code Editor:</strong> Acode (Android app, surprisingly good)</li>
            <li><strong>AI Teachers:</strong> ChatGPT, Claude, Google Gemini (they taught me everything)</li>
            <li><strong>Framework:</strong> Next.js 14 (App Router)</li>
            <li><strong>Styling:</strong> CSS Variables + Tailwind</li>
            <li><strong>AI API:</strong> Pollinations.ai (the real MVP)</li>
            <li><strong>Hosting:</strong> Vercel (free tier = chef's kiss)</li>
            <li><strong>Version Control:</strong> GitHub (manual copy-paste commits, don't judge)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">the philosophy</h2>
          <p>
            I'm tired of AI tools that feel like they were designed by a committee 
            of investors who've never actually used the product.
          </p>
          <p>This site is:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Free (actually free, not "free trial then $99/mo")</li>
            <li>No BS (if something's broken, I'll tell you)</li>
            <li>Built for humans (not SEO robots or VC pitch decks)</li>
            <li>Open about limitations (I'm just one person with a phone)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">what's next?</h2>
          <p>honestly? no idea. maybe I'll add more features. maybe I'll abandon it. who knows.</p>
          <p>
            if you wanna follow along, check the{' '}
            <a href="https://github.com/yourusername" className="text-[var(--accent)] hover:underline">
              GitHub repo
            </a>
            {' '}(if I remember to make it public).
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">shoutouts</h2>
          <p>
            massive thanks to the teams behind{' '}
            <a href="https://pollinations.ai" className="text-[var(--accent)] hover:underline">Pollinations.ai</a>,{' '}
            <a href="https://vercel.com" className="text-[var(--accent)] hover:underline">Vercel</a>, and{' '}
            <a href="https://github.com" className="text-[var(--accent)] hover:underline">GitHub</a>.
            y'all make this possible.
          </p>
          <p>
            also shoutout to every Stack Overflow answer I copy-pasted at 3am.
          </p>
        </section>
        
        <section className="border-t border-[var(--border)] pt-6">
          <p className="text-center italic">
            built with spite, caffeine, and a smartphone. 2024.
          </p>
        </section>
      </div>
    </div>
  )
}

export default function DisclaimerPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">disclaimer (read or don't)</h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-[var(--text-secondary)]">
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">what this site is</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Free AI tools for experimentation and fun</li>
            <li>Built by one person with a phone and WiFi</li>
            <li>Entertainment, creativity, learning</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">what this site is NOT</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Professional medical/legal/financial advice</li>
            <li>Guaranteed to work 24/7 (APIs break, shit happens)</li>
            <li>Responsible for what you create (you own your outputs)</li>
          </ul>
        </section>
        
        <section className="bg-[var(--danger)]/10 border border-[var(--danger)] rounded-lg p-4">
          <h2 className="text-2xl font-bold text-[var(--danger)] mb-3">🚨 mental health disclaimer</h2>
          <p>
            The "Vent" mode is <strong>NOT a licensed therapist</strong>. It's an AI chatbot 
            designed to listen and provide perspective.
          </p>
          <p className="font-bold">If you're in crisis:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>🆘 Call 988 (Suicide & Crisis Lifeline, US)</li>
            <li>🆘 Text HOME to 741741 (Crisis Text Line)</li>
            <li>🆘 Contact local emergency services</li>
          </ul>
          <p>
            I'm just some random person on the internet. I can't help with real emergencies.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">AI-generated content</h2>
          <p>Everything here uses AI models from Pollinations.ai. That means:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>✅ It can be wrong (confidently wrong, even)</li>
            <li>✅ It might be biased (AI learns from the internet, yikes)</li>
            <li>✅ Copyright is messy (use commercial outputs at your own risk)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">your data & privacy</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No tracking pixels or analytics (I literally don't care what you do)</li>
            <li>No selling data (what data? I don't have any)</li>
            <li>Everything stored locally in your browser (localStorage)</li>
            <li>Pollinations.ai processes your requests (read their privacy policy)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">BYOP (bring your own pollen)</h2>
          <p>If you add your own API key:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>You pay Pollinations.ai directly (not me)</li>
            <li>I don't see your key (it's stored locally)</li>
            <li>You're responsible for your usage costs</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">liability</h2>
          <p>
            This is a free project built for fun. You use it at your own risk.
          </p>
          <p>
            <strong>No warranties. No guarantees. No refunds</strong> (because it's free).
          </p>
          <p>
            If your boss catches you generating memes during work hours, 
            that's between you and HR 👀
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">content removal</h2>
          <p>Found something messed up someone generated? Contact:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Email: [your-email]</li>
            <li>Include: URL, screenshot, reason</li>
            <li>I'll remove it ASAP (if I see the email)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">changes</h2>
          <p>
            I might update this disclaimer when I remember or when lawyers scare me.
          </p>
        </section>
        
        <section className="border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--text-muted)]">
            Last updated: {new Date().toLocaleDateString()}
            <br />
            If you read all this, you deserve a cookie 🍪
          </p>
        </section>
        
      </div>
    </div>
  )
}

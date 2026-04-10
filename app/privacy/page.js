export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">privacy policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-[var(--text-secondary)]">
        
        <section className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">tl;dr</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>I don't collect your data</li>
            <li>Everything stays on your device</li>
            <li>Third-party APIs (Pollinations) have their own policies</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">what data we collect</h2>
          <p><strong>Short answer:</strong> basically nothing.</p>
          
          <h3 className="text-lg font-bold mt-4 mb-2">From this website:</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>❌ No cookies</li>
            <li>❌ No analytics</li>
            <li>❌ No account system</li>
            <li>❌ No email collection</li>
          </ul>
          
          <h3 className="text-lg font-bold mt-4 mb-2">What's stored locally (YOUR device):</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>✅ API keys (if you add BYOP key)</li>
            <li>✅ Chat/image history (up to 100MB)</li>
            <li>✅ Theme preference (dark/light)</li>
            <li>✅ Usage stats (request count)</li>
          </ul>
          
          <p className="italic mt-2">
            This data <strong>NEVER leaves your device</strong> unless you delete it.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">third-party services</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Pollinations.ai</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>Processes your chat messages & image prompts</li>
                <li>Privacy policy: <a href="https://pollinations.ai/privacy" className="text-[var(--accent)] hover:underline">pollinations.ai/privacy</a></li>
                <li>If using BYOP, your key is sent to their API (encrypted via HTTPS)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold">Vercel (hosting)</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>Standard CDN logs (IP, timestamp, page requested)</li>
                <li>Auto-deleted after 24 hours</li>
                <li>Privacy policy: <a href="https://vercel.com/legal/privacy-policy" className="text-[var(--accent)] hover:underline">vercel.com/legal/privacy-policy</a></li>
              </ul>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">how we use your data</h2>
          <p><strong>We don't, because we don't have it.</strong></p>
          <p>
            Seriously. No database. No server-side storage. No backend tracking.
          </p>
          <p>
            The only "storage" is localStorage in YOUR browser.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">data retention</h2>
          
          <h3 className="font-bold mt-3 mb-2">Chat & image history:</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Stored locally (browser localStorage)</li>
            <li>Auto-deleted when exceeds 100MB (oldest first)</li>
            <li>You can manually delete anytime (History page → "Delete All")</li>
          </ul>
          
          <h3 className="font-bold mt-3 mb-2">API keys:</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Stored locally until you remove them</li>
            <li>Never transmitted except to Pollinations.ai API (when making requests)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">your rights (GDPR, CCPA, etc.)</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold">Right to access:</h3>
              <p className="text-sm">
                Open browser DevTools → Application → Local Storage → see everything
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">Right to delete:</h3>
              <p className="text-sm">
                Clear browser data or use "Delete All" button in History page
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">Right to portability:</h3>
              <p className="text-sm">
                Export feature coming soon™ (or just copy-paste from localStorage)
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">Right to be forgotten:</h3>
              <p className="text-sm">
                Clear your browser data. Done. I literally don't have anything to forget.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">security</h2>
          
          <h3 className="font-bold mt-3 mb-2">How we protect your data:</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>HTTPS everywhere (encrypted transmission)</li>
            <li>No server-side storage = no database to hack</li>
            <li>API keys stored in localStorage (browser's built-in protection)</li>
          </ul>
          
          <h3 className="font-bold mt-3 mb-2">What you should do:</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Don't share your BYOP key (treat it like a password)</li>
            <li>Don't use this on public/shared computers (or clear data after)</li>
            <li>Keep your browser updated</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">children's privacy</h2>
          <p>
            This site isn't designed for kids, but there's no age verification.
          </p>
          <p>
            <strong>Parents:</strong> No data collection means no risk, but AI can generate 
            weird stuff sometimes. Supervise your kids or use parental controls.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">changes to this policy</h2>
          <p>
            If I update this, I'll change the "last updated" date below.
          </p>
          <p>
            Major changes will get a banner notification (promise).
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">contact</h2>
          <p>Questions about privacy?</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Email: [your-email]</li>
            <li>Response time: 24-48 hours (or whenever I check email)</li>
          </ul>
        </section>
        
        <section className="border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--text-muted)]">
            <strong>Legal stuff:</strong><br />
            This privacy policy is effective as of {new Date().toLocaleDateString()}.<br />
            If lawyers are reading this: hi. please don't sue. I'm just a dev with a cheap phone and dreams.
          </p>
        </section>
        
      </div>
    </div>
  )
}

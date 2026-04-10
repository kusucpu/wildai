import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

export default function MaintenanceScreen({ feature = 'This feature' }) {
  const messages = [
    "still building this one lol",
    "coming soon™ (actually tho)",
    "work in progress, don't judge",
    "patience, young padawan",
    "rome wasn't built in a day, neither is this"
  ]
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <WrenchScrewdriverIcon className="w-24 h-24 text-[var(--text-muted)] mb-4" />
      <h1 className="text-4xl font-bold mb-2">{feature}</h1>
      <p className="text-xl text-[var(--text-secondary)] mb-4">
        {randomMessage}
      </p>
      <p className="text-[var(--text-muted)] max-w-md">
        working on it between coffee breaks ☕ 
        <br />
        check back later or follow updates on twitter (if I remember to post)
      </p>
      <a href="/" className="btn btn-primary mt-8">
        ← Back to Home
      </a>
    </div>
  )
}

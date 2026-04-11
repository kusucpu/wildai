'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/articles', label: 'Articles', badge: 'soon', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" /><path strokeLinecap="round" d="M17 20V14H7v6M7 4v5h8" /></svg> },
  { href: '/videos', label: 'Videos', badge: 'soon', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg> },
  { href: '/chat', label: 'Chat', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
  { href: '/image', label: 'Image', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={1.75} /><circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.75} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 15l-5-5L5 21" /></svg> },
  { href: '/game', label: 'Game', badge: 'soon', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg> },
  { href: '/god-prompt', label: 'God⚡', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { href: '/history', label: 'History', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={1.75} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6v6l4 2" /></svg> },
]

export default function BottomNav({ open }) {
  const pathname = usePathname()
  const scrollRef = useRef(null)
  const [showL, setShowL] = useState(false)
  const [showR, setShowR] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setShowL(el.scrollLeft > 5)
    setShowR(el.scrollLeft < el.scrollWidth - el.clientWidth - 5)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    el?.addEventListener('scroll', checkScroll, { passive: true })
    return () => el?.removeEventListener('scroll', checkScroll)
  }, [])

  useEffect(() => {
    const active = document.querySelector('.nav-item.active')
    if (active && scrollRef.current) {
      setTimeout(() => active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }), 200)
    }
  }, [pathname, open])

  return (
    <div className={`bottom-nav ${open ? 'open' : ''}`}>
      {showL && (
        <button className="nav-arrow" onClick={() => scrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' })}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}
      <div ref={scrollRef} className="nav-scroll">
        <div className="nav-items">
          {ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname.startsWith(item.href) ? 'active' : ''}`}
            >
              {item.badge && <span className="nav-badge">{item.badge}</span>}
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      {showR && (
        <button className="nav-arrow" onClick={() => scrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' })}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" /></svg>
        </button>
      )}
    </div>
  )
}

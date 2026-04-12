'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TopNav({ onToggleNav, navOpen }) {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const saved = localStorage.getItem('theme') || sys
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  if (!mounted) return <div className="top-nav" />

  return (
    <nav className="top-nav">
      <button onClick={toggleTheme} className="icon-btn" aria-label="toggle theme">
        {theme === 'light' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <circle cx="12" cy="12" r="5" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </button>

      <Link href="/" className="nav-logo">WildAItech</Link>

      <button
        onClick={onToggleNav}
        className="icon-btn"
        aria-label="toggle nav"
        style={{
          border: '1px solid var(--fg)',
          background: navOpen ? 'var(--ac)' : 'transparent',
          color: navOpen ? 'white' : 'var(--fg)',
          borderColor: navOpen ? 'var(--ac)' : 'var(--fg)',
          transition: 'all 0.2s'
        }}
      >
        <svg viewBox="0 0 24 24" fill={navOpen ? 'currentColor' : 'none'} stroke="currentColor" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>
    </nav>
  )
}

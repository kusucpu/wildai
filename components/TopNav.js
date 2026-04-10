'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function TopNav({ onMenuToggle }) {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // Detect system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const savedTheme = localStorage.getItem('theme') || systemTheme
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  
  if (!mounted) return null
  
  return (
    <nav className="top-nav">
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <MoonIcon className="w-5 h-5" />
        ) : (
          <SunIcon className="w-5 h-5" />
        )}
      </button>
      
      {/* Title */}
      <Link href="/" className="nav-title">
        WildAI
      </Link>
      
      {/* Star Menu Button */}
      <button 
        onClick={onMenuToggle}
        className="star-menu-btn"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>
    </nav>
  )
}

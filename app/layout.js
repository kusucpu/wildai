'use client'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import TopNav from '@/components/TopNav'
import BottomNav from '@/components/BottomNav'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false)
  const [beamAnim, setBeamAnim] = useState(null)

  const toggleNav = () => {
    const next = !navOpen
    setNavOpen(next)
    setBeamAnim(next ? 'open' : 'close')
    setTimeout(() => setBeamAnim(null), 600)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>WildAItech — AI tools without the BS</title>
        <meta name="description" content="Free AI chat, image gen, and creative tools." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <meta name="theme-color" content="#7c3aed" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){const t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})()` }} />
      </head>
      <body className={inter.className}>
        <TopNav onToggleNav={toggleNav} navOpen={navOpen} />
        <div className={`nav-beam${beamAnim ? ` beam-${beamAnim}` : ''}`} />
        <div className="wrap" style={{ paddingBottom: navOpen ? 'var(--nav-b)' : '0', transition: 'padding-bottom 0.3s' }}>
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
        <BottomNav open={navOpen} />
      </body>
    </html>
  )
}

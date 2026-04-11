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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>WildAItech — AI tools without the BS</title>
        <meta name="description" content="Free AI chat, image gen, and creative tools. No paywalls, no corporate energy." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            const t = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', t);
          })()
        `}} />
      </head>
      <body className={inter.className}>
        <TopNav onToggleNav={() => setNavOpen(p => !p)} />

        {/* beam animation */}
        <div className={`nav-beam ${navOpen ? 'open' : ''}`} />

        <div className="wrap" style={{ paddingBottom: navOpen ? 'var(--nav-b)' : '0' }}>
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </div>

        <BottomNav open={navOpen} />
      </body>
    </html>
  )
}

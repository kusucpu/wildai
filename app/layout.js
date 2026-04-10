'use client'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import TopNav from '@/components/TopNav'
import BottomNav from '@/components/BottomNav'
import PageTransition from '@/components/PageTransition'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [menuVisible, setMenuVisible] = useState(true)
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
    
    // Star button animation (add class to trigger)
    const starBtn = document.querySelector('.star-menu-btn')
    if (starBtn) {
      starBtn.classList.toggle('active')
    }
  }
  
  return (
    <html lang="en">
      <head>
        <title>WildAI - Free AI Tools (No BS)</title>
        <meta name="description" content="Free AI chat, image generation, and creative tools. No paywalls, no corporate vibes." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className={inter.className}>
        <TopNav onMenuToggle={toggleMenu} />
        
        <main className="main-content">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        
        <BottomNav isVisible={menuVisible} />
      </body>
    </html>
  )
}

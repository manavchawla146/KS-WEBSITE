'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SmoothScrollHero } from '@/components/smooth-scroll-hero'
import { CinematicLoader } from '@/components/cinematic-loader'

const LOADER_TOTAL_MS = 2400

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ''
    }, LOADER_TOTAL_MS)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <SmoothScrollHero />
      <AnimatePresence>
        {isLoading && <CinematicLoader />}
      </AnimatePresence>
    </>
  )
}

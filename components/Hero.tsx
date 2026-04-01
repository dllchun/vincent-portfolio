'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeScene />

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10" />

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
          Available for work
        </div>

        <h1 ref={headingRef} className="text-7xl md:text-9xl font-bold mb-6 tracking-tight leading-none">
          <span className="text-text-primary">Hi, I&apos;m </span>
          <span className="gradient-text">Vincent</span>
        </h1>

        <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          Full Stack Developer building{' '}
          <span className="text-text-primary font-medium">AI-powered products</span>,{' '}
          modern web apps, and everything in between.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#projects" className="px-8 py-4 bg-accent text-background rounded-xl font-semibold text-lg hover:bg-accent-dim transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20">
            View my work
          </a>
          <a href="#contact" className="px-8 py-4 border border-border text-text-primary rounded-xl font-semibold text-lg hover:border-accent/50 hover:text-accent transition-all">
            Get in touch →
          </a>
        </div>

        <div className="mt-20 flex justify-center gap-12 text-center">
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Built' },
            { value: '∞', label: 'Coffee Consumed' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-text-secondary text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-secondary">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}

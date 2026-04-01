'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [headingRef.current, subRef.current, ctaRef.current]
    elements.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 150 + i * 180)
    })
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background z-10 pointer-events-none" />

      {/* Gradient mesh backdrop */}
      <div className="absolute inset-0 gradient-mesh z-[1] pointer-events-none" />

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          <span className="text-text-secondary">Available for work</span>
        </div>

        {/* Main heading */}
        <h1 ref={headingRef} className="text-7xl md:text-[105px] font-bold mb-6 tracking-tight leading-[0.9] font-syne">
          <span className="text-text-primary">Hi, I&apos;m </span>
          <span className="gradient-text-animate">Vincent</span>
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
          Full Stack Developer building{' '}
          <span className="text-text-primary font-medium">AI-powered products</span>,{' '}
          modern web apps, and everything in between.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="px-8 py-4 btn-gradient text-white rounded-xl font-semibold text-lg shadow-lg shadow-accent/20"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass-card text-text-primary rounded-xl font-semibold text-lg hover:border-accent/40 hover:text-accent transition-all"
          >
            Get in touch →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-24 flex justify-center gap-12 md:gap-20 text-center">
          {[
            { value: '3+',  label: 'Years Experience' },
            { value: '20+', label: 'Projects Built' },
            { value: '∞',   label: 'Coffee Consumed' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold gradient-text font-syne">{stat.value}</div>
              <div className="text-text-secondary text-sm mt-1 font-mono tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-secondary">
        <span className="text-xs font-mono tracking-widest uppercase opacity-60">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  )
}

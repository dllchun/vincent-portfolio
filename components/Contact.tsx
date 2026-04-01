'use client'

import { useState } from 'react'

const socials = [
  { label: 'GitHub',   href: 'https://github.com/dllchun' },
  { label: 'Twitter',  href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'hello@vincent.dev'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="section-padding px-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full glass-card text-accent mb-8 inline-block">
          Get In Touch
        </span>

        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-syne mt-6">
          Let&apos;s build something{' '}
          <span className="gradient-text-animate">great</span>{' '}
          together.
        </h2>

        <p className="text-text-secondary text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          Whether you have a project in mind or just want to say hi — my inbox is always open.
        </p>

        {/* Email CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={copyEmail}
            className="px-8 py-4 btn-gradient text-white rounded-xl font-semibold text-lg flex items-center gap-3 justify-center"
          >
            {copied ? (
              <>
                <span>✓</span>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <span>{email}</span>
                <span className="text-sm opacity-70 font-normal">(click to copy)</span>
              </>
            )}
          </button>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-4 mb-20">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 glass-card rounded-xl text-text-secondary hover:text-accent hover:border-accent/30 transition-all font-medium"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="border-t border-border pt-8 text-text-secondary text-sm font-mono">
          &copy; {new Date().getFullYear()} Vincent. Built with Next.js &amp; Three.js.
        </div>
      </div>
    </section>
  )
}

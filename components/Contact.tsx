'use client'

import { useState } from 'react'

const socials = [
  { label: 'GitHub', href: 'https://github.com/dllchun', icon: '→' },
  { label: 'Twitter', href: 'https://twitter.com', icon: '→' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '→' },
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
    <section id="contact" className="section-padding px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-6">Get In Touch</p>
        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Let&apos;s build something{' '}
          <span className="gradient-text">great</span>{' '}
          together.
        </h2>
        <p className="text-text-secondary text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          Whether you have a project in mind or just want to say hi — my inbox is always open.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={copyEmail}
            className="px-8 py-4 bg-accent text-background rounded-xl font-semibold text-lg hover:bg-accent-dim transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 flex items-center gap-3 justify-center"
          >
            {copied ? '✓ Copied!' : email}
            <span className="text-sm opacity-70">{copied ? '' : '(click to copy)'}</span>
          </button>
        </div>

        <div className="flex justify-center gap-6 mb-20">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 border border-border rounded-xl text-text-secondary hover:text-accent hover:border-accent/50 transition-all font-medium">
              {s.label}
            </a>
          ))}
        </div>

        <div className="border-t border-border pt-8 text-text-secondary text-sm font-mono">
          © {new Date().getFullYear()} Vincent. Built with Next.js & Three.js.
        </div>
      </div>
    </section>
  )
}

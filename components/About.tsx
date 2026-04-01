'use client'

import { useEffect, useRef } from 'react'

const stack = [
  { label: 'Next.js',    desc: 'Full-stack React framework' },
  { label: 'AI / Claude', desc: 'Building with LLMs & agents' },
  { label: 'TypeScript', desc: 'Type-safe development' },
  { label: 'Node.js',    desc: 'Server-side JavaScript' },
  { label: 'PostgreSQL', desc: 'Relational databases' },
  { label: 'Docker',     desc: 'Containerisation & DevOps' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1'
                ;(el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 110)
            })
          }
        })
      },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding px-6 relative overflow-hidden"
    >
      {/* Gradient mesh */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Label */}
        <div className="reveal mb-4" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full glass-card text-accent">
            About Me
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2
              className="reveal text-5xl md:text-6xl font-bold mb-6 leading-tight font-syne"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.1s' }}
            >
              Building the{' '}
              <span className="gradient-text">future</span>,{' '}
              one commit at a time.
            </h2>

            <div
              className="reveal space-y-4 text-text-secondary text-lg leading-relaxed"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}
            >
              <p>
                I&apos;m a Full Stack Developer passionate about creating elegant,
                performant applications that solve real problems. I specialise in
                bridging the gap between great ideas and great software.
              </p>
              <p>
                My focus lies at the intersection of{' '}
                <span className="text-text-primary font-medium">AI/ML integration</span>,
                modern web architecture, and developer experience. I love turning
                complex problems into simple, beautiful interfaces.
              </p>
            </div>

            <div
              className="reveal mt-8 flex gap-4"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.3s' }}
            >
              <a
                href="https://github.com/dllchun"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-card rounded-xl text-text-secondary hover:text-accent transition-all font-medium"
              >
                GitHub
              </a>
              <a
                href="#contact"
                className="px-6 py-3 btn-gradient text-white rounded-xl font-medium"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>

          {/* Tech stack grid */}
          <div
            className="reveal grid grid-cols-2 gap-4"
            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}
          >
            {stack.map((item) => (
              <div
                key={item.label}
                className="glass-card shine-on-hover rounded-2xl p-5 group"
              >
                <div className="text-accent text-sm font-mono font-semibold mb-1 group-hover:gradient-text transition-colors">
                  {item.label}
                </div>
                <div className="text-text-secondary text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

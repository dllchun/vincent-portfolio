'use client'

import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 120)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-padding px-6 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">About Me</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="reveal text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.1s' }}>
              Building the <span className="gradient-text">future</span>, one commit at a time.
            </h2>

            <div className="reveal space-y-4 text-text-secondary text-lg leading-relaxed" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>
              <p>
                I&apos;m a Full Stack Developer passionate about creating elegant, performant applications that solve real problems. Based wherever my laptop is, I specialize in bridging the gap between great ideas and great software.
              </p>
              <p>
                My focus lies at the intersection of <span className="text-text-primary">AI/ML integration</span>, modern web architecture, and developer experience. I love working with cutting-edge tools and turning complex problems into simple, beautiful interfaces.
              </p>
            </div>

            <div className="reveal mt-8 flex gap-4" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.3s' }}>
              <a href="https://github.com/dllchun" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 border border-border rounded-xl text-text-secondary hover:text-accent hover:border-accent/50 transition-all font-medium">
                GitHub
              </a>
              <a href="#contact"
                className="px-6 py-3 bg-accent/10 rounded-xl text-accent hover:bg-accent/20 transition-all font-medium border border-accent/20">
                Let&apos;s Talk
              </a>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 gap-4" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>
            {[
              { label: 'Next.js', desc: 'Full-stack React framework' },
              { label: 'AI/Claude', desc: 'Building with LLMs & agents' },
              { label: 'TypeScript', desc: 'Type-safe development' },
              { label: 'Node.js', desc: 'Server-side JavaScript' },
              { label: 'PostgreSQL', desc: 'Relational databases' },
              { label: 'Docker', desc: 'Containerization & DevOps' },
            ].map(item => (
              <div key={item.label} className="card-glow bg-surface rounded-2xl p-5">
                <div className="text-accent text-sm font-mono font-semibold mb-1">{item.label}</div>
                <div className="text-text-secondary text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

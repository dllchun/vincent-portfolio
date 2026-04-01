'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    title: 'AI Agent Platform',
    description:
      'A multi-agent orchestration platform built with Claude API. Supports parallel agent execution, tool use, and persistent memory across sessions.',
    tags: ['Next.js', 'Claude API', 'TypeScript', 'PostgreSQL'],
    link: 'https://github.com/dllchun',
    gradient: 'from-violet-600/15 via-purple-600/10 to-indigo-600/15',
    borderGlow: 'rgba(139, 92, 246, 0.35)',
    dotColor: '#8b5cf6',
  },
  {
    title: 'Portfolio CMS',
    description:
      'A headless CMS for managing portfolio content with markdown support, image optimisation, and a clean admin interface.',
    tags: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
    link: 'https://github.com/dllchun',
    gradient: 'from-pink-600/15 via-rose-600/10 to-fuchsia-600/15',
    borderGlow: 'rgba(236, 72, 153, 0.35)',
    dotColor: '#ec4899',
  },
  {
    title: 'DevTools Extension',
    description:
      'A browser extension that enhances developer workflows with AI-powered code review, quick documentation lookup, and smart snippet management.',
    tags: ['TypeScript', 'Chrome Extension', 'AI', 'React'],
    link: 'https://github.com/dllchun',
    gradient: 'from-amber-600/15 via-orange-600/10 to-yellow-600/15',
    borderGlow: 'rgba(245, 158, 11, 0.35)',
    dotColor: '#f59e0b',
  },
  {
    title: 'RAG Knowledge Base',
    description:
      'A retrieval-augmented generation system for querying large document collections using semantic search and Claude.',
    tags: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
    link: 'https://github.com/dllchun',
    gradient: 'from-emerald-600/15 via-teal-600/10 to-cyan-600/15',
    borderGlow: 'rgba(16, 185, 129, 0.35)',
    dotColor: '#10b981',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.project-card').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1'
                ;(el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 100)
            })
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section-padding px-6 relative bg-background/85">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full glass-card text-accent mb-6 inline-block">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-text-primary font-syne mt-6">
              Selected{' '}
              <span className="gradient-text">Work</span>
            </h2>
          </div>
          <a
            href="https://github.com/dllchun"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-6 py-3 rounded-xl text-text-secondary hover:text-accent hover:border-accent/30 transition-all self-start md:self-auto font-medium font-mono text-sm"
          >
            View all on GitHub →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card shine-on-hover glass-card bg-gradient-to-br ${project.gradient} rounded-2xl p-8 group block`}
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-surface/50"
                  style={{ boxShadow: `0 0 20px ${project.borderGlow}` }}
                >
                  <svg width="20" height="20" fill="none" stroke={project.dotColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <svg
                  className="text-text-secondary group-hover:text-accent transition-colors group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ transition: 'color 0.2s, transform 0.2s' }}
                  width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:gradient-text transition-colors font-syne">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-surface/60 text-text-secondary border border-border font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

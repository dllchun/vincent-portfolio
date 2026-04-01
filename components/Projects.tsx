'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    title: 'AI Agent Platform',
    description: 'A multi-agent orchestration platform built with Claude API. Supports parallel agent execution, tool use, and persistent memory across sessions.',
    tags: ['Next.js', 'Claude API', 'TypeScript', 'PostgreSQL'],
    link: 'https://github.com/dllchun',
    gradient: 'from-teal-500/10 to-cyan-500/10',
    accent: '#00e5cc',
  },
  {
    title: 'Portfolio CMS',
    description: 'A headless CMS for managing portfolio content with markdown support, image optimization, and a clean admin interface.',
    tags: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
    link: 'https://github.com/dllchun',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    accent: '#0088ff',
  },
  {
    title: 'DevTools Extension',
    description: 'A browser extension that enhances developer workflows with AI-powered code review, quick documentation lookup, and smart snippet management.',
    tags: ['TypeScript', 'Chrome Extension', 'AI', 'React'],
    link: 'https://github.com/dllchun',
    gradient: 'from-purple-500/10 to-pink-500/10',
    accent: '#8b5cf6',
  },
  {
    title: 'RAG Knowledge Base',
    description: 'A retrieval-augmented generation system for querying large document collections using semantic search and Claude.',
    tags: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
    link: 'https://github.com/dllchun',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    accent: '#10b981',
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
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section-padding px-6 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Portfolio</p>
            <h2 className="text-5xl md:text-6xl font-bold text-text-primary">
              Selected Work
            </h2>
          </div>
          <a href="https://github.com/dllchun" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 border border-border rounded-xl text-text-secondary hover:text-accent hover:border-accent/50 transition-all self-start md:self-auto font-medium">
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
              className={`project-card card-glow bg-gradient-to-br ${project.gradient} bg-surface rounded-2xl p-8 group block`}
              style={{ opacity: 0, transform: 'translateY(30px)', transition: `all 0.6s ease ${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-border bg-surface/50"
                  style={{ boxShadow: `0 0 20px ${project.accent}22` }}>
                  <svg width="20" height="20" fill="none" stroke={project.accent} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <svg className="text-text-secondary group-hover:text-accent transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-surface/80 text-text-secondary border border-border">
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

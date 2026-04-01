'use client'

import { useEffect, useRef } from 'react'

const skills = [
  {
    icon: '⚡',
    title: 'Full Stack Web',
    description: 'End-to-end web applications with Next.js, React, Node.js, and modern databases.',
    techs: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    description: 'Building intelligent applications powered by LLMs, RAG pipelines, and AI agents.',
    techs: ['Claude API', 'OpenAI', 'LangChain', 'Embeddings', 'Vector DBs'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Crafting beautiful, accessible interfaces with attention to detail and motion.',
    techs: ['Tailwind CSS', 'Framer Motion', 'Three.js', 'Figma', 'GSAP'],
  },
  {
    icon: '🛠️',
    title: 'DevOps & Cloud',
    description: 'Deploying and scaling applications with modern cloud infrastructure.',
    techs: ['Docker', 'Vercel', 'AWS', 'CI/CD', 'GitHub Actions'],
  },
  {
    icon: '📱',
    title: 'Mobile Dev',
    description: 'Cross-platform mobile applications with React Native and Expo.',
    techs: ['React Native', 'Expo', 'iOS', 'Android', 'Push Notifications'],
  },
  {
    icon: '🔒',
    title: 'API & Backend',
    description: 'Robust REST and GraphQL APIs with authentication, caching, and security.',
    techs: ['REST', 'GraphQL', 'Auth.js', 'Prisma', 'Drizzle'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-card').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 80)
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
    <section id="skills" ref={sectionRef} className="section-padding px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">What I Do</p>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-4">
            Skills & Services
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            From idea to production — I cover the full spectrum of modern development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className="skill-card card-glow bg-surface rounded-2xl p-8 group"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: `all 0.6s ease ${i * 0.08}s` }}
            >
              <div className="text-4xl mb-5">{skill.icon}</div>
              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                {skill.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.techs.map(tech => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-surface-2 text-text-secondary border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'

const skills = [
  {
    icon: '⚡',
    title: 'Full Stack Web',
    description: 'End-to-end web applications with Next.js, React, Node.js, and modern databases.',
    techs: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis'],
    gradient: 'from-violet-500/10 to-indigo-500/10',
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    description: 'Building intelligent applications powered by LLMs, RAG pipelines, and AI agents.',
    techs: ['Claude API', 'OpenAI', 'LangChain', 'Embeddings', 'Vector DBs'],
    gradient: 'from-pink-500/10 to-rose-500/10',
  },
  {
    icon: '🎨',
    title: 'UI / UX Design',
    description: 'Crafting beautiful, accessible interfaces with attention to detail and motion.',
    techs: ['Tailwind CSS', 'Framer Motion', 'Three.js', 'Figma', 'GSAP'],
    gradient: 'from-fuchsia-500/10 to-purple-500/10',
  },
  {
    icon: '🛠️',
    title: 'DevOps & Cloud',
    description: 'Deploying and scaling applications with modern cloud infrastructure.',
    techs: ['Docker', 'Vercel', 'AWS', 'CI/CD', 'GitHub Actions'],
    gradient: 'from-amber-500/10 to-orange-500/10',
  },
  {
    icon: '📱',
    title: 'Mobile Dev',
    description: 'Cross-platform mobile applications with React Native and Expo.',
    techs: ['React Native', 'Expo', 'iOS', 'Android', 'Push Notifications'],
    gradient: 'from-sky-500/10 to-blue-500/10',
  },
  {
    icon: '🔒',
    title: 'API & Backend',
    description: 'Robust REST and GraphQL APIs with authentication, caching, and security.',
    techs: ['REST', 'GraphQL', 'Auth.js', 'Prisma', 'Drizzle'],
    gradient: 'from-emerald-500/10 to-teal-500/10',
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
                (el as HTMLElement).style.opacity = '1'
                ;(el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 75)
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
    <section id="skills" ref={sectionRef} className="section-padding px-6 relative z-10 bg-[#050816]/90 backdrop-blur-sm">
      <div className="absolute inset-0 gradient-mesh-alt pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full glass-card text-accent mb-6 inline-block">
            What I Do
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-4 font-syne mt-6">
            Skills &amp;{' '}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            From idea to production — I cover the full spectrum of modern development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className={`skill-card shine-on-hover glass-card bg-gradient-to-br ${skill.gradient} rounded-2xl p-8 group`}
              style={{ opacity: 0, transform: 'translateY(30px)', transition: `all 0.6s ease ${i * 0.07}s` }}
            >
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform inline-block">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors font-syne">
                {skill.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-surface/60 text-text-secondary border border-border font-mono"
                  >
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

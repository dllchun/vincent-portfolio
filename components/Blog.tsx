'use client'

import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readingTime: string
}

const tagColors = ['bg-violet-500/10 border-violet-500/20 text-violet-300', 'bg-pink-500/10 border-pink-500/20 text-pink-300', 'bg-amber-500/10 border-amber-500/20 text-amber-300']

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <section id="blog" className="section-padding px-6 relative z-10 bg-[#050816]/90 backdrop-blur-sm">
      <div className="absolute inset-0 gradient-mesh-alt pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full glass-card text-accent mb-6 inline-block">
              Writing
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-text-primary font-syne mt-6">
              Latest{' '}
              <span className="gradient-text">Thoughts</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="glass-card inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-text-secondary hover:text-accent transition-all text-sm font-mono group self-start md:self-auto"
          >
            All posts
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block glass-card shine-on-hover rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top meta */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-text-secondary">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="w-1 h-1 rounded-full bg-text-secondary/30" />
                <span className="font-mono text-xs text-accent">{post.readingTime}</span>
              </div>

              <h3 className="font-syne text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, ti) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${tagColors[ti % tagColors.length]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

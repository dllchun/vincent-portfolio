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

interface BlogProps {
  posts: Post[]
}

export default function Blog({ posts }: BlogProps) {
  return (
    <section id="blog" className="relative py-32 bg-bg-secondary">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-accent text-sm tracking-widest uppercase">05 — Blog</span>
          <div className="h-px flex-1 bg-white/5 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Latest writing
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm font-mono group"
          >
            All posts
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-bg-card rounded-2xl p-7 border border-white/5 gradient-border hover:border-accent/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-text-secondary">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="w-1 h-1 rounded-full bg-text-secondary/40" />
                <span className="font-mono text-xs text-accent">{post.readingTime}</span>
              </div>

              <h3 className="font-syne text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-bg-secondary text-text-secondary text-xs font-mono border border-white/5"
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

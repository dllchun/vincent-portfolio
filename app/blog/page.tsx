import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Vincent',
  description: 'Thoughts on AI, development, and the future of technology.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Writing</p>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Blog
          </h1>
          <p className="text-text-secondary text-lg max-w-xl">
            Thoughts on AI, development, tools, and building things that matter.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="card-glow bg-surface rounded-2xl p-8 group cursor-pointer">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-text-secondary mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <time className="text-text-secondary text-sm font-mono">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

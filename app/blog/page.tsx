import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Vincent',
  description: 'Thoughts on AI, development, and the future of technology.',
}

const tagColors = [
  'bg-violet-500/10 border-violet-500/20 text-violet-300',
  'bg-pink-500/10 border-pink-500/20 text-pink-300',
  'bg-amber-500/10 border-amber-500/20 text-amber-300',
]

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 font-mono text-sm glass-card px-4 py-2 rounded-xl"
          >
            ← Back home
          </Link>
          <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full glass-card text-accent block w-fit mb-6">
            Writing
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-4 font-syne">
            The{' '}
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl">
            Thoughts on AI, development, tools, and building things that matter.
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-5">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass-card shine-on-hover rounded-2xl p-8 group cursor-pointer block hover:-translate-y-0.5 transition-all duration-300">
                {/* Top meta */}
                <div className="flex items-center gap-2 mb-4">
                  <time className="text-text-secondary font-mono text-xs">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {'readingTime' in post && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-text-secondary/30" />
                      <span className="text-accent font-mono text-xs">{(post as any).readingTime}</span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors font-syne leading-snug">
                  {post.title}
                </h2>
                <p className="text-text-secondary mb-5 leading-relaxed line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, ti: number) => (
                      <span key={tag} className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${tagColors[ti % tagColors.length]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-block font-mono">
                    Read →
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

import Link from 'next/link'
import type { Post } from '@/lib/blog'

interface Props {
  posts: Omit<Post, 'content'>[]
}

export default function BlogSection({ posts }: Props) {
  return (
    <section id="blog" className="section-padding px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Writing</p>
            <h2 className="text-5xl md:text-6xl font-bold text-text-primary">
              Latest Posts
            </h2>
          </div>
          <Link href="/blog" className="px-6 py-3 border border-border rounded-xl text-text-secondary hover:text-accent hover:border-accent/50 transition-all self-start md:self-auto font-medium">
            All posts →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="card-glow bg-surface rounded-2xl p-7 h-full group cursor-pointer flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <time className="text-text-secondary text-xs font-mono">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

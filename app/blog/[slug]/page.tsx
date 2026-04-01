import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} — Vincent`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-12 font-mono text-sm">
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              {post.title}
            </h1>
            <time className="text-text-secondary font-mono text-sm">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </header>

          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-text-primary prose-headings:font-bold
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-surface prose-pre:border prose-pre:border-border
            prose-blockquote:border-l-accent prose-blockquote:text-text-secondary
            prose-strong:text-text-primary prose-li:text-text-secondary">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
    </div>
  )
}

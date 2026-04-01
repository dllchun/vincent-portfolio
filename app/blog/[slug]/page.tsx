import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
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
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-12 font-mono text-sm glass-card px-4 py-2 rounded-xl"
        >
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight font-syne">
              {post.title}
            </h1>
            <time className="text-text-secondary font-mono text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>

          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-syne prose-headings:font-bold prose-headings:text-text-primary
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-primary
            prose-code:text-violet-300 prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface-2 prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-blockquote:border-l-accent prose-blockquote:text-text-secondary prose-blockquote:bg-surface/30 prose-blockquote:rounded-r-xl prose-blockquote:px-6
            prose-li:text-text-secondary
            prose-hr:border-border
            prose-img:rounded-xl">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}

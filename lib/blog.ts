import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
}

export async function getAllPosts(): Promise<Omit<Post, 'content'>[]> {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getRecentPosts(count: number): Promise<Omit<Post, 'content'>[]> {
  const posts = await getAllPosts()
  return posts.slice(0, count)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const extensions = ['.md', '.mdx']
  let fullPath = ''
  let found = false

  for (const ext of extensions) {
    const candidate = path.join(postsDirectory, `${slug}${ext}`)
    if (fs.existsSync(candidate)) {
      fullPath = candidate
      found = true
      break
    }
  }

  if (!found) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    content,
  }
}

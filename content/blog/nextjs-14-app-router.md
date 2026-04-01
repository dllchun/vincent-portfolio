---
title: "Next.js 15 App Router: Everything You Need to Know"
date: "2025-02-20"
excerpt: "A comprehensive guide to Next.js 15's App Router, covering server components, streaming, parallel routes, and the patterns that will define modern React development."
readTime: 10
tags: ["Next.js", "React", "Web Development"]
---

# Next.js 15 App Router: Everything You Need to Know

Next.js 15 with the App Router represents the biggest paradigm shift in React development since hooks. After building several production applications with it, here's what you need to know. Next.js 15 also introduced improvements to the caching model, making data fetching more predictable and opt-in by default.

## The Mental Model Shift

The App Router isn't just a new file structure — it's a fundamentally different way of thinking about React. The core concept: **every component is a Server Component by default**.

This means:
- No unnecessary JavaScript sent to the client
- Direct database queries from components (no API layer needed)
- Better SEO and Core Web Vitals by default

## File-Based Routing

The App Router uses a folder-based convention:

```
app/
  layout.tsx       → Root layout (persistent across navigation)
  page.tsx         → Home page
  about/
    page.tsx       → /about
  blog/
    [slug]/
      page.tsx     → /blog/:slug
  (auth)/          → Route groups (no URL segment)
    login/
      page.tsx     → /login
```

## Server vs Client Components

This is the most important concept to internalize:

```tsx
// Server Component (default) — runs on server only
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.users.findUnique({ where: { id: userId } })
  return <div>{user.name}</div>
}

// Client Component — add 'use client' directive
'use client'
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## Streaming with Suspense

Loading states become first-class citizens:

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />
      </Suspense>
    </div>
  )
}
```

## Data Fetching Patterns

The recommended patterns have evolved significantly:

```tsx
// Server Component — direct fetch with caching
async function Posts() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  }).then(r => r.json())

  return posts.map(post => <PostCard key={post.id} post={post} />)
}
```

## My Production Takeaways

After building with App Router in production:

1. **Default to Server Components** — reach for `'use client'` only when needed
2. **Colocate loading states** — `loading.tsx` files are powerful
3. **Use Route Groups** — `(marketing)` and `(app)` help organize without affecting URLs
4. **Embrace TypeScript** — the type safety with `generateStaticParams` is excellent

The App Router is the future of React development. The learning curve is real, but the payoff in performance and developer experience is worth it. With Next.js 15's improved caching defaults and Turbopack stability, it has never been a better time to migrate.

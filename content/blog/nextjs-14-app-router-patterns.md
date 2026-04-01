---
title: "Next.js 14 App Router: Patterns That Actually Work in Production"
date: "2026-02-28"
excerpt: "After shipping multiple Next.js 14 apps with the App Router, here are the patterns that work, the gotchas to avoid, and the mental model that makes it all click."
tags: ["Next.js", "React", "TypeScript", "Web Dev"]
---

# Next.js 14 App Router: Patterns That Actually Work in Production

After shipping multiple production apps with Next.js 14's App Router, I've developed strong opinions about what works and what doesn't. Here's the distilled wisdom.

## The Mental Model Shift

The biggest stumbling block for developers coming from Pages Router is understanding the Server/Client boundary. Here's the mental model that clicked for me:

- **Server Components** = HTML generation, data fetching, zero JavaScript sent to browser
- **Client Components** = Interactivity, browser APIs, event handlers

Start everything as a Server Component. Add `'use client'` only when you need interactivity.

## Data Fetching Patterns

Fetch data in Server Components, as close to where it's used as possible:

```tsx
// ✅ Good — fetch in the Server Component that needs it
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.users.findById(userId) // Direct DB call
  return <div>{user.name}</div>
}
```

## Parallel Data Fetching

Don't serialize requests that can run in parallel:

```tsx
// ✅ Parallel fetching
const [user, posts, stats] = await Promise.all([
  getUser(userId),
  getPosts(userId),
  getStats(userId),
])
```

## Loading UI and Streaming

Suspense boundaries let you stream UI progressively:

```tsx
<Suspense fallback={<PostsSkeleton />}>
  <Posts userId={userId} />
</Suspense>
```

## Route Groups and Layouts

Route groups `(folder)` are underutilized. Use them to share layouts without affecting the URL:

```
app/
  (marketing)/
    layout.tsx    ← marketing layout
    page.tsx
    about/page.tsx
  (dashboard)/
    layout.tsx    ← dashboard layout with sidebar
    dashboard/page.tsx
```

## Key Takeaways

1. Default to Server Components
2. Co-locate data fetching with components
3. Use Suspense for progressive loading
4. Route groups for layout organization
5. `cache()` for expensive computations shared across renders

The App Router rewards a different way of thinking, but once the model clicks, building with it feels natural and powerful.

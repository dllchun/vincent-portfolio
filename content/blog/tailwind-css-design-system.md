---
title: "Building a Design System with Tailwind CSS v3"
date: "2026-01-20"
excerpt: "How to build a cohesive, scalable design system using Tailwind CSS — from token setup to component patterns that scale across teams."
tags: ["Tailwind CSS", "Design System", "CSS", "UI"]
---

# Building a Design System with Tailwind CSS v3

Design systems get a bad reputation for being over-engineered. With Tailwind, you can build one that's practical, maintainable, and doesn't require a PhD to use.

## Start with Tokens

Design tokens are the foundation. In Tailwind, these live in `tailwind.config.ts`:

```ts
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fffe',
          500: '#00e5cc',
          900: '#003d37',
        },
        surface: {
          DEFAULT: '#141414',
          raised: '#1e1e1e',
          overlay: '#282828',
        }
      },
      spacing: {
        'section': '7rem',
      }
    }
  }
}
```

## Component Patterns

### The Compound Variant Pattern

For components with multiple states, use a variant map:

```tsx
const buttonVariants = {
  primary: 'bg-brand-500 text-black hover:bg-brand-600',
  secondary: 'border border-border text-text-secondary hover:text-white',
  ghost: 'text-text-secondary hover:text-white hover:bg-white/5',
}

function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`px-4 py-2 rounded-lg font-medium transition-all ${buttonVariants[variant]}`} {...props}>
      {children}
    </button>
  )
}
```

## The `cn()` Utility

Conditional classes are cleaner with a merge utility:

```ts
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Dark Mode Strategy

Commit to class-based dark mode and set it at the root:

```html
<html class="dark">
```

Then use `dark:` variants consistently. Better yet, design dark-first if your product is primarily dark.

## Scale Tips

1. **Create a `components/ui/` folder** for atomic, unstyled primitives
2. **Document variants** — a README per component reduces confusion
3. **Use Storybook** for visual regression testing
4. **Semantic token names** — `text-muted` beats `text-gray-500`

A well-structured Tailwind design system lets your team move fast without sacrificing consistency. The key is making the defaults right so developers make good choices by default.

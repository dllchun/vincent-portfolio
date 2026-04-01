import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/mdx'

// Canvas is SSR-disabled — it uses browser APIs (WebGL, ScrollTrigger)
const ScrollThreeScene = dynamic(() => import('@/components/ScrollThreeScene'), {
  ssr: false,
  loading: () => null,
})

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="relative">
      {/*
        3D particle canvas — position:fixed, z-index:0 (via inline style).
        Sits BEHIND all page content at all times.
      */}
      <ScrollThreeScene />

      {/*
        Page content — position:relative, z-10 (z-index:10).
        Always rendered above the canvas.
        Each section inside has bg-background/85 so text stays readable
        while the particle field is subtly visible through the 15% transparency.
      */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog posts={posts} />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

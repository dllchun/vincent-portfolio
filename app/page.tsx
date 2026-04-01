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

const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), {
  ssr: false,
  loading: () => null,
})

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="relative">
      {/* Fixed 3D background canvas */}
      <ThreeCanvas />

      {/* Page content above canvas */}
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

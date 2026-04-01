import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
// Space Grotesk replaces Syne — bold, geometric, premium studio feel
// Re-using --font-syne variable so all existing `font-syne` Tailwind classes work unchanged
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Vincent — Full-Stack Developer & AI Enthusiast',
  description: 'Full-Stack Developer specializing in AI, 3D web experiences, and modern tooling.',
  keywords: ['developer', 'full stack', 'AI', 'Next.js', 'React', 'Three.js', 'portfolio'],
  authors: [{ name: 'Vincent' }],
  openGraph: {
    title: 'Vincent — Full-Stack Developer & AI Enthusiast',
    description: 'Full-Stack Developer specializing in AI, 3D web experiences, and modern tooling.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} bg-bg-primary text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

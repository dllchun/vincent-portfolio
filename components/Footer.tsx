export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 bg-bg-primary py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="font-syne text-xl font-bold text-text-primary">V</span>
          <span className="font-syne text-xl font-bold text-accent">.</span>
        </div>

        {/* Copyright */}
        <p className="text-text-secondary text-sm font-mono">
          &copy; {currentYear} Vincent. Built with Next.js + Three.js.
        </p>

        {/* Back to top */}
        <a
          href="#home"
          className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm font-mono group"
        >
          Back to top
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

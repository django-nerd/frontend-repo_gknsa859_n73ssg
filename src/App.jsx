import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Author from './components/Author'
import Testimonials from './components/Testimonials'
import SignupModal from './components/SignupModal'
import SamplePreview from './components/SamplePreview'

function App() {
  const [open, setOpen] = useState(false)
  const [manuscript, setManuscript] = useState(null)
  const [ingesting, setIngesting] = useState(false)
  const [ingestError, setIngestError] = useState('')

  // Placeholder content until real assets are provided or ingested
  const fallback = {
    title: 'Your Book Title',
    subtitle: 'A clear, compelling one-liner that promises the core outcome of your book.',
    coverUrl: 'https://images.unsplash.com/photo-1544937950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    purchaseUrl: '#',
  }

  useEffect(() => {
    const loadLatest = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/manuscript/latest`)
        const data = await res.json()
        if (data.exists) setManuscript(data.manuscript)
      } catch {}
    }
    loadLatest()
  }, [])

  const title = manuscript?.title || fallback.title
  const subtitle = manuscript?.subtitle || fallback.subtitle
  const coverUrl = manuscript?.cover_url || fallback.coverUrl
  const purchaseUrl = fallback.purchaseUrl

  const benefits = [
    { title: 'Actionable frameworks', description: 'Step-by-step guidance you can apply immediately.' },
    { title: 'Research-backed insights', description: 'Distilled from real-world experience and data.' },
    { title: 'Clear, engaging stories', description: 'Memorable examples that make ideas stick.' },
    { title: 'Concise and practical', description: 'No fluff—just what you need to get results.' },
    { title: 'Bonus resources', description: 'Worksheets, checklists, and templates included.' },
    { title: 'For beginners to pros', description: 'Designed to help you level up no matter where you are.' },
  ]
  const author = {
    name: 'Author Name',
    bio: 'Short, credibility-building bio. Mention what you do, who you help, and one or two notable achievements. Keep it warm and human.',
    headshotUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'
  }
  const quotes = [
    { text: 'A must-read. I highlighted almost every page.', author: 'Happy Reader' },
    { text: 'Practical, empathetic, and immediately useful.', author: 'Founder, Acme Co.' },
    { text: 'This book will save you months of trial and error.', author: 'Coach & Consultant' },
  ]

  // Ingest helper for optional step
  const ingest = async () => {
    const url = window.prompt('Paste a direct-download link to your manuscript (PDF/EPUB/DOCX/MD). For Google Docs, use /export?format=docx')
    if (!url) return
    setIngesting(true)
    setIngestError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_url: url })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Ingestion failed')
      // refresh manuscript
      const res2 = await fetch(`${baseUrl}/api/manuscript/latest`)
      const data2 = await res2.json()
      if (data2.exists) setManuscript(data2.manuscript)
    } catch (e) {
      setIngestError(e.message)
    } finally {
      setIngesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <Hero
        onSampleClick={() => setOpen(true)}
        coverUrl={coverUrl}
        title={title}
        subtitle={subtitle}
        purchaseUrl={purchaseUrl}
      />

      <div className="max-w-6xl mx-auto px-6 flex items-center gap-3">
        <button onClick={ingest} className="inline-flex items-center px-3 py-1.5 rounded-md bg-white/10 text-white hover:bg-white/20 text-sm">
          {ingesting ? 'Ingesting…' : 'Ingest manuscript'}
        </button>
        {ingestError && <span className="text-red-300 text-sm">{ingestError}</span>}
      </div>

      <Benefits items={benefits} />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
          <SamplePreview />
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white">What you'll learn</h3>
            <ul className="list-disc list-inside mt-3 text-blue-200/80 space-y-1">
              <li>Key idea one</li>
              <li>Key idea two</li>
              <li>Key idea three</li>
            </ul>
            <button onClick={() => setOpen(true)} className="mt-6 inline-flex items-center px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Get the free sample</button>
          </div>
        </div>
      </section>

      <Author name={author.name} bio={author.bio} headshotUrl={author.headshotUrl} />

      <Testimonials quotes={quotes} />

      <footer className="py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-blue-300/80">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#">Amazon</a>
            <a className="hover:text-white" href="#">Gumroad</a>
            <a className="hover:text-white" href="#">Contact</a>
          </div>
        </div>
      </footer>

      <SignupModal open={open} onClose={() => setOpen(false)} onSuccess={() => setOpen(false)} />
    </div>
  )
}

export default App

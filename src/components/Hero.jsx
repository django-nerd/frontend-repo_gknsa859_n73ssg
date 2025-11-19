import { ArrowRight, BookOpen, ShoppingCart } from "lucide-react"

export default function Hero({ onSampleClick, coverUrl, title, subtitle, purchaseUrl }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.35),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.35),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm mb-4">
            <BookOpen size={16} /> New Release
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100/90">{subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={purchaseUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow"
            >
              <ShoppingCart size={18} /> Buy the Book
            </a>
            <button
              onClick={onSampleClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/20"
            >
              Get Free Sample <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-6 text-sm text-blue-200/80">
            Formats: PDF, EPUB, and Kindle compatible
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <img
              src={coverUrl}
              alt="Book cover"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900&auto=format&fit=crop" }}
            />
          </div>
          <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  )
}

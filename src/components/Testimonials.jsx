export default function Testimonials({ quotes }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">What Readers Are Saying</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <figure key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
              <blockquote className="text-blue-100/90">“{q.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-blue-300/80">— {q.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

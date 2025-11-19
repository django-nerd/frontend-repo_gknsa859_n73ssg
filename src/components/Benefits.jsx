import { CheckCircle2 } from "lucide-react"

export default function Benefits({ items }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Why You'll Love This Book</h2>
        <p className="mt-3 text-blue-200/80 text-center">Practical insights, clear frameworks, and stories you won't forget.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b, i) => (
            <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{b.title}</h3>
                  <p className="text-blue-200/80 mt-1 text-sm">{b.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

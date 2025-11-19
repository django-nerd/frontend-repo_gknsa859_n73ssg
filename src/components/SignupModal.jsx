import { useState } from "react"

export default function SignupModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
      const res = await fetch(`${baseUrl}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, consent: true, source: "landing-modal" })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Subscription failed")
      setMessage("Check your email for the sample chapter link.")
      onSuccess?.(data)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70" onClick={onClose} />
      <div className="relative bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-white">Get the free sample chapter</h3>
        <p className="text-sm text-blue-200/80 mt-1">Enter your email and we'll send you an instant download link.</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-2"
          >
            {loading ? "Submitting..." : "Send me the sample"}
          </button>
          {message && <p className="text-sm text-blue-200 mt-2">{message}</p>}
        </form>
        <button onClick={onClose} className="absolute top-2 right-3 text-blue-200/70 hover:text-white">✕</button>
      </div>
    </div>
  )
}

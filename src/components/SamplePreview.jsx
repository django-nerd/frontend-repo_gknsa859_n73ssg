import { useEffect, useState } from 'react'

export default function SamplePreview() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toc, setToc] = useState([])
  const [sample, setSample] = useState('')

  useEffect(() => {
    const fetchSample = async () => {
      setLoading(true)
      setError('')
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/manuscript/sample`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Failed to load sample')
        setToc(data.toc || [])
        setSample(data.sample_text || '')
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSample()
  }, [])

  if (loading) return <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-blue-200">Loading sample...</div>
  if (error) return <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-red-200">{error}</div>

  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white">Peek Inside</h2>
      {!!(toc?.length) && (
        <div className="mt-4">
          <h4 className="text-white/90 font-semibold">Table of Contents</h4>
          <ul className="list-disc list-inside mt-2 text-blue-200/80 space-y-1 max-h-40 overflow-auto">
            {toc.map((t, i) => (<li key={i}>{t}</li>))}
          </ul>
        </div>
      )}
      {sample && (
        <div className="mt-6">
          <h4 className="text-white/90 font-semibold">Sample</h4>
          <p className="whitespace-pre-wrap text-blue-200/80 mt-2 max-h-72 overflow-auto leading-relaxed">{sample}</p>
        </div>
      )}
      {!(toc?.length) && !sample && (
        <p className="text-blue-200/80">No sample available yet.</p>
      )}
    </div>
  )
}

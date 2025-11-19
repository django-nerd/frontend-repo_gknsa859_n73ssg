export default function Author({ name, bio, headshotUrl }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1">
          <img
            src={headshotUrl}
            alt={`${name} headshot`}
            className="w-40 h-40 object-cover rounded-2xl ring-1 ring-white/10 shadow"
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=600&auto=format&fit=crop" }}
          />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-white">About the Author</h2>
          <p className="mt-3 text-blue-200/90">{bio}</p>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center pt-12 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold holographic mb-6">
          Premium Rides.<br />Better for Everyone.
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-10">
          Instant or scheduled rides across Northwest Ohio. Transparent pricing, live tracking, and a driver-first platform powered by local Teslas.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/book" className="btn-gold px-8 py-4 rounded-xl text-lg">
            Book a Ride Now
          </Link>
          <Link href="/rides" className="border border-gold text-gold px-8 py-4 rounded-xl text-lg hover:bg-gold/10 transition">
            View My Rides
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="text-gold text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-semibold mb-2">Instant Rides</h3>
          <p className="text-zinc-400">Request a ride right now. Nearby drivers matched in seconds.</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="text-gold text-3xl mb-3">📅</div>
          <h3 className="text-xl font-semibold mb-2">Scheduled Rides</h3>
          <p className="text-zinc-400">Plan ahead for airport runs, appointments, or nights out.</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="text-gold text-3xl mb-3">🛡️</div>
          <h3 className="text-xl font-semibold mb-2">Transparent & Safe</h3>
          <p className="text-zinc-400">Upfront pricing. Live tracking. Local drivers you can trust.</p>
        </div>
      </section>

      <section className="text-center bg-zinc-900/30 border border-zinc-800 rounded-3xl p-12">
        <h2 className="text-3xl font-bold mb-4">NW Ohio Focused</h2>
        <p className="text-zinc-300 max-w-xl mx-auto">
          Serving Toledo, Perrysburg, Maumee, Holland, and surrounding areas. Expanding soon.
        </p>
      </section>
    </div>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HopRide | Premium Rides NW Ohio",
  description: "Instant and scheduled premium rides. Better for riders and drivers. Local to Northwest Ohio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-sm">
                HR
              </div>
              <span className="text-xl font-bold holographic">HopRide</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/" className="hover:text-gold transition">Home</a>
              <a href="/book" className="hover:text-gold transition">Book Ride</a>
              <a href="/rides" className="hover:text-gold transition">My Rides</a>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-800 mt-20 py-8 text-center text-zinc-500 text-sm">
          HopRide / A2B Rides • Premium local rides in Northwest Ohio • Better pay for drivers
        </footer>
      </body>
    </html>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  type: "instant" | "scheduled";
  scheduledTime?: string;
  fare: number;
  status: string;
  createdAt: string;
}

export default function BookPage() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState<"instant" | "scheduled">("instant");
  const [scheduledTime, setScheduledTime] = useState("");
  const [fare, setFare] = useState(18.50);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const base = 8.5;
    const distance = (pickup.length + dropoff.length) * 0.15;
    setFare(Math.round((base + distance) * 100) / 100);
  }, [pickup, dropoff]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    if (rideType === "scheduled" && !scheduledTime) return;

    setSubmitting(true);

    const ride: Ride = {
      id: Date.now().toString(),
      pickup,
      dropoff,
      type: rideType,
      scheduledTime: rideType === "scheduled" ? scheduledTime : undefined,
      fare,
      status: rideType === "instant" ? "Searching for driver..." : "Scheduled",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("hopride_rides") || "[]");
    localStorage.setItem("hopride_rides", JSON.stringify([ride, ...existing]));

    setTimeout(() => {
      setSubmitting(false);
      router.push("/rides?success=true");
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold holographic mb-2">Book Your Ride</h1>
      <p className="text-zinc-400 mb-8">Instant or scheduled. Upfront pricing. No surprises.</p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Pickup Location</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup address or use current location"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Dropoff Location</label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Where are you going?"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setRideType("instant")}
            className={`flex-1 py-3 rounded-xl border transition ${rideType === "instant" ? "border-gold bg-gold/10 text-gold" : "border-zinc-700 text-zinc-400"}`}
          >
            Instant
          </button>
          <button
            type="button"
            onClick={() => setRideType("scheduled")}
            className={`flex-1 py-3 rounded-xl border transition ${rideType === "scheduled" ? "border-gold bg-gold/10 text-gold" : "border-zinc-700 text-zinc-400"}`}
          >
            Scheduled
          </button>
        </div>

        {rideType === "scheduled" && (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Date & Time</label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              required
            />
          </div>
        )}

        <div className="bg-black/50 rounded-xl p-4 border border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Estimated Fare</span>
            <span className="text-2xl font-bold text-gold">${fare.toFixed(2)}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Includes base fare + distance estimate. Final fare may vary slightly.</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full btn-gold py-4 rounded-xl text-lg font-semibold disabled:opacity-50"
        >
          {submitting ? "Placing Order..." : rideType === "instant" ? "Request Instant Ride" : "Schedule Ride"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-zinc-500">
        Map integration and live driver matching coming in next phase with Supabase + Google Maps.
      </div>
    </div>
  );
}
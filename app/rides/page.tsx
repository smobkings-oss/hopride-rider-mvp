"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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

export default function RidesPage() {
  const searchParams = useSearchParams();
  const [rides, setRides] = useState<Ride[]>([]);
  const success = searchParams.get("success");

  useEffect(() => {
    const stored = localStorage.getItem("hopride_rides");
    if (stored) {
      setRides(JSON.parse(stored));
    }
  }, []);

  const clearRides = () => {
    localStorage.removeItem("hopride_rides");
    setRides([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold holographic">My Rides</h1>
          <p className="text-zinc-400 mt-1">Instant and scheduled ride history</p>
        </div>
        {rides.length > 0 && (
          <button onClick={clearRides} className="text-sm text-zinc-500 hover:text-red-400">
            Clear Demo Data
          </button>
        )}
      </div>

      {success && (
        <div className="mb-6 bg-gold/10 border border-gold/30 text-gold rounded-xl p-4">
          Ride request placed successfully! A driver will be matched shortly.
        </div>
      )}

      {rides.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 mb-4">No rides yet.</p>
          <a href="/book" className="btn-gold px-6 py-3 rounded-xl inline-block">
            Book Your First Ride
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div key={ride.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${ride.type === "instant" ? "bg-gold/20 text-gold" : "bg-blue-500/20 text-blue-400"}`}>
                    {ride.type === "instant" ? "Instant" : "Scheduled"}
                  </span>
                  <span className="ml-2 text-xs text-zinc-500">
                    {new Date(ride.createdAt).toLocaleString()}
                  </span>
                </div>
                <span className="text-xl font-bold text-gold">${ride.fare.toFixed(2)}</span>
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="text-zinc-500">From:</span> {ride.pickup}</p>
                <p><span className="text-zinc-500">To:</span> {ride.dropoff}</p>
                {ride.scheduledTime && (
                  <p><span className="text-zinc-500">When:</span> {new Date(ride.scheduledTime).toLocaleString()}</p>
                )}
                <p className="text-gold mt-2">{ride.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
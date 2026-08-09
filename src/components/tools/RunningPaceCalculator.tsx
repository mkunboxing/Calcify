"use client";
import { useState } from "react";
import { calculateRunningPace } from "@/lib/calculations-extended";

export default function RunningPaceCalculator() {
  const [distance, setDistance] = useState("10");
  const [time, setTime] = useState("50");
  const [result, setResult] = useState<ReturnType<typeof calculateRunningPace> | null>(null);

  function calculate() {
    try { setResult(calculateRunningPace(parseFloat(distance), parseFloat(time))); } catch {}
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Distance (km)</label>
          <input type="number" className="input" value={distance} onChange={e => setDistance(e.target.value)} step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Total Time (Minutes)</label>
          <input type="number" className="input" value={time} onChange={e => setTime(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate Pace & Speed</button>

      {result && (
        <div className="result-card animate-fade-up grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-slate-400 mb-1">Average Pace</p>
            <p className="text-2xl font-extrabold text-indigo-400">{result.paceMinPerKm} <span className="text-xs">/km</span></p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Speed (km/h)</p>
            <p className="text-2xl font-extrabold text-emerald-400">{result.speedKmh} <span className="text-xs">km/h</span></p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Speed (mph)</p>
            <p className="text-2xl font-extrabold text-purple-400">{result.speedMph} <span className="text-xs">mph</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

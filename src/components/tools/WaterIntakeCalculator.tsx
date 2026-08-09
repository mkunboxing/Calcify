"use client";
import { useState } from "react";
import { calculateWaterIntake } from "@/lib/calculations-extended";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState<"sedentary" | "moderate" | "active">("moderate");
  const [result, setResult] = useState<ReturnType<typeof calculateWaterIntake> | null>(null);

  function calculate() {
    try { setResult(calculateWaterIntake(parseFloat(weight), activity)); } catch {}
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Weight (kg)</label>
          <input type="number" className="input" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Daily Activity</label>
          <select className="input" value={activity} onChange={e => setActivity(e.target.value as any)}>
            <option value="sedentary">Sedentary (Low)</option>
            <option value="moderate">Moderate (30m workout)</option>
            <option value="active">Active (Heavy workout)</option>
          </select>
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate Water Needs</button>

      {result && (
        <div className="result-card animate-fade-up grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-slate-400 mb-1">Target Volume</p>
            <p className="text-3xl font-extrabold text-blue-400">{result.liters} L</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Standard Glasses (250ml)</p>
            <p className="text-3xl font-extrabold text-indigo-400">~{result.glasses}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">US Cups (240ml)</p>
            <p className="text-3xl font-extrabold text-teal-400">~{result.cups}</p>
          </div>
        </div>
      )}
    </div>
  );
}

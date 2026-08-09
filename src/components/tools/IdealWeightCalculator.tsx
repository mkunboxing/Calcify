"use client";
import { useState } from "react";
import { calculateIdealWeight } from "@/lib/calculations-extended";

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("175");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<ReturnType<typeof calculateIdealWeight> | null>(null);

  function calculate() {
    try { setResult(calculateIdealWeight(parseFloat(height), gender)); } catch {}
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Gender</label>
          <div className="flex gap-2">
            <button onClick={() => setGender("male")} className={gender === "male" ? "btn-primary flex-1" : "btn-secondary flex-1"}>Male</button>
            <button onClick={() => setGender("female")} className={gender === "female" ? "btn-primary flex-1" : "btn-secondary flex-1"}>Female</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
          <input type="number" className="input" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Estimate Ideal Weight</button>

      {result && (
        <div className="result-card animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-black/20">
            <p className="text-xs text-slate-400">Devine Formula</p>
            <p className="text-xl font-bold text-indigo-400">{result.devine} kg</p>
          </div>
          <div className="p-3 rounded-lg bg-black/20">
            <p className="text-xs text-slate-400">Robinson Formula</p>
            <p className="text-xl font-bold text-indigo-400">{result.robinson} kg</p>
          </div>
          <div className="p-3 rounded-lg bg-black/20">
            <p className="text-xs text-slate-400">Miller Formula</p>
            <p className="text-xl font-bold text-indigo-400">{result.miller} kg</p>
          </div>
          <div className="p-3 rounded-lg bg-black/20">
            <p className="text-xs text-slate-400">Hamwi Formula</p>
            <p className="text-xl font-bold text-indigo-400">{result.hamwi} kg</p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { calculateStatistics } from "@/lib/calculations-extended";

export default function StatisticsCalculator() {
  const [input, setInput] = useState("12, 15, 18, 22, 22, 25, 30");
  const [result, setResult] = useState<ReturnType<typeof calculateStatistics> | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
      setResult(calculateStatistics(nums));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Numbers (comma or space separated)
        </label>
        <textarea className="input font-mono" rows={3} value={input} onChange={e => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Statistics</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Mean (Average)</p>
              <p className="text-xl font-bold text-indigo-400">{result.mean}</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Median</p>
              <p className="text-xl font-bold text-indigo-400">{result.median}</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Mode</p>
              <p className="text-xl font-bold text-indigo-400">{result.mode.length > 0 ? result.mode.join(", ") : "None"}</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Std Deviation</p>
              <p className="text-xl font-bold text-indigo-400">{result.stdDev}</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Variance</p>
              <p className="text-sm font-bold text-slate-200">{result.variance}</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Range</p>
              <p className="text-sm font-bold text-slate-200">{result.range} ({result.min} to {result.max})</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Sum</p>
              <p className="text-sm font-bold text-slate-200">{result.sum}</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-slate-400">Count (N)</p>
              <p className="text-sm font-bold text-slate-200">{result.count}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

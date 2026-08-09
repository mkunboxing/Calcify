"use client";
import { useState } from "react";
import { calculateCAGR } from "@/lib/calculations-extended";

export default function CAGRCalculator() {
  const [begin, setBegin] = useState("10000");
  const [end, setEnd] = useState("25000");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateCAGR(parseFloat(begin), parseFloat(end), parseFloat(years)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Initial Value (₹)</label>
          <input type="number" className="input" value={begin} onChange={e => setBegin(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Final Value (₹)</label>
          <input type="number" className="input" value={end} onChange={e => setEnd(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Time Period (Years)</label>
          <input type="number" className="input" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate CAGR</button>
        {result !== null && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Compound Annual Growth Rate</p>
          <p className="text-4xl font-extrabold gradient-text">{result}% p.a.</p>
        </div>
      )}
    </div>
  );
}

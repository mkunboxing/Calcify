"use client";
import { useState } from "react";
import { calculateMarkup } from "@/lib/calculations-extended";

export default function MarkupCalculator() {
  const [cost, setCost] = useState("500");
  const [markup, setMarkup] = useState("40");
  const [result, setResult] = useState<{ sellingPrice: number; profit: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateMarkup(parseFloat(cost), parseFloat(markup)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Cost Price (₹)</label>
          <input type="number" className="input" value={cost} onChange={e => setCost(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Markup (%)</label>
          <input type="number" className="input" value={markup} onChange={e => setMarkup(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Selling Price</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Selling Price</p>
            <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.sellingPrice)}</p>
          </div>
          <div className="text-center pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Gross Profit per Unit</p>
            <p className="font-bold text-lg" style={{ color: "#10b981" }}>₹{fmt(result.profit)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { calculateProfitMargin } from "@/lib/calculations-extended";

export default function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState("100000");
  const [cost, setCost] = useState("65000");
  const [result, setResult] = useState<{ grossProfit: number; margin: number; markup: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateProfitMargin(parseFloat(revenue), parseFloat(cost)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Total Revenue / Selling Price (₹)</label>
          <input type="number" className="input" value={revenue} onChange={e => setRevenue(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Cost of Goods / Service (₹)</label>
          <input type="number" className="input" value={cost} onChange={e => setCost(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Margin</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Profit Margin</p>
            <p className="text-4xl font-extrabold gradient-text">{result.margin}%</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Gross Profit</p>
              <p className="font-bold text-lg" style={{ color: "#10b981" }}>₹{fmt(result.grossProfit)}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Markup Percentage</p>
              <p className="font-bold text-lg" style={{ color: "#8b5cf6" }}>{result.markup}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

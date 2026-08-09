"use client";
import { useState } from "react";
import { calculateROI } from "@/lib/calculations-extended";

export default function ROICalculator() {
  const [investment, setInvestment] = useState("50000");
  const [finalValue, setFinalValue] = useState("75000");
  const [result, setResult] = useState<{ roi: number; netProfit: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateROI(parseFloat(investment), parseFloat(finalValue)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Amount Invested (₹)</label>
          <input type="number" className="input" value={investment} onChange={e => setInvestment(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Amount Returned / Final Value (₹)</label>
          <input type="number" className="input" value={finalValue} onChange={e => setFinalValue(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate ROI</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Return on Investment (ROI)</p>
            <p className="text-4xl font-extrabold gradient-text">{result.roi}%</p>
          </div>
          <div className="text-center pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Net Profit / Gain</p>
            <p className="font-bold text-lg" style={{ color: result.netProfit >= 0 ? "#10b981" : "#ef4444" }}>
              {result.netProfit >= 0 ? "+" : ""}₹{fmt(result.netProfit)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

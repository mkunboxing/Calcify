"use client";
import { useState } from "react";
import { calculateBreakEven } from "@/lib/calculations-extended";

export default function BreakevenCalculator() {
  const [fixedCost, setFixedCost] = useState("100000");
  const [sellingPrice, setSellingPrice] = useState("500");
  const [variableCost, setVariableCost] = useState("300");
  const [result, setResult] = useState<{ breakEvenUnits: number; breakEvenRevenue: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateBreakEven(parseFloat(fixedCost), parseFloat(sellingPrice), parseFloat(variableCost)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Total Fixed Costs (₹)</label>
          <input type="number" className="input" value={fixedCost} onChange={e => setFixedCost(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Selling Price / Unit (₹)</label>
          <input type="number" className="input" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Variable Cost / Unit (₹)</label>
          <input type="number" className="input" value={variableCost} onChange={e => setVariableCost(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Break-even</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Break-even Quantity</p>
            <p className="text-4xl font-extrabold gradient-text">{result.breakEvenUnits.toLocaleString()} units</p>
          </div>
          <div className="text-center pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Break-even Sales Revenue</p>
            <p className="font-bold text-lg" style={{ color: "#10b981" }}>₹{fmt(result.breakEvenRevenue)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

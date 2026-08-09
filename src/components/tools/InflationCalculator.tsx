"use client";
import { useState } from "react";
import { calculateInflation } from "@/lib/calculations-extended";

export default function InflationCalculator() {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("6.0");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<{ futureValue: number; purchasing_power_loss: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateInflation(parseFloat(amount), parseFloat(rate), parseFloat(years)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Current Amount / Cost (₹)</label>
          <input type="number" className="input" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Expected Inflation Rate (% p.a.)</label>
          <input type="number" className="input" value={rate} onChange={e => setRate(e.target.value)} step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Time Period (Years)</label>
          <input type="number" className="input" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Future Equivalent</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Equivalent Future Cost</p>
            <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.futureValue)}</p>
          </div>
          <div className="text-center pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Purchasing Power Depreciation</p>
            <p className="font-bold text-lg" style={{ color: "#ef4444" }}>+₹{fmt(result.purchasing_power_loss)} needed</p>
          </div>
        </div>
      )}
    </div>
  );
}

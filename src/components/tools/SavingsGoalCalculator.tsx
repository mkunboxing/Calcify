"use client";
import { useState } from "react";
import { calculateSavingsGoal } from "@/lib/calculations-extended";

export default function SavingsGoalCalculator() {
  const [target, setTarget] = useState("500000");
  const [current, setCurrent] = useState("50000");
  const [rate, setRate] = useState("8.0");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{ monthlyRequired: number; totalContributions: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateSavingsGoal(parseFloat(target), parseFloat(current), parseFloat(rate), parseFloat(years)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Target Savings Goal (₹)</label>
          <input type="number" className="input" value={target} onChange={e => setTarget(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Current Savings (₹)</label>
          <input type="number" className="input" value={current} onChange={e => setCurrent(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Expected Return Rate (% p.a.)</label>
          <input type="number" className="input" value={rate} onChange={e => setRate(e.target.value)} step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Time Horizon (Years)</label>
          <input type="number" className="input" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Required Saving</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Required Monthly Saving</p>
            <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.monthlyRequired)} / mo</p>
          </div>
          <div className="text-center pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Monthly Contributions Needed</p>
            <p className="font-bold text-lg">₹{fmt(result.totalContributions)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

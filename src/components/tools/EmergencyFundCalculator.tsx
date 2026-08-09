"use client";
import { useState } from "react";
import { calculateEmergencyFund } from "@/lib/calculations-extended";

export default function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState("40000");
  const [months, setMonths] = useState("6");
  const [result, setResult] = useState<{ targetFund: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateEmergencyFund(parseFloat(expenses), parseFloat(months)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Essential Monthly Expenses (₹)</label>
          <input type="number" className="input" value={expenses} onChange={e => setExpenses(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Months of Coverage Needed</label>
          <select className="input" value={months} onChange={e => setMonths(e.target.value)}>
            <option value="3">3 Months (Standard)</option>
            <option value="6">6 Months (Recommended)</option>
            <option value="9">9 Months (Conservative)</option>
            <option value="12">12 Months (High Security)</option>
          </select>
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Target Fund</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Target Emergency Reserve</p>
          <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.targetFund)}</p>
        </div>
      )}
    </div>
  );
}

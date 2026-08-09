"use client";

import { useState } from "react";
import { calculateSIP } from "@/lib/calculations";

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<{ investedAmount: number; estimatedReturns: number; maturityValue: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    try {
      setResult(calculateSIP(parseFloat(monthly), parseFloat(rate), parseFloat(years)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid input");
    }
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const pct = result
    ? Math.round((result.estimatedReturns / result.investedAmount) * 100)
    : 0;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {[
          { id: "sip-monthly", label: "Monthly Investment (₹)", val: monthly, set: setMonthly, placeholder: "5000" },
          { id: "sip-rate", label: "Expected Return (% p.a.)", val: rate, set: setRate, placeholder: "12" },
          { id: "sip-years", label: "Time Period (Years)", val: years, set: setYears, placeholder: "10" },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>{f.label}</label>
            <input id={f.id} type="number" className="input" value={f.val}
              onChange={e => f.set(e.target.value)} placeholder={f.placeholder} min="1" />
          </div>
        ))}
      </div>

      {error && <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}

      <div className="flex gap-3 mb-6">
        <button id="sip-calculate" onClick={calculate} className="btn-primary flex-1">Calculate Returns</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>

      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Maturity Value</p>
            <p className="text-4xl font-extrabold gradient-text">{fmt(result.maturityValue)}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Invested</p>
              <p className="font-bold text-sm">{fmt(result.investedAmount)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Returns</p>
              <p className="font-bold text-sm" style={{ color: "#10b981" }}>{fmt(result.estimatedReturns)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Gain %</p>
              <p className="font-bold text-sm" style={{ color: "#10b981" }}>+{pct}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { calculateEMI } from "@/lib/calculations";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("10");
  const [tenure, setTenure] = useState("60");
  const [tenureType, setTenureType] = useState<"months" | "years">("months");
  const [result, setResult] = useState<{ emi: number; totalAmount: number; totalInterest: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    try {
      const months = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);
      const res = calculateEMI(parseFloat(principal), parseFloat(rate), months);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid input");
    }
  }

  function reset() { setResult(null); setError(""); }

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Loan Amount (₹)
          </label>
          <input id="emi-principal" type="number" className="input" value={principal}
            onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 500000" min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Annual Interest Rate (%)
          </label>
          <input id="emi-rate" type="number" className="input" value={rate}
            onChange={e => setRate(e.target.value)} placeholder="e.g. 10" step="0.1" min="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Loan Tenure
          </label>
          <div className="flex gap-2">
            <input id="emi-tenure" type="number" className="input" value={tenure}
              onChange={e => setTenure(e.target.value)} placeholder="e.g. 60" min="1" />
            <select
              className="input w-28 flex-shrink-0"
              value={tenureType}
              onChange={e => setTenureType(e.target.value as "months" | "years")}
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>
      </div>

      {error && <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}

      <div className="flex gap-3 mb-6">
        <button id="emi-calculate" onClick={calculate} className="btn-primary flex-1">Calculate EMI</button>
        {result && <button onClick={reset} className="btn-secondary">Reset</button>}
      </div>

      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Monthly EMI</p>
            <p className="text-4xl font-extrabold gradient-text">{fmt(result.emi)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Total Amount Payable</p>
              <p className="font-bold">{fmt(result.totalAmount)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Total Interest</p>
              <p className="font-bold" style={{ color: "#f59e0b" }}>{fmt(result.totalInterest)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

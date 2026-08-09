"use client";
import { useState } from "react";
import { calculateSimpleInterest } from "@/lib/calculations-extended";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{ interest: number; totalAmount: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateSimpleInterest(parseFloat(principal), parseFloat(rate), parseFloat(years)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Principal Amount (₹)</label>
          <input id="si-principal" type="number" className="input" value={principal} onChange={e => setPrincipal(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Interest Rate (% p.a.)</label>
          <input id="si-rate" type="number" className="input" value={rate} onChange={e => setRate(e.target.value)} step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Time Period (Years)</label>
          <input id="si-years" type="number" className="input" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="si-calculate" onClick={calculate} className="btn-primary flex-1">Calculate Interest</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Total Amount Payable</p>
            <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.totalAmount)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Principal Amount</p>
              <p className="font-bold">₹{fmt(parseFloat(principal))}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Simple Interest</p>
              <p className="font-bold" style={{ color: "#10b981" }}>₹{fmt(result.interest)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

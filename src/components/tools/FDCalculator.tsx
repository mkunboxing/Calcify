"use client";
import { useState } from "react";
import { calculateFD } from "@/lib/calculations-extended";

export default function FDCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7.5");
  const [years, setYears] = useState("5");
  const [freq, setFreq] = useState(4); // quarterly
  const [result, setResult] = useState<{ maturityAmount: number; interest: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateFD(parseFloat(principal), parseFloat(rate), parseFloat(years), freq));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Total Investment (₹)</label>
          <input type="number" className="input" value={principal} onChange={e => setPrincipal(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Interest Rate (% p.a.)</label>
          <input type="number" className="input" value={rate} onChange={e => setRate(e.target.value)} step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Tenure (Years)</label>
          <input type="number" className="input" value={years} onChange={e => setYears(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Compounding Frequency</label>
          <select className="input" value={freq} onChange={e => setFreq(Number(e.target.value))}>
            <option value={1}>Annually</option>
            <option value={2}>Half-Yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate FD Return</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Maturity Amount</p>
            <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.maturityAmount)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Investment</p>
              <p className="font-bold">₹{fmt(parseFloat(principal))}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Est. Interest</p>
              <p className="font-bold" style={{ color: "#10b981" }}>₹{fmt(result.interest)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

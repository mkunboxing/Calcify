"use client";
import { useState } from "react";
import { calculateDateDifference } from "@/lib/calculations";

export default function DateDifferenceCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<{ days: number; weeks: number; months: number; years: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      if (!from || !to) throw new Error("Please select both dates");
      setResult(calculateDateDifference(new Date(from), new Date(to)));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Start Date</label>
          <input id="dd-from" type="date" className="input" value={from} onChange={e => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>End Date</label>
          <input id="dd-to" type="date" className="input" value={to} onChange={e => setTo(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="dd-calculate" onClick={calculate} className="btn-primary flex-1">Calculate Difference</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Total Days Apart</p>
            <p className="text-4xl font-extrabold gradient-text">{result.days.toLocaleString()} days</p>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t text-center" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            {[
              { label: "Weeks", val: result.weeks },
              { label: "Months", val: result.months },
              { label: "Years", val: result.years },
            ].map(r => (
              <div key={r.label}>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{r.label}</p>
                <p className="font-bold">{r.val}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

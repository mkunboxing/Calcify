"use client";
import { useState } from "react";
import { calculatePercentage, percentageOf, percentageChange } from "@/lib/calculations";

type Mode = "whatPercent" | "percentOf" | "percentChange";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("whatPercent");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      const av = parseFloat(a), bv = parseFloat(b);
      if (isNaN(av) || isNaN(bv)) throw new Error("Enter valid numbers");
      if (mode === "whatPercent") setResult(calculatePercentage(av, bv));
      else if (mode === "percentOf") setResult(percentageOf(av, bv));
      else setResult(percentageChange(av, bv));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const modes = [
    { id: "whatPercent" as Mode, label: "% of total", aLabel: "Value", bLabel: "Total" },
    { id: "percentOf" as Mode, label: "X% of Y", aLabel: "Percent (%)", bLabel: "Number" },
    { id: "percentChange" as Mode, label: "% Change", aLabel: "From", bLabel: "To" },
  ];
  const m = modes.find(x => x.id === mode)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {modes.map((md) => (
          <button key={md.id} onClick={() => { setMode(md.id); setResult(null); setError(""); }}
            className={md.id === mode ? "btn-primary text-sm px-4 py-1.5" : "btn-secondary text-sm px-4 py-1.5"}>
            {md.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>{m.aLabel}</label>
          <input id="pct-a" type="number" className="input" value={a} onChange={e => setA(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>{m.bLabel}</label>
          <input id="pct-b" type="number" className="input" value={b} onChange={e => setB(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-5">
        <button id="pct-calculate" onClick={calculate} className="btn-primary flex-1">Calculate</button>
        {result !== null && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Result</p>
          <p className="text-4xl font-extrabold gradient-text">
            {mode === "percentOf" ? result : `${result}%`}
          </p>
        </div>
      )}
    </div>
  );
}

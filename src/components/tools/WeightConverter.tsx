"use client";
import { useState } from "react";
import { convertWeight } from "@/lib/calculations";

const UNITS = [
  { value: "mg", label: "Milligram (mg)" },
  { value: "g", label: "Gram (g)" },
  { value: "kg", label: "Kilogram (kg)" },
  { value: "tonne", label: "Metric Tonne (t)" },
  { value: "oz", label: "Ounce (oz)" },
  { value: "lb", label: "Pound (lb)" },
  { value: "stone", label: "Stone (st)" },
];

export default function WeightConverter() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("kg");
  const [to, setTo] = useState("lb");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function convert() {
    setError(""); setResult(null);
    try {
      const v = parseFloat(value);
      if (isNaN(v)) throw new Error("Enter a valid number");
      setResult(convertWeight(v, from, to));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  function swap() { setFrom(to); setTo(from); setResult(null); }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Value</label>
        <input id="wt-value" type="number" className="input" value={value}
          onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} />
      </div>
      <div className="grid grid-cols-5 gap-3 items-end mb-5">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>From</label>
          <select id="wt-from" className="input" value={from} onChange={e => setFrom(e.target.value)}>
            {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <div className="flex justify-center pb-0.5">
          <button onClick={swap} className="btn-secondary px-3 py-2 text-lg" title="Swap">⇄</button>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>To</label>
          <select id="wt-to" className="input" value={to} onChange={e => setTo(e.target.value)}>
            {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="wt-convert" onClick={convert} className="btn-primary flex-1">Convert</button>
        {result !== null && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
            {value} {UNITS.find(u => u.value === from)?.label} =
          </p>
          <p className="text-4xl font-extrabold gradient-text">
            {result.toLocaleString(undefined, { maximumSignificantDigits: 8 })}
          </p>
          <p className="text-lg mt-1" style={{ color: "var(--text-secondary)" }}>
            {UNITS.find(u => u.value === to)?.label}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { convertArea } from "@/lib/calculations-extended";

const UNITS = [
  { value: "sqm", label: "Square Meters (m²)" },
  { value: "sqft", label: "Square Feet (ft²)" },
  { value: "acre", label: "Acres" },
  { value: "hectare", label: "Hectares" },
  { value: "sqkm", label: "Square Kilometers (km²)" },
  { value: "sqmi", label: "Square Miles (mi²)" },
  { value: "sqyd", label: "Square Yards (yd²)" },
  { value: "sqin", label: "Square Inches (in²)" },
];

export default function AreaConverter() {
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("acre");
  const [to, setTo] = useState("sqft");
  const [result, setResult] = useState<number | null>(null);

  function convert() {
    try { setResult(convertArea(parseFloat(val), from, to)); } catch {}
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Value</label>
        <input type="number" className="input" value={val} onChange={e => setVal(e.target.value)} />
      </div>
      <div className="grid grid-cols-5 gap-2 items-center mb-6">
        <div className="col-span-2">
          <label className="block text-xs font-medium mb-1">From</label>
          <select className="input text-sm" value={from} onChange={e => setFrom(e.target.value)}>
            {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <button onClick={() => { setFrom(to); setTo(from); }} className="btn-secondary text-center self-end mb-1">⇄</button>
        <div className="col-span-2">
          <label className="block text-xs font-medium mb-1">To</label>
          <select className="input text-sm" value={to} onChange={e => setTo(e.target.value)}>
            {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>
      <button onClick={convert} className="btn-primary w-full mb-6">Convert Area</button>

      {result !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm text-slate-400 mb-1">Converted Value</p>
          <p className="text-4xl font-extrabold gradient-text">{result.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

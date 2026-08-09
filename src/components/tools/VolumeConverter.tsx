"use client";
import { useState } from "react";
import { convertVolume } from "@/lib/calculations-extended";

const UNITS = [
  { value: "l", label: "Liters (L)" },
  { value: "ml", label: "Milliliters (mL)" },
  { value: "gallon", label: "US Gallons (gal)" },
  { value: "cup", label: "US Cups" },
  { value: "pint", label: "US Pints" },
  { value: "quart", label: "US Quarts" },
  { value: "floz", label: "Fluid Ounces (fl oz)" },
  { value: "m3", label: "Cubic Meters (m³)" },
];

export default function VolumeConverter() {
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("l");
  const [to, setTo] = useState("cup");
  const [result, setResult] = useState<number | null>(null);

  function convert() {
    try { setResult(convertVolume(parseFloat(val), from, to)); } catch {}
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
      <button onClick={convert} className="btn-primary w-full mb-6">Convert Volume</button>

      {result !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm text-slate-400 mb-1">Converted Value</p>
          <p className="text-4xl font-extrabold gradient-text">{result.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

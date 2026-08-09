"use client";
import { useState } from "react";
import { convertTemperature } from "@/lib/calculations";

const UNITS = [
  { value: "C", label: "Celsius (°C)" },
  { value: "F", label: "Fahrenheit (°F)" },
  { value: "K", label: "Kelvin (K)" },
];

export default function TemperatureConverter() {
  const [value, setValue] = useState("0");
  const [from, setFrom] = useState("C");
  const [to, setTo] = useState("F");
  const [result, setResult] = useState<number | null>(null);

  function convert() {
    const v = parseFloat(value);
    if (!isNaN(v)) setResult(convertTemperature(v, from, to));
  }

  // Auto-convert on change
  function handleValue(v: string) { setValue(v); const n = parseFloat(v); if (!isNaN(n)) setResult(convertTemperature(n, from, to)); }
  function handleFrom(f: string) { setFrom(f); const n = parseFloat(value); if (!isNaN(n)) setResult(convertTemperature(n, f, to)); }
  function handleTo(t: string) { setTo(t); const n = parseFloat(value); if (!isNaN(n)) setResult(convertTemperature(n, from, t)); }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Temperature</label>
        <input id="temp-value" type="number" className="input" value={value} onChange={e => handleValue(e.target.value)} />
      </div>
      <div className="grid grid-cols-5 gap-3 items-end mb-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>From</label>
          <select id="temp-from" className="input" value={from} onChange={e => handleFrom(e.target.value)}>
            {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <div className="flex justify-center pb-0.5">
          <button onClick={() => { handleFrom(to); handleTo(from); }} className="btn-secondary px-3 py-2 text-lg">⇄</button>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>To</label>
          <select id="temp-to" className="input" value={to} onChange={e => handleTo(e.target.value)}>
            {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
            {value}° {from} =
          </p>
          <p className="text-4xl font-extrabold gradient-text">
            {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}° {to}
          </p>
        </div>
      )}

      {/* Quick reference table */}
      <div className="mt-6">
        <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>QUICK REFERENCE</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { label: "Freezing", c: 0, f: 32, k: 273.15 },
            { label: "Body Temp", c: 37, f: 98.6, k: 310.15 },
            { label: "Boiling", c: 100, f: 212, k: 373.15 },
          ].map(r => (
            <div key={r.label} className="card p-2 cursor-pointer"
              onClick={() => { handleValue(String(r.c)); handleFrom("C"); }}>
              <p className="font-medium" style={{ color: "var(--text-secondary)" }}>{r.label}</p>
              <p style={{ color: "var(--text-muted)" }}>{r.c}°C / {r.f}°F</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

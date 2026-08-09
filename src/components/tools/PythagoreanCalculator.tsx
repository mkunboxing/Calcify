"use client";
import { useState } from "react";
import { pythagorean } from "@/lib/calculations-extended";

export default function PythagoreanCalculator() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [c, setC] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    try {
      const av = a !== "" ? parseFloat(a) : null;
      const bv = b !== "" ? parseFloat(b) : null;
      const cv = c !== "" ? parseFloat(c) : null;
      setResult(pythagorean(av, bv, cv));
    } catch {}
  }

  return (
    <div>
      <p className="text-xs mb-4 text-slate-400">Formula: <span className="font-mono text-indigo-400">a² + b² = c²</span> (Leave one input empty to solve)</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium mb-1">Side a</label>
          <input type="number" className="input" value={a} onChange={e => setA(e.target.value)} placeholder="3" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Side b</label>
          <input type="number" className="input" value={b} onChange={e => setB(e.target.value)} placeholder="4" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Hypotenuse c</label>
          <input type="number" className="input" value={c} onChange={e => setC(e.target.value)} placeholder="Solve" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Solve Triangle Side</button>

      {result !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm text-slate-400 mb-1">Calculated Missing Side Length</p>
          <p className="text-4xl font-extrabold gradient-text">{result}</p>
        </div>
      )}
    </div>
  );
}

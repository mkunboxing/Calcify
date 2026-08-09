"use client";
import { useState } from "react";
import { solveQuadratic } from "@/lib/calculations-extended";

export default function QuadraticSolver() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");
  const [result, setResult] = useState<ReturnType<typeof solveQuadratic> | null>(null);

  function calculate() {
    try { setResult(solveQuadratic(parseFloat(a), parseFloat(b), parseFloat(c))); } catch {}
  }

  return (
    <div>
      <p className="text-xs mb-4 text-slate-400">Equation form: <span className="font-mono text-indigo-400">ax² + bx + c = 0</span></p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium mb-1">a</label>
          <input type="number" className="input" value={a} onChange={e => setA(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">b</label>
          <input type="number" className="input" value={b} onChange={e => setB(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">c</label>
          <input type="number" className="input" value={c} onChange={e => setC(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Solve Quadratic</button>

      {result && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-xs text-slate-400 mb-1">Discriminant (b² − 4ac) = {result.discriminant}</p>
          <p className="text-sm font-semibold mb-3 text-indigo-300">Nature: {result.nature} roots</p>
          <div className="space-y-1">
            {result.roots.map((r, i) => (
              <p key={i} className="text-2xl font-extrabold gradient-text">x{i+1} = {r}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

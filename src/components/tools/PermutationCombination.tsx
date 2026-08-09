"use client";
import { useState } from "react";
import { permutation, combination } from "@/lib/calculations-extended";

export default function PermutationCombination() {
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");
  const [nPr, setNPr] = useState<number | null>(null);
  const [nCr, setNCr] = useState<number | null>(null);

  function calculate() {
    try {
      const nv = parseInt(n), rv = parseInt(r);
      setNPr(permutation(nv, rv));
      setNCr(combination(nv, rv));
    } catch {}
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Total Objects (n)</label>
          <input type="number" className="input" value={n} onChange={e => setN(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Sample Size (r)</label>
          <input type="number" className="input" value={r} onChange={e => setR(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate nPr & nCr</button>

      {nPr !== null && nCr !== null && (
        <div className="result-card animate-fade-up grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-slate-400 mb-1">Permutations (nPr)</p>
            <p className="text-3xl font-extrabold text-indigo-400">{nPr.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Combinations (nCr)</p>
            <p className="text-3xl font-extrabold text-emerald-400">{nCr.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

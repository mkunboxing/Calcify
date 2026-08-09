"use client";
import { useState } from "react";
import { simplifyRatio, solveProportion } from "@/lib/calculations-extended";

export default function RatioCalculator() {
  const [a, setA] = useState("12");
  const [b, setB] = useState("18");
  const [simplified, setSimplified] = useState<{ a: number; b: number } | null>(null);

  // Proportion solver: A : B = C : X
  const [pa, setPa] = useState("4");
  const [pb, setPb] = useState("5");
  const [pc, setPc] = useState("20");
  const [px, setPx] = useState<number | null>(null);

  function handleSimplify() {
    try { setSimplified(simplifyRatio(parseFloat(a), parseFloat(b))); } catch {}
  }

  function handleProportion() {
    try { setPx(solveProportion(parseFloat(pa), parseFloat(pb), parseFloat(pc))); } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <h3 className="font-bold text-sm mb-3">Simplify Ratio</h3>
        <div className="flex gap-2 items-center mb-4">
          <input type="number" className="input" value={a} onChange={e => setA(e.target.value)} />
          <span className="font-bold text-lg">:</span>
          <input type="number" className="input" value={b} onChange={e => setB(e.target.value)} />
          <button onClick={handleSimplify} className="btn-primary">Simplify</button>
        </div>
        {simplified && (
          <p className="text-center font-bold text-xl gradient-text">
            Simplified Ratio = {simplified.a} : {simplified.b}
          </p>
        )}
      </div>

      <div className="p-4 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <h3 className="font-bold text-sm mb-3">Proportion Solver (A : B = C : X)</h3>
        <div className="grid grid-cols-4 gap-2 items-center mb-4">
          <input type="number" className="input" value={pa} onChange={e => setPa(e.target.value)} placeholder="A" />
          <input type="number" className="input" value={pb} onChange={e => setPb(e.target.value)} placeholder="B" />
          <input type="number" className="input" value={pc} onChange={e => setPc(e.target.value)} placeholder="C" />
          <button onClick={handleProportion} className="btn-primary">Solve X</button>
        </div>
        {px !== null && (
          <p className="text-center font-bold text-xl gradient-text">
            X = {px}
          </p>
        )}
      </div>
    </div>
  );
}

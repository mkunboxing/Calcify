"use client";
import { useState } from "react";
import { checkPrime } from "@/lib/calculations-extended";

export default function PrimeChecker() {
  const [num, setNum] = useState("29");
  const [result, setResult] = useState<{ isPrime: boolean; factors: number[] } | null>(null);

  function calculate() {
    try { setResult(checkPrime(parseInt(num))); } catch {}
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Enter an Integer</label>
        <input type="number" className="input" value={num} onChange={e => setNum(e.target.value)} />
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Check Prime Status</button>

      {result && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Status</p>
          <p className="text-3xl font-extrabold mb-3" style={{ color: result.isPrime ? "#10b981" : "#ef4444" }}>
            {result.isPrime ? "✓ PRIME NUMBER" : "✗ NOT A PRIME NUMBER"}
          </p>
          <div className="pt-3 border-t text-xs text-slate-400" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            Factors of {num}: <strong className="text-slate-200">{result.factors.join(", ")}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

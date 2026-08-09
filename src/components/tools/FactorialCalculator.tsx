"use client";
import { useState } from "react";
import { factorial } from "@/lib/calculations-extended";

export default function FactorialCalculator() {
  const [num, setNum] = useState("10");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(factorial(parseInt(num)).toString());
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Enter Number (n ≤ 170)</label>
        <input type="number" className="input" value={num} onChange={e => setNum(e.target.value)} max="170" min="0" />
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate n!</button>

      {result && (
        <div className="result-card animate-fade-up">
          <p className="text-sm mb-1 text-center" style={{ color: "var(--text-secondary)" }}>{num}! =</p>
          <p className="font-mono text-xl font-bold break-all text-center gradient-text">{result}</p>
        </div>
      )}
    </div>
  );
}

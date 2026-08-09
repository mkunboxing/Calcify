"use client";
import { useState } from "react";
import { fractionOp, Fraction } from "@/lib/calculations-extended";

export default function FractionCalculator() {
  const [num1, setNum1] = useState("3");
  const [den1, setDen1] = useState("4");
  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");
  const [num2, setNum2] = useState("2");
  const [den2, setDen2] = useState("5");
  const [result, setResult] = useState<Fraction | null>(null);

  function calculate() {
    try {
      setResult(fractionOp(
        { num: parseInt(num1), den: parseInt(den1) },
        { num: parseInt(num2), den: parseInt(den2) },
        op
      ));
    } catch {}
  }

  return (
    <div>
      <div className="flex gap-3 items-center justify-center mb-6">
        <div className="w-20 text-center">
          <input type="number" className="input text-center mb-1" value={num1} onChange={e => setNum1(e.target.value)} />
          <hr className="border-t-2 border-indigo-500 mb-1" />
          <input type="number" className="input text-center" value={den1} onChange={e => setDen1(e.target.value)} />
        </div>
        <select className="input w-16 text-center text-lg font-bold" value={op} onChange={e => setOp(e.target.value as any)}>
          <option value="+">+</option>
          <option value="-">−</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <div className="w-20 text-center">
          <input type="number" className="input text-center mb-1" value={num2} onChange={e => setNum2(e.target.value)} />
          <hr className="border-t-2 border-indigo-500 mb-1" />
          <input type="number" className="input text-center" value={den2} onChange={e => setDen2(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate Fraction</button>

      {result && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Result</p>
          <div className="inline-block text-center">
            <p className="text-3xl font-extrabold gradient-text">{result.num}</p>
            {result.den !== 1 && (
              <>
                <hr className="border-t-2 border-indigo-500 my-1" />
                <p className="text-3xl font-extrabold gradient-text">{result.den}</p>
              </>
            )}
          </div>
          {result.den !== 1 && (
            <p className="text-xs mt-3 text-slate-400">
              Decimal value: {(result.num / result.den).toFixed(4)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { calculateRetirementCorpus } from "@/lib/calculations-extended";

export default function RetirementCorpusCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("60");
  const [monthlyExpenses, setMonthlyExpenses] = useState("50000");
  const [inflationRate, setInflationRate] = useState("6.0");
  const [postReturn, setPostReturn] = useState("8.0");
  const [lifeExpectancy, setLifeExpectancy] = useState("85");
  const [result, setResult] = useState<{ corpusRequired: number; inflatedMonthlyExpenses: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      setResult(calculateRetirementCorpus(
        parseFloat(currentAge), parseFloat(retirementAge), parseFloat(monthlyExpenses),
        parseFloat(inflationRate), parseFloat(postReturn), parseFloat(lifeExpectancy)
      ));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Current Age</label>
          <input type="number" className="input" value={currentAge} onChange={e => setCurrentAge(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Retirement Age</label>
          <input type="number" className="input" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Life Expectancy</label>
          <input type="number" className="input" value={lifeExpectancy} onChange={e => setLifeExpectancy(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Current Monthly Expense (₹)</label>
          <input type="number" className="input" value={monthlyExpenses} onChange={e => setMonthlyExpenses(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Expected Inflation (% p.a.)</label>
          <input type="number" className="input" value={inflationRate} onChange={e => setInflationRate(e.target.value)} step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Post-Retirement Return (% p.a.)</label>
          <input type="number" className="input" value={postReturn} onChange={e => setPostReturn(e.target.value)} step="0.1" />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-primary flex-1">Calculate Retirement Corpus</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Required Retirement Corpus</p>
            <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.corpusRequired)}</p>
          </div>
          <div className="text-center pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Inflated Monthly Expense at Age {retirementAge}</p>
            <p className="font-bold text-lg">₹{fmt(result.inflatedMonthlyExpenses)} / mo</p>
          </div>
        </div>
      )}
    </div>
  );
}

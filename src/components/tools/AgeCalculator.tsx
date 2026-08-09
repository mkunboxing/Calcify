"use client";
import { useState } from "react";
import { calculateAge } from "@/lib/calculations";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [refDate, setRefDate] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try {
      if (!dob) throw new Error("Please enter your date of birth");
      const birth = new Date(dob);
      const ref = refDate ? new Date(refDate) : new Date();
      setResult(calculateAge(birth, ref));
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Date of Birth</label>
          <input id="age-dob" type="date" className="input" value={dob} onChange={e => setDob(e.target.value)}
            max={new Date().toISOString().split("T")[0]} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Age on Date <span style={{ color: "var(--text-muted)" }}>(optional — defaults to today)</span>
          </label>
          <input id="age-ref" type="date" className="input" value={refDate} onChange={e => setRefDate(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="age-calculate" onClick={calculate} className="btn-primary flex-1">Calculate Age</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Your Age</p>
            <p className="text-4xl font-extrabold gradient-text">
              {result.years} <span className="text-2xl">yrs</span>{" "}
              {result.months} <span className="text-2xl">mo</span>{" "}
              {result.days} <span className="text-2xl">days</span>
            </p>
          </div>
          <div className="text-center pt-4 border-t text-sm" style={{ borderColor: "rgba(99,102,241,0.2)", color: "var(--text-muted)" }}>
            Total: <strong className="text-white">{result.totalDays.toLocaleString()} days</strong> lived
          </div>
        </div>
      )}
    </div>
  );
}

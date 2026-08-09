"use client";
import { useState } from "react";
import { calculateTDEE, ActivityLevel } from "@/lib/calculations";

const ACTIVITY_OPTS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
  { value: "light", label: "Light", desc: "Exercise 1-3 days/week" },
  { value: "moderate", label: "Moderate", desc: "Exercise 3-5 days/week" },
  { value: "active", label: "Active", desc: "Hard exercise 6-7 days/week" },
  { value: "very_active", label: "Very Active", desc: "Physical job + training" },
];

export default function TDEECalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try { setResult(calculateTDEE(parseFloat(weight), parseFloat(height), parseFloat(age), gender, activity)); }
    catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Gender</label>
          <div className="flex gap-2">
            {(["male", "female"] as const).map(g => (
              <button key={g} onClick={() => setGender(g)}
                className={gender === g ? "btn-primary text-sm px-4 py-2 flex-1" : "btn-secondary text-sm px-4 py-2 flex-1"}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Age (years)</label>
          <input id="tdee-age" type="number" className="input" value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Weight (kg)</label>
          <input id="tdee-weight" type="number" className="input" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Height (cm)</label>
          <input id="tdee-height" type="number" className="input" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Activity Level</label>
        <div className="space-y-2">
          {ACTIVITY_OPTS.map(o => (
            <button key={o.value} onClick={() => setActivity(o.value)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all text-sm ${activity === o.value ? "border-indigo-500 bg-indigo-500/10" : "border-transparent"}`}
              style={{ background: activity === o.value ? undefined : "rgba(255,255,255,0.03)", borderColor: activity === o.value ? "var(--accent)" : "rgba(255,255,255,0.06)" }}>
              <span className="font-medium">{o.label}</span>
              <span className="ml-2" style={{ color: "var(--text-muted)" }}>— {o.desc}</span>
            </button>
          ))}
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="tdee-calculate" onClick={calculate} className="btn-primary flex-1">Calculate TDEE</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Daily Calories (TDEE)</p>
            <p className="text-4xl font-extrabold gradient-text">{result.tdee.toLocaleString()} kcal</p>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t text-center text-sm" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>BMR</p><p className="font-bold">{result.bmr} kcal</p></div>
            <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>Cut (−500)</p><p className="font-bold" style={{ color: "#60a5fa" }}>{result.tdee - 500} kcal</p></div>
            <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>Bulk (+500)</p><p className="font-bold" style={{ color: "#34d399" }}>{result.tdee + 500} kcal</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

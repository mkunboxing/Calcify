"use client";
import { useState } from "react";
import { calculateBMR } from "@/lib/calculations-extended";

export default function BMRCalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bmr, setBmr] = useState<number | null>(null);

  function calculate() {
    try {
      setBmr(calculateBMR(parseFloat(weight), parseFloat(height), parseFloat(age), gender));
    } catch {}
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Gender</label>
          <div className="flex gap-2">
            <button onClick={() => setGender("male")} className={gender === "male" ? "btn-primary flex-1" : "btn-secondary flex-1"}>Male</button>
            <button onClick={() => setGender("female")} className={gender === "female" ? "btn-primary flex-1" : "btn-secondary flex-1"}>Female</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Age (Years)</label>
          <input type="number" className="input" value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Weight (kg)</label>
          <input type="number" className="input" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Height (cm)</label>
          <input type="number" className="input" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate BMR</button>

      {bmr !== null && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm text-slate-400 mb-1">Basal Metabolic Rate (BMR)</p>
          <p className="text-4xl font-extrabold gradient-text">{bmr.toLocaleString()} kcal / day</p>
          <p className="text-xs text-slate-400 mt-2">Calories burned at complete rest per 24 hours.</p>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";

export default function CalorieDeficitCalculator() {
  const [tdee, setTdee] = useState("2200");
  const [goal, setGoal] = useState("0.5"); // kg per week
  const [mode, setMode] = useState<"lose" | "gain">("lose");

  const dailyDeficit = parseFloat(goal) * 1100; // ~7700 kcal per kg / 7 days
  const targetCalories = mode === "lose"
    ? Math.max(1200, Math.round(parseFloat(tdee) - dailyDeficit))
    : Math.round(parseFloat(tdee) + dailyDeficit);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Maintenance Calories (TDEE)</label>
          <input type="number" className="input" value={tdee} onChange={e => setTdee(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Goal</label>
          <select className="input" value={mode} onChange={e => setMode(e.target.value as any)}>
            <option value="lose">Weight Loss (Deficit)</option>
            <option value="gain">Weight Gain (Surplus)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Target Rate (kg / week)</label>
          <select className="input" value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="0.25">0.25 kg / week (Mild)</option>
            <option value="0.5">0.5 kg / week (Standard)</option>
            <option value="0.75">0.75 kg / week (Aggressive)</option>
            <option value="1.0">1.0 kg / week (Extreme)</option>
          </select>
        </div>
      </div>

      <div className="result-card animate-fade-up text-center">
        <p className="text-sm text-slate-400 mb-1">Recommended Daily Intake</p>
        <p className="text-4xl font-extrabold gradient-text">{targetCalories.toLocaleString()} kcal / day</p>
        <p className="text-xs text-slate-400 mt-2">
          Daily {mode === "lose" ? "deficit" : "surplus"}: <strong>{Math.round(dailyDeficit)} kcal/day</strong>
        </p>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { calculateBMI } from "@/lib/calculations";

export default function BMICalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    try {
      let weightKg = parseFloat(weight);
      let heightCm = parseFloat(height);
      if (unit === "imperial") {
        weightKg = weightKg * 0.453592;
        heightCm = heightCm * 2.54;
      }
      setResult(calculateBMI(weightKg, heightCm));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid input");
    }
  }

  const categoryColors: Record<string, string> = {
    "Underweight": "#60a5fa",
    "Normal weight": "#10b981",
    "Overweight": "#f59e0b",
    "Obese": "#ef4444",
  };

  const bmiRanges = [
    { label: "Underweight", range: "< 18.5", color: "#60a5fa" },
    { label: "Normal", range: "18.5 – 24.9", color: "#10b981" },
    { label: "Overweight", range: "25 – 29.9", color: "#f59e0b" },
    { label: "Obese", range: "≥ 30", color: "#ef4444" },
  ];

  return (
    <div>
      {/* Unit toggle */}
      <div className="flex gap-2 mb-5">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)}
            className={u === unit ? "btn-primary px-4 py-1.5 text-sm" : "btn-secondary px-4 py-1.5 text-sm"}>
            {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/inches)"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input id="bmi-weight" type="number" className="input" value={weight}
            onChange={e => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Height ({unit === "metric" ? "cm" : "inches"})
          </label>
          <input id="bmi-height" type="number" className="input" value={height}
            onChange={e => setHeight(e.target.value)} placeholder={unit === "metric" ? "175" : "69"} min="1" />
        </div>
      </div>

      {error && <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}

      <div className="flex gap-3 mb-6">
        <button id="bmi-calculate" onClick={calculate} className="btn-primary flex-1">Calculate BMI</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>

      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Your BMI</p>
            <p className="text-5xl font-extrabold mb-2" style={{ color: categoryColors[result.category] ?? "white" }}>
              {result.bmi}
            </p>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
              style={{ background: `${categoryColors[result.category]}22`, color: categoryColors[result.category] }}>
              {result.category}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-4 border-t text-center text-xs"
            style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            {bmiRanges.map((r) => (
              <div key={r.label} className="rounded-lg p-2"
                style={{ background: `${r.color}18`, border: result.category.startsWith(r.label.split(" ")[0]) ? `1px solid ${r.color}` : "1px solid transparent" }}>
                <p style={{ color: r.color }} className="font-semibold">{r.label}</p>
                <p style={{ color: "var(--text-muted)" }}>{r.range}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

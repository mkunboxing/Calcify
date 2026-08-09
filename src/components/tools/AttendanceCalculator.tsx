"use client";
import { useState } from "react";
import { calculateAttendance } from "@/lib/calculations";

export default function AttendanceCalculator() {
  const [attended, setAttended] = useState("75");
  const [total, setTotal] = useState("100");
  const [result, setResult] = useState<{ percentage: number; required75: number; required80: number; canMiss75: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try { setResult(calculateAttendance(parseFloat(attended), parseFloat(total))); }
    catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const pctColor = (p: number) => p >= 80 ? "#10b981" : p >= 75 ? "#f59e0b" : "#ef4444";

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Classes Attended</label>
          <input id="att-attended" type="number" className="input" value={attended} onChange={e => setAttended(e.target.value)} min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Total Classes</label>
          <input id="att-total" type="number" className="input" value={total} onChange={e => setTotal(e.target.value)} min="1" />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="att-calculate" onClick={calculate} className="btn-primary flex-1">Calculate</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Current Attendance</p>
            <p className="text-5xl font-extrabold" style={{ color: pctColor(result.percentage) }}>{result.percentage}%</p>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t text-center text-sm" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>Need for 75%</p>
              <p className="font-bold">{result.required75 > 0 ? `${result.required75} more` : "✓ Met"}</p></div>
            <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>Need for 80%</p>
              <p className="font-bold">{result.required80 > 0 ? `${result.required80} more` : "✓ Met"}</p></div>
            <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>Can Miss (75%)</p>
              <p className="font-bold">{result.canMiss75}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

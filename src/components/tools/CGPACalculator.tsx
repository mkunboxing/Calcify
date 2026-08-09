"use client";
import { useState } from "react";
import { calculateCGPA, SubjectGrade } from "@/lib/calculations";

const GRADE_SCALE = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export default function CGPACalculator() {
  const [subjects, setSubjects] = useState<SubjectGrade[]>([
    { credits: 4, grade: 9 },
    { credits: 3, grade: 8 },
    { credits: 3, grade: 9 },
  ]);
  const [result, setResult] = useState<{ cgpa: number; percentage: number } | null>(null);
  const [error, setError] = useState("");

  function addSubject() { setSubjects([...subjects, { credits: 3, grade: 9 }]); }
  function removeSubject(i: number) { setSubjects(subjects.filter((_, idx) => idx !== i)); }
  function update(i: number, key: keyof SubjectGrade, val: number) {
    setSubjects(subjects.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  }

  function calculate() {
    setError(""); setResult(null);
    try { setResult(calculateCGPA(subjects)); }
    catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return (
    <div>
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium px-1" style={{ color: "var(--text-muted)" }}>
          <div className="col-span-1">#</div>
          <div className="col-span-5">Credits</div>
          <div className="col-span-5">Grade Point</div>
          <div className="col-span-1"></div>
        </div>
        {subjects.map((s, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-1 text-sm text-center" style={{ color: "var(--text-muted)" }}>{i + 1}</div>
            <div className="col-span-5">
              <input type="number" className="input text-sm" value={s.credits} min="1" max="10"
                onChange={e => update(i, "credits", parseFloat(e.target.value) || 0)} />
            </div>
            <div className="col-span-5">
              <select className="input text-sm" value={s.grade}
                onChange={e => update(i, "grade", parseFloat(e.target.value))}>
                {GRADE_SCALE.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              {subjects.length > 1 && (
                <button onClick={() => removeSubject(i)} className="text-red-400 hover:text-red-300 text-lg leading-none">×</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={addSubject} className="btn-secondary text-sm w-full mb-5">+ Add Subject</button>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="cgpa-calculate" onClick={calculate} className="btn-primary flex-1">Calculate CGPA</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>CGPA</p>
              <p className="text-4xl font-extrabold gradient-text">{result.cgpa}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>out of 10</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Equivalent %</p>
              <p className="text-4xl font-extrabold gradient-text">{result.percentage}%</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>(CGPA − 0.75) × 10</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

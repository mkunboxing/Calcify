"use client";
import { useState } from "react";
import { addDaysToDate } from "@/lib/calculations-extended";

export default function AddSubtractDays() {
  const [dateStr, setDateStr] = useState(new Date().toISOString().split("T")[0]);
  const [days, setDays] = useState("30");
  const [op, setOp] = useState<"add" | "sub">("add");
  const [result, setResult] = useState<Date | null>(null);

  function calculate() {
    try {
      const d = new Date(dateStr);
      const numDays = parseInt(days) * (op === "sub" ? -1 : 1);
      setResult(addDaysToDate(d, numDays));
    } catch {}
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Start Date</label>
          <input type="date" className="input" value={dateStr} onChange={e => setDateStr(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Operation</label>
          <select className="input" value={op} onChange={e => setOp(e.target.value as any)}>
            <option value="add">Add (+)</option>
            <option value="sub">Subtract (−)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Number of Days</label>
          <input type="number" className="input" value={days} onChange={e => setDays(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate Target Date</button>

      {result && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-sm text-slate-400 mb-1">Calculated Date</p>
          <p className="text-3xl font-extrabold gradient-text">
            {result.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      )}
    </div>
  );
}

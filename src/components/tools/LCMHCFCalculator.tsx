"use client";
import { useState } from "react";
import { lcmMany, gcdMany } from "@/lib/calculations-extended";

export default function LCMHCFCalculator() {
  const [input, setInput] = useState("12, 18, 24");
  const [lcmVal, setLcmVal] = useState<number | null>(null);
  const [hcfVal, setHcfVal] = useState<number | null>(null);

  function calculate() {
    try {
      const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n > 0);
      if (nums.length < 2) return;
      setLcmVal(lcmMany(nums));
      setHcfVal(gcdMany(nums));
    } catch {}
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Numbers (comma separated)
        </label>
        <input type="text" className="input font-mono" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <button onClick={calculate} className="btn-primary w-full mb-6">Calculate LCM & HCF</button>

      {lcmVal !== null && hcfVal !== null && (
        <div className="result-card animate-fade-up grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-slate-400 mb-1">LCM (Least Common Multiple)</p>
            <p className="text-3xl font-extrabold text-indigo-400">{lcmVal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">HCF / GCD (Highest Common Factor)</p>
            <p className="text-3xl font-extrabold text-emerald-400">{hcfVal.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

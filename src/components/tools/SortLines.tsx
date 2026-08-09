"use client";
import { useState } from "react";
import { sortLines } from "@/lib/calculations-extended";

export default function SortLines() {
  const [text, setText] = useState("banana\napple\ncherry\ndate");
  const [mode, setMode] = useState<"az" | "za" | "length-asc" | "numeric">("az");
  const [result, setResult] = useState("");

  function process() {
    setResult(sortLines(text, mode));
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Input Lines</label>
        <textarea className="input font-mono" rows={6} value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="flex gap-2 mb-4">
        <select className="input flex-1" value={mode} onChange={e => setMode(e.target.value as any)}>
          <option value="az">Alphabetical (A → Z)</option>
          <option value="za">Reverse Alphabetical (Z → A)</option>
          <option value="length-asc">Line Length (Short → Long)</option>
          <option value="numeric">Numeric Value (1 → 100)</option>
        </select>
        <button onClick={process} className="btn-primary">Sort Lines</button>
      </div>

      {result && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-1">Sorted Output</p>
          <pre className="font-mono text-sm text-emerald-300 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

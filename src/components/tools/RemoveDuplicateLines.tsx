"use client";
import { useState } from "react";
import { removeDuplicateLines } from "@/lib/calculations-extended";

export default function RemoveDuplicateLines() {
  const [text, setText] = useState("apple\nbanana\napple\norange\nbanana");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState("");

  function process() {
    setResult(removeDuplicateLines(text, caseSensitive));
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Input Lines</label>
        <textarea className="input font-mono" rows={6} value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="cs" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} />
        <label htmlFor="cs" className="text-xs text-slate-300">Case-sensitive deduplication</label>
      </div>
      <button onClick={process} className="btn-primary w-full mb-6">Remove Duplicates</button>

      {result && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-1">Deduplicated Lines</p>
          <pre className="font-mono text-sm text-emerald-300 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

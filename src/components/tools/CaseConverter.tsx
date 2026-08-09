"use client";
import { useState } from "react";
import { convertCase } from "@/lib/calculations-extended";

export default function CaseConverter() {
  const [text, setText] = useState("Hello world! Calcify tools are awesome.");
  const [mode, setMode] = useState("upper");
  const [result, setResult] = useState("");

  function convert(m: string) {
    setMode(m);
    setResult(convertCase(text, m));
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Input Text</label>
        <textarea className="input font-mono" rows={4} value={text} onChange={e => setText(e.target.value)} />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "upper", label: "UPPERCASE" },
          { id: "lower", label: "lowercase" },
          { id: "title", label: "Title Case" },
          { id: "sentence", label: "Sentence case" },
          { id: "camel", label: "camelCase" },
          { id: "snake", label: "snake_case" },
          { id: "kebab", label: "kebab-case" },
        ].map(m => (
          <button key={m.id} onClick={() => convert(m.id)} className={mode === m.id ? "btn-primary text-xs" : "btn-secondary text-xs"}>
            {m.label}
          </button>
        ))}
      </div>

      {result && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-1">Converted Output</p>
          <p className="font-mono text-sm break-all text-emerald-300">{result}</p>
        </div>
      )}
    </div>
  );
}

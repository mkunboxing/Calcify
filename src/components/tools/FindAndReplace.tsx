"use client";
import { useState } from "react";

export default function FindAndReplace() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [findStr, setFindStr] = useState("fox");
  const [replaceStr, setReplaceStr] = useState("cat");
  const [useRegex, setUseRegex] = useState(false);
  const [result, setResult] = useState("");

  function process() {
    try {
      if (useRegex) {
        const re = new RegExp(findStr, "g");
        setResult(text.replace(re, replaceStr));
      } else {
        setResult(text.replaceAll(findStr, replaceStr));
      }
    } catch {}
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Input Text</label>
        <textarea className="input font-mono" rows={4} value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium mb-1">Find</label>
          <input type="text" className="input font-mono text-sm" value={findStr} onChange={e => setFindStr(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Replace With</label>
          <input type="text" className="input font-mono text-sm" value={replaceStr} onChange={e => setReplaceStr(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} />
          Use Regular Expression (Regex)
        </label>
        <button onClick={process} className="btn-primary">Find & Replace</button>
      </div>

      {result && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-1">Result Text</p>
          <pre className="font-mono text-sm text-emerald-300 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

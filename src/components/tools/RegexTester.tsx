"use client";
import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Contact us at support@example.com or sales@calcify.tools!");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  function test() {
    setError(""); setMatches([]);
    try {
      const re = new RegExp(pattern, flags);
      const m = text.match(re);
      setMatches(m ? Array.from(m) : []);
    } catch (e) { setError(e instanceof Error ? e.message : "Invalid Regex"); }
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="col-span-3">
          <label className="block text-xs font-medium mb-1">Regex Pattern</label>
          <input type="text" className="input font-mono text-sm" value={pattern} onChange={e => setPattern(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Flags</label>
          <input type="text" className="input font-mono text-sm" value={flags} onChange={e => setFlags(e.target.value)} placeholder="g, i..." />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1">Test Text</label>
        <textarea className="input font-mono" rows={4} value={text} onChange={e => setText(e.target.value)} />
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <button onClick={test} className="btn-primary w-full mb-6">Test Regex</button>

      {matches.length > 0 && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-2">Matches Found ({matches.length})</p>
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span key={i} className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-sm border border-indigo-500/30">
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

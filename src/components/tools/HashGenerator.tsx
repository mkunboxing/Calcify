"use client";
import { useState } from "react";

export default function HashGenerator() {
  const [text, setText] = useState("Hello World");
  const [algo, setAlgo] = useState<"SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [hash, setHash] = useState("");

  async function generate() {
    try {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest(algo, msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      setHash(hashArray.map(b => b.toString(16).padStart(2, "0")).join(""));
    } catch {}
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Input Text</label>
        <textarea className="input font-mono" rows={3} value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="flex gap-3 mb-6">
        <select className="input flex-1" value={algo} onChange={e => setAlgo(e.target.value as any)}>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
        <button onClick={generate} className="btn-primary">Generate Hash</button>
      </div>

      {hash && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-1">{algo} Hash Output</p>
          <p className="font-mono text-sm break-all text-emerald-400 select-all">{hash}</p>
        </div>
      )}
    </div>
  );
}

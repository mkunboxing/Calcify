"use client";
import { useState } from "react";
import { urlEncode, urlDecode } from "@/lib/calculations-extended";

export default function URLEncodeDecode() {
  const [text, setText] = useState("https://example.com/search?q=calcify tools&category=finance");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [result, setResult] = useState("");

  function process(m: "encode" | "decode") {
    setMode(m);
    try {
      setResult(m === "encode" ? urlEncode(text) : urlDecode(text));
    } catch {}
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Input Text / URL</label>
        <textarea className="input font-mono" rows={4} value={text} onChange={e => setText(e.target.value)} />
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={() => process("encode")} className="btn-primary flex-1">URL Encode</button>
        <button onClick={() => process("decode")} className="btn-secondary flex-1">URL Decode</button>
      </div>

      {result && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-1">{mode === "encode" ? "Encoded Output" : "Decoded Output"}</p>
          <pre className="font-mono text-sm text-emerald-300 break-all whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

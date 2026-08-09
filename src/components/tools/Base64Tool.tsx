"use client";
import { useState } from "react";
import { encodeBase64, decodeBase64 } from "@/lib/calculations";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function process() {
    setError(""); setOutput("");
    try {
      setOutput(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  function swap() {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
    setError("");
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div className="flex gap-2 mb-5">
        {(["encode", "decode"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setOutput(""); setError(""); }}
            className={mode === m ? "btn-primary text-sm px-4 py-1.5" : "btn-secondary text-sm px-4 py-1.5"}>
            {m === "encode" ? "Text → Base64" : "Base64 → Text"}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
          {mode === "encode" ? "Text Input" : "Base64 Input"}
        </label>
        <textarea
          id="b64-input"
          className="input font-mono text-sm resize-none"
          rows={5}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text to encode…" : "Enter Base64 string to decode…"}
          spellCheck={false}
        />
      </div>

      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}

      <div className="flex gap-3 mb-4">
        <button id="b64-process" onClick={process} className="btn-primary flex-1">
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        {output && <button onClick={swap} className="btn-secondary" title="Use output as input">⇅ Swap</button>}
        {output || input ? <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="btn-secondary">Clear</button> : null}
      </div>

      {output && (
        <div className="animate-fade-up">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            <button onClick={copy} className="btn-secondary text-xs px-3 py-1">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl p-4 font-mono text-sm overflow-auto max-h-48 break-all"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5f3fc" }}>
            {output}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
        🔒 All encoding/decoding is done in your browser using the Web Crypto API.
      </p>
    </div>
  );
}

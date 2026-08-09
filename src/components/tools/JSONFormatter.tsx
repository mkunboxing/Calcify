"use client";
import { useState } from "react";
import { formatJSON, minifyJSON } from "@/lib/calculations";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [copied, setCopied] = useState(false);

  function process() {
    setError(""); setOutput("");
    try {
      const result = mode === "format" ? formatJSON(input, 2) : minifyJSON(input);
      setOutput(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function loadExample() {
    setInput(JSON.stringify({ name: "Calcify", tools: ["EMI", "BMI", "QR"], version: 1, active: true }));
    setOutput(""); setError("");
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(["format", "minify"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={mode === m ? "btn-primary text-sm px-4 py-1.5" : "btn-secondary text-sm px-4 py-1.5"}>
            {m === "format" ? "Format / Beautify" : "Minify"}
          </button>
        ))}
        <button onClick={loadExample} className="btn-secondary text-sm px-3 py-1.5 ml-auto">
          Load Example
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Input JSON</label>
        <textarea
          id="json-input"
          className="input font-mono text-sm resize-none"
          rows={8}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Paste your JSON here, e.g. {"key": "value"}'
          spellCheck={false}
        />
      </div>

      {error && (
        <p className="text-sm mb-3 px-3 py-2 rounded-lg font-mono" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
          ✗ {error}
        </p>
      )}

      <div className="flex gap-3 mb-4">
        <button id="json-process" onClick={process} className="btn-primary flex-1">
          {mode === "format" ? "Format JSON" : "Minify JSON"}
        </button>
        {output && <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="btn-secondary">Clear</button>}
      </div>

      {output && (
        <div className="animate-fade-up">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Output</label>
            <button onClick={copy} className="btn-secondary text-xs px-3 py-1">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl p-4 font-mono text-sm overflow-auto max-h-72"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5f3fc" }}>
            <pre className="whitespace-pre-wrap break-all">{output}</pre>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            ✓ Valid JSON · {output.length.toLocaleString()} characters
          </p>
        </div>
      )}
    </div>
  );
}

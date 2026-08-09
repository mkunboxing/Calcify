"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";

// Lazy-load QRCode library only when component renders
const QRCodeLib = dynamic(() => import("./QRCodeCanvas"), { ssr: false, loading: () => (
  <div className="w-48 h-48 skeleton rounded-xl mx-auto" />
) });

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [generated, setGenerated] = useState("");
  const [size, setSize] = useState(200);
  const [error, setError] = useState("");

  function generate() {
    setError("");
    if (!text.trim()) { setError("Please enter text or URL"); return; }
    setGenerated(text.trim());
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
          URL or Text
        </label>
        <input id="qr-input" type="text" className="input" value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && generate()}
          placeholder="https://example.com or any text" />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Size: {size}px
        </label>
        <input type="range" min="100" max="500" step="50" value={size}
          onChange={e => setSize(Number(e.target.value))} className="w-full accent-indigo-500" />
      </div>

      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}

      <div className="flex gap-3 mb-6">
        <button id="qr-generate" onClick={generate} className="btn-primary flex-1">Generate QR Code</button>
        {generated && <button onClick={() => { setGenerated(""); setText(""); }} className="btn-secondary">Clear</button>}
      </div>

      {generated && (
        <div className="animate-fade-up text-center">
          <QRCodeLib text={generated} size={size} />
        </div>
      )}

      <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
        🔒 Generated entirely in your browser. No data is sent to any server.
      </p>
    </div>
  );
}

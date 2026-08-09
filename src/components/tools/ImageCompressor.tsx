"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const CompressWorker = dynamic(() => import("./ImageCompressorWorker"), { ssr: false });

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [result, setResult] = useState<{ blob: Blob; url: string; size: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { setError("Please select a JPEG or PNG image"); return; }
    setFile(f); setResult(null); setError("");
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const fmt = (bytes: number) => bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / 1024 / 1024).toFixed(2)} MB`;

  const savings = file && result
    ? Math.round((1 - result.size / file.size) * 100)
    : 0;

  return (
    <div>
      {/* Drop zone */}
      {!file ? (
        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors"
          style={{ borderColor: "rgba(99,102,241,0.3)" }}
          onClick={() => document.getElementById("img-file-input")?.click()}
        >
          <p className="text-4xl mb-3">🗜️</p>
          <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>Drop an image here</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>or click to select JPEG/PNG</p>
          <input id="img-file-input" type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4 p-3 rounded-xl"
            style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <div>
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Original: {fmt(file.size)}</p>
            </div>
            <button onClick={() => { setFile(null); setResult(null); }} className="btn-secondary text-xs px-3 py-1">
              Change
            </button>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Quality: {quality}%
              </label>
              <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))}
                className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Max Width: {maxWidth}px
              </label>
              <input type="range" min="320" max="4000" step="80" value={maxWidth} onChange={e => setMaxWidth(Number(e.target.value))}
                className="w-full accent-indigo-500" />
            </div>
          </div>

          {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}

          <CompressWorker
            file={file}
            quality={quality}
            maxWidth={maxWidth}
            onResult={(r) => setResult(r)}
            onError={(e) => setError(e)}
            onLoading={setLoading}
          />

          {loading && (
            <div className="text-center py-6 text-sm" style={{ color: "var(--text-muted)" }}>
              <div className="inline-block w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2" />
              Compressing…
            </div>
          )}

          {result && !loading && (
            <div className="result-card animate-fade-up mt-4">
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Original</p>
                  <p className="font-bold">{fmt(file.size)}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Compressed</p>
                  <p className="font-bold" style={{ color: "#10b981" }}>{fmt(result.size)}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Saved</p>
                  <p className="font-bold" style={{ color: "#f59e0b" }}>{savings}%</p>
                </div>
              </div>
              <a href={result.url} download={`compressed_${file.name}`}
                className="btn-primary w-full text-center block">
                ⬇ Download Compressed Image
              </a>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
        🔒 Compressed entirely in your browser. Your images never leave your device.
      </p>
    </div>
  );
}

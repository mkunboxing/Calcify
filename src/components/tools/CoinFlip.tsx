"use client";
import { useState } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState<"HEADS" | "TAILS" | null>(null);

  function flip() {
    setResult(Math.random() < 0.5 ? "HEADS" : "TAILS");
  }

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl border-4"
          style={{ background: "var(--gradient-accent)", borderColor: "var(--border-hover)" }}>
          {result === "HEADS" ? "👑" : result === "TAILS" ? "🦅" : "🪙"}
        </div>
      </div>

      <button onClick={flip} className="btn-primary px-8 py-3 text-lg mb-6">Flip Coin 🪙</button>

      {result && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-1">Coin Result</p>
          <p className="text-4xl font-extrabold gradient-text">{result}</p>
        </div>
      )}
    </div>
  );
}

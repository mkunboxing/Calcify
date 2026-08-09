"use client";
import { useState } from "react";

export default function RandomPicker() {
  const [itemsStr, setItemsStr] = useState("Pizza\nBurger\nSushi\nTacos\nSalad");
  const [winner, setWinner] = useState<string | null>(null);

  function pick() {
    const list = itemsStr.split("\n").map(s => s.trim()).filter(Boolean);
    if (list.length === 0) return;
    const idx = Math.floor(Math.random() * list.length);
    setWinner(list[idx]);
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Items / Options (one per line)</label>
        <textarea className="input font-mono" rows={5} value={itemsStr} onChange={e => setItemsStr(e.target.value)} />
      </div>

      <button onClick={pick} className="btn-primary w-full mb-6">Pick Random Item</button>

      {winner && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-xs text-slate-400 mb-1">🎉 Winner Chosen</p>
          <p className="text-3xl font-extrabold gradient-text">{winner}</p>
        </div>
      )}
    </div>
  );
}

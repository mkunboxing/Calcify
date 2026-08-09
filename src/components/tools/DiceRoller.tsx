"use client";
import { useState } from "react";

export default function DiceRoller() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(1);
  const [rolls, setRolls] = useState<number[]>([]);

  function roll() {
    const list: number[] = [];
    for (let i = 0; i < count; i++) {
      list.push(Math.floor(Math.random() * sides) + 1);
    }
    setRolls(list);
  }

  const sum = rolls.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Dice Type</label>
          <select className="input" value={sides} onChange={e => setSides(Number(e.target.value))}>
            <option value={4}>d4 (4 sides)</option>
            <option value={6}>d6 (Standard 6 sides)</option>
            <option value={8}>d8 (8 sides)</option>
            <option value={10}>d10 (10 sides)</option>
            <option value={12}>d12 (12 sides)</option>
            <option value={20}>d20 (20 sides)</option>
            <option value={100}>d100 (Percentile)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Number of Dice</label>
          <input type="number" className="input" value={count} onChange={e => setCount(Math.max(1, Number(e.target.value)))} min="1" max="10" />
        </div>
      </div>

      <button onClick={roll} className="btn-primary w-full mb-6">Roll Dice 🎲</button>

      {rolls.length > 0 && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-xs text-slate-400 mb-3">Total Sum: <strong className="text-xl text-indigo-300">{sum}</strong></p>
          <div className="flex flex-wrap gap-3 justify-center">
            {rolls.map((r, i) => (
              <span key={i} className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-extrabold text-2xl flex items-center justify-center shadow-lg">
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

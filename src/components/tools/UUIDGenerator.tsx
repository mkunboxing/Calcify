"use client";
import { useState } from "react";

export default function UUIDGenerator() {
  const [count, setCount] = useState("5");
  const [uuids, setUuids] = useState<string[]>([]);

  function generate() {
    const num = Math.min(Math.max(1, parseInt(count) || 1), 50);
    const list: string[] = [];
    for (let i = 0; i < num; i++) {
      list.push(crypto.randomUUID());
    }
    setUuids(list);
  }

  return (
    <div>
      <div className="flex gap-3 items-center mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1.5">Quantity (max 50)</label>
          <input type="number" className="input" value={count} onChange={e => setCount(e.target.value)} max="50" min="1" />
        </div>
        <button onClick={generate} className="btn-primary self-end">Generate UUID v4</button>
      </div>

      {uuids.length > 0 && (
        <div className="result-card animate-fade-up">
          <p className="text-xs text-slate-400 mb-2">Generated UUIDs</p>
          <div className="space-y-1 font-mono text-sm text-emerald-400 select-all">
            {uuids.map((id, i) => (
              <p key={i}>{id}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

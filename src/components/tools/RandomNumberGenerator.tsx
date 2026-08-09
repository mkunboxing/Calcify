"use client";
import { useState } from "react";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);

  function generate() {
    const minV = parseInt(min), maxV = parseInt(max), cnt = parseInt(count);
    if (isNaN(minV) || isNaN(maxV) || minV >= maxV) return;
    const nums: number[] = [];
    for (let i = 0; i < Math.min(cnt, 100); i++) {
      nums.push(Math.floor(Math.random() * (maxV - minV + 1)) + minV);
    }
    setResults(nums);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium mb-1">Min Value</label>
          <input type="number" className="input" value={min} onChange={e => setMin(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Max Value</label>
          <input type="number" className="input" value={max} onChange={e => setMax(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Quantity</label>
          <input type="number" className="input" value={count} onChange={e => setCount(e.target.value)} max="100" min="1" />
        </div>
      </div>
      <button onClick={generate} className="btn-primary w-full mb-6">Generate Random Number(s)</button>

      {results.length > 0 && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-xs text-slate-400 mb-2">Random Result(s)</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {results.map((n, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 font-extrabold text-2xl border border-indigo-500/30">
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

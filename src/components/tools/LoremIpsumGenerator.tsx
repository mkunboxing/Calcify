"use client";
import { useState } from "react";

const LOREM_TEXT = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ut leo. Cras dolor metus, open-source utilities are great.",
];

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState("3");
  const [result, setResult] = useState<string[]>([]);

  function generate() {
    const num = Math.min(Math.max(1, parseInt(count) || 1), 10);
    const paras: string[] = [];
    for (let i = 0; i < num; i++) {
      paras.push(LOREM_TEXT[i % LOREM_TEXT.length]);
    }
    setResult(paras);
  }

  return (
    <div>
      <div className="flex gap-4 items-center mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1.5">Number of Paragraphs</label>
          <input type="number" className="input" value={count} onChange={e => setCount(e.target.value)} min="1" max="10" />
        </div>
        <button onClick={generate} className="btn-primary self-end">Generate Lorem Ipsum</button>
      </div>

      {result.length > 0 && (
        <div className="result-card animate-fade-up space-y-4">
          {result.map((p, i) => (
            <p key={i} className="text-sm text-slate-300 leading-relaxed">{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

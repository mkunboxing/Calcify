"use client";
import { useState } from "react";
import { generateSlug } from "@/lib/calculations-extended";

export default function SlugGenerator() {
  const [text, setText] = useState("How to Build a Fast Next.js App in 2026!");
  const [slug, setSlug] = useState("");

  function handleGenerate() {
    setSlug(generateSlug(text));
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Input Text / Title</label>
        <input type="text" className="input" value={text} onChange={e => setText(e.target.value)} />
      </div>
      <button onClick={handleGenerate} className="btn-primary w-full mb-6">Generate SEO Slug</button>

      {slug && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-xs text-slate-400 mb-1">Generated URL Slug</p>
          <p className="font-mono text-xl font-bold text-emerald-400 select-all">{slug}</p>
        </div>
      )}
    </div>
  );
}

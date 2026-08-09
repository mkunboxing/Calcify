"use client";
import { useState } from "react";
import { hexToRgb, rgbToHex, rgbToHsl } from "@/lib/calculations-extended";

export default function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number } | null>(null);
  const [hsl, setHsl] = useState<{ h: number; s: number; l: number } | null>(null);

  function convert() {
    try {
      const r = hexToRgb(hex);
      setRgb(r);
      setHsl(rgbToHsl(r.r, r.g, r.b));
    } catch {}
  }

  return (
    <div>
      <div className="flex gap-4 items-center mb-6">
        <input type="color" className="w-12 h-12 rounded cursor-pointer border-0 p-0" value={hex} onChange={e => setHex(e.target.value)} />
        <div className="flex-1">
          <label className="block text-xs font-medium mb-1">HEX Color Code</label>
          <input type="text" className="input font-mono" value={hex} onChange={e => setHex(e.target.value)} />
        </div>
        <button onClick={convert} className="btn-primary self-end">Convert Color</button>
      </div>

      {rgb && hsl && (
        <div className="result-card animate-fade-up grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-black/20">
            <p className="text-xs text-slate-400">HEX</p>
            <p className="text-lg font-mono font-bold text-indigo-300">{rgbToHex(rgb.r, rgb.g, rgb.b)}</p>
          </div>
          <div className="p-3 rounded-lg bg-black/20">
            <p className="text-xs text-slate-400">RGB</p>
            <p className="text-lg font-mono font-bold text-emerald-300">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
          </div>
          <div className="p-3 rounded-lg bg-black/20">
            <p className="text-xs text-slate-400">HSL</p>
            <p className="text-lg font-mono font-bold text-teal-300">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
          </div>
        </div>
      )}
    </div>
  );
}

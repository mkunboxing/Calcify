"use client";
import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  function generate() {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Password Length: {length}</label>
        <input type="range" min="8" max="32" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full" />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
          Uppercase (A-Z)
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={numbers} onChange={e => setNumbers(e.target.checked)} />
          Numbers (0-9)
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={symbols} onChange={e => setSymbols(e.target.checked)} />
          Symbols (!@#$)
        </label>
      </div>

      <button onClick={generate} className="btn-primary w-full mb-6">Generate Secure Password</button>

      {password && (
        <div className="result-card animate-fade-up text-center">
          <p className="text-xs text-slate-400 mb-1">Generated Password</p>
          <p className="font-mono text-2xl font-extrabold text-emerald-400 select-all break-all">{password}</p>
        </div>
      )}
    </div>
  );
}

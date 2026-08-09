"use client";
import { useState, useEffect } from "react";

export default function CountdownCalculator() {
  const [targetDate, setTargetDate] = useState(() => {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-01-01T00:00`;
  });
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    function update() {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5">Target Date & Time</label>
        <input type="datetime-local" className="input" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
      </div>

      {timeLeft && (
        <div className="result-card animate-fade-up">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-3xl font-extrabold text-indigo-400">{timeLeft.days}</p>
              <p className="text-xs text-slate-400">Days</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-3xl font-extrabold text-indigo-400">{timeLeft.hours}</p>
              <p className="text-xs text-slate-400">Hours</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-3xl font-extrabold text-indigo-400">{timeLeft.minutes}</p>
              <p className="text-xs text-slate-400">Minutes</p>
            </div>
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-3xl font-extrabold text-emerald-400">{timeLeft.seconds}</p>
              <p className="text-xs text-slate-400">Seconds</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

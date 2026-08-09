"use client";
import { useState, useEffect } from "react";

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [nowTs, setNowTs] = useState<number>(0);

  useEffect(() => {
    const t = Math.floor(Date.now() / 1000);
    setNowTs(t);
    setTimestamp(t.toString());
    setDateStr(new Date().toISOString().slice(0, 16));
  }, []);

  const parsedDate = timestamp ? new Date(parseInt(timestamp) * (timestamp.length > 11 ? 1 : 1000)) : null;

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
        <span className="text-xs text-slate-400">Current Unix Timestamp: </span>
        <strong className="font-mono text-indigo-300 text-lg">{nowTs}</strong>
      </div>

      <div className="p-4 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <h3 className="font-bold text-sm mb-3">Unix Timestamp → Human Date</h3>
        <input type="text" className="input font-mono mb-3" value={timestamp} onChange={e => setTimestamp(e.target.value)} placeholder="1700000000" />
        {parsedDate && !isNaN(parsedDate.getTime()) && (
          <div className="p-3 rounded-lg bg-black/20 text-xs font-mono text-emerald-400 space-y-1">
            <p><strong>UTC:</strong> {parsedDate.toUTCString()}</p>
            <p><strong>Local:</strong> {parsedDate.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

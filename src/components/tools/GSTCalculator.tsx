"use client";
import { useState } from "react";
import { calculateGST } from "@/lib/calculations";

const GST_RATES = [5, 12, 18, 28];

export default function GSTCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [result, setResult] = useState<{ baseAmount: number; gstAmount: number; totalAmount: number; cgst: number; sgst: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try { setResult(calculateGST(parseFloat(amount), rate, mode)); }
    catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="flex gap-2 mb-5">
        {(["add", "remove"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={mode === m ? "btn-primary text-sm px-4 py-1.5" : "btn-secondary text-sm px-4 py-1.5"}>
            {m === "add" ? "Add GST (Exclusive)" : "Remove GST (Inclusive)"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            {mode === "add" ? "Base Amount (₹)" : "GST Inclusive Amount (₹)"}
          </label>
          <input id="gst-amount" type="number" className="input" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>GST Rate (%)</label>
          <div className="flex gap-2 flex-wrap">
            {GST_RATES.map(r => (
              <button key={r} onClick={() => setRate(r)}
                className={rate === r ? "btn-primary text-sm px-3 py-1.5" : "btn-secondary text-sm px-3 py-1.5"}>
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="gst-calculate" onClick={calculate} className="btn-primary flex-1">Calculate GST</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="space-y-3">
            {[
              { label: "Base Amount", val: result.baseAmount, highlight: false },
              { label: `GST @ ${rate}%`, val: result.gstAmount, highlight: false },
              { label: "Total Amount", val: result.totalAmount, highlight: true },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center">
                <span className="text-sm" style={{ color: r.highlight ? "var(--text-primary)" : "var(--text-secondary)" }}>{r.label}</span>
                <span className={`font-bold ${r.highlight ? "text-xl gradient-text" : ""}`}>₹{fmt(r.val)}</span>
              </div>
            ))}
            <div className="pt-3 border-t flex justify-between text-xs" style={{ borderColor: "rgba(99,102,241,0.2)", color: "var(--text-muted)" }}>
              <span>CGST ({rate / 2}%): ₹{fmt(result.cgst)}</span>
              <span>SGST ({rate / 2}%): ₹{fmt(result.sgst)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

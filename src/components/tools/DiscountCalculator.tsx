"use client";
import { useState } from "react";
import { calculateDiscount } from "@/lib/calculations";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("1000");
  const [discount, setDiscount] = useState("20");
  const [result, setResult] = useState<{ finalPrice: number; savings: number; effectiveDiscount: number } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError(""); setResult(null);
    try { setResult(calculateDiscount(parseFloat(price), parseFloat(discount))); }
    catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Original Price (₹)</label>
          <input id="disc-price" type="number" className="input" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Discount (%)</label>
          <input id="disc-pct" type="number" className="input" value={discount} onChange={e => setDiscount(e.target.value)} max="100" />
        </div>
      </div>
      {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{error}</p>}
      <div className="flex gap-3 mb-6">
        <button id="disc-calculate" onClick={calculate} className="btn-primary flex-1">Calculate</button>
        {result && <button onClick={() => setResult(null)} className="btn-secondary">Reset</button>}
      </div>
      {result && (
        <div className="result-card animate-fade-up">
          <div className="text-center mb-5">
            <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Final Price</p>
            <p className="text-4xl font-extrabold gradient-text">₹{fmt(result.finalPrice)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>You Save</p>
              <p className="font-bold" style={{ color: "#10b981" }}>₹{fmt(result.savings)}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Discount</p>
              <p className="font-bold" style={{ color: "#f59e0b" }}>{result.effectiveDiscount}% off</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

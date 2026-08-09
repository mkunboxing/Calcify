"use client";
import { useState } from "react";

export default function NetWorthCalculator() {
  const [cash, setCash] = useState("100000");
  const [investments, setInvestments] = useState("500000");
  const [property, setProperty] = useState("2500000");
  const [loans, setLoans] = useState("1200000");
  const [creditCards, setCreditCards] = useState("30000");

  const totalAssets = (parseFloat(cash) || 0) + (parseFloat(investments) || 0) + (parseFloat(property) || 0);
  const totalLiabilities = (parseFloat(loans) || 0) + (parseFloat(creditCards) || 0);
  const netWorth = totalAssets - totalLiabilities;

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Assets */}
        <div className="p-4 rounded-xl border" style={{ background: "rgba(16,185,129,0.05)", borderColor: "rgba(16,185,129,0.2)" }}>
          <h3 className="font-bold text-sm mb-3 text-emerald-400">📈 Assets</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Cash & Savings (₹)</label>
              <input type="number" className="input text-sm" value={cash} onChange={e => setCash(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Stocks, Mutual Funds & FD (₹)</label>
              <input type="number" className="input text-sm" value={investments} onChange={e => setInvestments(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Real Estate & Vehicles (₹)</label>
              <input type="number" className="input text-sm" value={property} onChange={e => setProperty(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 pt-2 border-t text-xs font-bold text-right text-emerald-400">Total Assets: ₹{fmt(totalAssets)}</p>
        </div>

        {/* Liabilities */}
        <div className="p-4 rounded-xl border" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)" }}>
          <h3 className="font-bold text-sm mb-3 text-red-400">📉 Liabilities</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Loans & Mortgages (₹)</label>
              <input type="number" className="input text-sm" value={loans} onChange={e => setLoans(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Credit Card Dues (₹)</label>
              <input type="number" className="input text-sm" value={creditCards} onChange={e => setCreditCards(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 pt-2 border-t text-xs font-bold text-right text-red-400">Total Liabilities: ₹{fmt(totalLiabilities)}</p>
        </div>
      </div>

      <div className="result-card animate-fade-up text-center">
        <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Your Estimated Net Worth</p>
        <p className="text-4xl font-extrabold gradient-text">₹{fmt(netWorth)}</p>
      </div>
    </div>
  );
}

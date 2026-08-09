"use client";
import { useState } from "react";

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 text-left font-semibold text-sm flex justify-between items-center gap-4"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="text-lg transition-transform duration-200 text-indigo-400" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ↓
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs text-slate-300 border-t pt-3" style={{ borderColor: "var(--border)" }}>
          {answer}
        </div>
      )}
    </div>
  );
}

export default FAQItem;

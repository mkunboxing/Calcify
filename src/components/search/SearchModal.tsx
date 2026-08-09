"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { publishedTools, CATEGORIES, ToolDefinition } from "@/lib/tool-registry";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter tools
  const filteredTools = publishedTools.filter((tool) => {
    const matchesCat = selectedCategory === "all" || tool.categorySlug === selectedCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesTitle = tool.title.toLowerCase().includes(q);
    const matchesDesc = tool.shortDescription.toLowerCase().includes(q);
    const matchesCatName = tool.category.toLowerCase().includes(q);
    return matchesCat && (matchesTitle || matchesDesc || matchesCatName);
  });

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
      } else if (e.key === "Enter" && filteredTools[selectedIndex]) {
        e.preventDefault();
        const tool = filteredTools[selectedIndex];
        onClose();
        router.push(`/tools/${tool.slug}`);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex, onClose, router]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-up border"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-hover)",
          boxShadow: "var(--shadow-hover)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#5B8DEF" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-0 outline-none text-base sm:text-lg font-medium"
            style={{ color: "var(--text-primary)" }}
            placeholder="Search 66+ calculators & utility tools… (e.g. EMI, BMI, JSON, Password)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button onClick={onClose} className="text-xs px-2 py-1 rounded bg-indigo-500/10 text-slate-400 hover:text-white">
            ESC
          </button>
        </div>

        {/* Category Pills Filter */}
        <div className="p-3 border-b flex gap-1.5 overflow-x-auto no-scrollbar" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === "all"
                ? "bg-[#5B8DEF] text-white border-[#5B8DEF]"
                : "bg-[var(--accent-dim)] border-[var(--border-input)] hover:border-[#5B8DEF] hover:text-[#5B8DEF]"
            }`}
            style={selectedCategory !== "all" ? { color: "var(--text-primary)" } : {}}
          >
            All Tools ({publishedTools.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.slug
                  ? "bg-[#5B8DEF] text-white border-[#5B8DEF]"
                  : "bg-[var(--accent-dim)] border-[var(--border-input)] hover:border-[#5B8DEF] hover:text-[#5B8DEF]"
              }`}
              style={selectedCategory !== cat.slug ? { color: "var(--text-primary)" } : {}}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredTools.length === 0 ? (
            <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
              <p className="text-2xl mb-2">🔍</p>
              <p className="font-semibold text-sm">No calculators found for &quot;{query}&quot;</p>
              <p className="text-xs mt-1">Try searching for finance, math, converter, or developer tools.</p>
            </div>
          ) : (
            filteredTools.map((tool, idx) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                onClick={onClose}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  idx === selectedIndex ? "bg-[#5B8DEF]/15 border border-[#5B8DEF]/40" : "hover:bg-indigo-500/10"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0">
                    {tool.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                      {tool.title}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-[#5B8DEF] font-semibold flex-shrink-0 ml-2">
                  {tool.category}
                </span>
              </Link>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t text-xs flex justify-between items-center text-slate-400" style={{ borderColor: "var(--border)" }}>
          <span>Navigate with <kbd className="px-1.5 py-0.5 rounded bg-indigo-500/10">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-indigo-500/10">↓</kbd></span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-indigo-500/10">Enter</kbd> to open</span>
        </div>
      </div>
    </div>
  );
}

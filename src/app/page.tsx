"use client";

import { useState } from "react";
import Link from "next/link";
import { publishedTools, CATEGORIES, getToolsByCategory } from "@/lib/tool-registry";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const filteredTools = publishedTools.filter((tool) => {
    const matchesCat = selectedCat === "all" || tool.categorySlug === selectedCat;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesTitle = tool.title.toLowerCase().includes(q);
    const matchesDesc = tool.shortDescription.toLowerCase().includes(q);
    const matchesCatName = tool.category.toLowerCase().includes(q);
    return matchesCat && (matchesTitle || matchesDesc || matchesCatName);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Section */}
      <section
        className="text-center py-10 sm:py-16 relative overflow-hidden rounded-3xl p-6 sm:p-12 border shadow-xl"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold mb-6 border animate-fade-in"
          style={{ background: "var(--accent-dim)", borderColor: "var(--border-hover)", color: "var(--accent)" }}
        >
          ⚡ 66 Free Online Calculators & Developer Tools
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
          Instant Calculators & Utilities. <br className="hidden sm:inline" />
          <span className="gradient-text">100% Free & Private.</span>
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
          Fast, accurate online tools for finance, math, health, education, unit conversion, and development. No login required.
        </p>

        {/* Live Search Bar in Hero */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center">
            <svg
              className="w-5 h-5 absolute left-4 pointer-events-none text-[#5B8DEF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="input pl-12 pr-10 py-3.5 text-base sm:text-lg rounded-2xl shadow-lg border-2"
              placeholder="Search 66+ calculators (e.g. EMI, SIP, BMI, GST, JSON)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderColor: searchQuery ? "#5B8DEF" : "var(--border-input)" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-slate-400 hover:text-white text-lg"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
              selectedCat === "all"
                ? "bg-[#5B8DEF] text-white border-[#5B8DEF] shadow-md"
                : "bg-[var(--accent-dim)] border-[var(--border-input)] hover:border-[#5B8DEF] hover:text-[#5B8DEF]"
            }`}
            style={selectedCat !== "all" ? { color: "var(--text-primary)" } : {}}
          >
            All Categories ({publishedTools.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                selectedCat === cat.slug
                  ? "bg-[#5B8DEF] text-white border-[#5B8DEF] shadow-md"
                  : "bg-[var(--accent-dim)] border-[var(--border-input)] hover:border-[#5B8DEF] hover:text-[#5B8DEF]"
              }`}
              style={selectedCat !== cat.slug ? { color: "var(--text-primary)" } : {}}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Live Search Results OR Default Layout */}
      {searchQuery || selectedCat !== "all" ? (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Filtered Calculators"}
            </h2>
            <span className="text-xs font-semibold text-[#5B8DEF]">{filteredTools.length} tools found</span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="card p-12 text-center" style={{ color: "var(--text-muted)" }}>
              <p className="text-3xl mb-2">🔍</p>
              <p className="font-semibold">No calculators match your search.</p>
              <button onClick={() => { setSearchQuery(""); setSelectedCat("all"); }} className="btn-secondary mt-4 text-xs">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="tool-grid">
              {filteredTools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">{tool.icon}</span>
                      <span className="badge bg-indigo-500/10 text-[#5B8DEF]">{tool.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-[#5B8DEF] transition-colors">{tool.title}</h3>
                    <p className="text-xs line-clamp-2" style={{ color: "var(--text-secondary)" }}>{tool.shortDescription}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t text-xs font-semibold text-[#5B8DEF] flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ borderColor: "var(--border)" }}>
                    Open Tool <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Popular Featured Tools */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Popular Calculators</h2>
                <p className="text-xs text-slate-400">Most frequently used tools</p>
              </div>
              <span className="text-xs font-semibold text-[#5B8DEF]">{publishedTools.length} total tools</span>
            </div>

            <div className="tool-grid">
              {publishedTools.slice(0, 8).map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">{tool.icon}</span>
                      <span className="badge bg-indigo-500/10 text-[#5B8DEF]">{tool.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-[#5B8DEF] transition-colors">{tool.title}</h3>
                    <p className="text-xs line-clamp-2" style={{ color: "var(--text-secondary)" }}>{tool.shortDescription}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t text-xs font-semibold text-[#5B8DEF] flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ borderColor: "var(--border)" }}>
                    Open Tool <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Tools by Category */}
          {CATEGORIES.map((cat) => {
            const tools = getToolsByCategory(cat.slug);
            if (tools.length === 0) return null;
            return (
              <section key={cat.slug} id={cat.slug}>
                <div className="flex items-center justify-between mb-6 border-b pb-3" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="text-xl font-bold">{cat.name}</h2>
                  </div>
                  <Link href={`/category/${cat.slug}`} className="text-xs font-semibold text-[#5B8DEF] hover:underline">
                    View all {tools.length} tools →
                  </Link>
                </div>

                <div className="tool-grid">
                  {tools.map((tool) => (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-4 group flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="text-xl">{tool.icon}</span>
                          <h3 className="text-sm font-bold group-hover:text-[#5B8DEF] transition-colors">{tool.title}</h3>
                        </div>
                        <p className="text-xs line-clamp-2" style={{ color: "var(--text-muted)" }}>{tool.shortDescription}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}

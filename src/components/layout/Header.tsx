"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { CATEGORIES, getToolsByCategory } from "@/lib/tool-registry";
import { useTheme } from "@/context/ThemeContext";
import SearchModal from "@/components/search/SearchModal";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-xl transition-colors"
        style={{
          background: theme === "dark" ? "rgba(7,9,19,0.92)" : "rgba(246,248,255,0.94)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden border border-indigo-500/20 shadow-md transition-transform group-hover:scale-105"
                style={{ background: "var(--bg-card)" }}
              >
                <img
                  src="/calcify-logo.png"
                  alt="Calcify Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
                Calcify
              </span>
            </Link>

            {/* Center: Desktop Navigation with Categories Dropdown */}
            <nav className="hidden md:flex items-center gap-1.5">
              {/* Quick Links */}
              <Link
                href="/"
                className="px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--accent-dim)]"
                style={{ color: "var(--text-secondary)" }}
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    dropdownOpen ? "bg-[var(--accent-dim)] text-[var(--accent-light)]" : ""
                  }`}
                  style={{ color: dropdownOpen ? "var(--accent-light)" : "var(--text-secondary)" }}
                  aria-expanded={dropdownOpen}
                >
                  <span>Categories</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-[var(--accent-light)]" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 sm:w-[480px] p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl animate-fade-up grid grid-cols-1 sm:grid-cols-2 gap-2 z-50"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--border-hover)",
                      boxShadow: "var(--shadow-hover)",
                    }}
                  >
                    {CATEGORIES.map((cat) => {
                      const toolCount = getToolsByCategory(cat.slug).length;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-[var(--accent-dim)] group"
                        >
                          <span className="text-2xl p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </span>
                          <div>
                            <p className="text-sm font-bold group-hover:text-[#5B8DEF] transition-colors" style={{ color: "var(--text-primary)" }}>
                              {cat.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {toolCount} {toolCount === 1 ? "tool" : "tools"}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/category/finance"
                className="px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--accent-dim)]"
                style={{ color: "var(--text-secondary)" }}
              >
                Finance
              </Link>

              <Link
                href="/category/developer"
                className="px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--accent-dim)]"
                style={{ color: "var(--text-secondary)" }}
              >
                Developer
              </Link>

              <Link
                href="/category/converters"
                className="px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--accent-dim)]"
                style={{ color: "var(--text-secondary)" }}
              >
                Converters
              </Link>
            </nav>

            {/* Right Actions: Search Trigger + Theme Toggle + Mobile Menu Toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search Button Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-2 font-medium"
                title="Search calculators (⌘K)"
              >
                <svg className="w-4 h-4 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline" style={{ color: "var(--text-secondary)" }}>Search…</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-indigo-500/10 text-[10px] font-mono text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle Button */}
              <button
                id="theme-toggle"
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="btn-ghost p-2 rounded-xl flex items-center justify-center"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                className="md:hidden btn-ghost p-2 rounded-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-4 py-4 animate-fade-up max-h-[80vh] overflow-y-auto"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-2 px-2" style={{ color: "var(--text-muted)" }}>
              Categories
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {CATEGORIES.map((cat) => {
                const count = getToolsByCategory(cat.slug).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--accent-dim)]"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2.5">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-[#5B8DEF] font-bold">
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Command Palette Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

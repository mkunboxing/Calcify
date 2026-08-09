import Link from "next/link";
import { CATEGORIES } from "@/lib/tool-registry";

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3 group">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden border border-indigo-500/20 shadow-sm"
                style={{ background: "var(--bg-card)" }}
              >
                <img
                  src="/calcify-logo.png"
                  alt="Calcify Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Calcify</span>
            </Link>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Free calculators and utility tools for everyone. Fast, accurate, and privacy-friendly.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm transition-colors hover:text-indigo-400"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>Popular Tools</h3>
            <ul className="space-y-2">
              {[
                { label: "EMI Calculator", slug: "emi-calculator" },
                { label: "SIP Calculator", slug: "sip-calculator" },
                { label: "BMI Calculator", slug: "bmi-calculator" },
                { label: "GST Calculator", slug: "gst-calculator" },
                { label: "Word Counter", slug: "word-counter" },
              ].map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="text-sm transition-colors hover:text-indigo-400"
                    style={{ color: "var(--text-muted)" }}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>Legal</h3>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-indigo-400"
                    style={{ color: "var(--text-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Calcify. All rights reserved.
          </p>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Made with ❤️ in India by <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>MK</span>
          </p>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            All calculations are for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Calcify",
  description: "Privacy Policy for Calcify. Learn how we prioritize user privacy through client-side browser execution with zero server data tracking.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 9, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6 text-slate-400">
        <Link href="/" className="hover:text-[#3B68FC]">Home</Link>
        <span>/</span>
        <span className="text-slate-200">Privacy Policy</span>
      </nav>

      <header className="mb-8 border-b pb-6" style={{ borderColor: "var(--border)" }}>
        <h1 className="text-3xl font-extrabold mb-2">Privacy Policy</h1>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Last Updated: {lastUpdated}
        </p>
      </header>

      <div className="space-y-8 prose-custom text-sm" style={{ color: "var(--text-secondary)" }}>
        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>1. Our Commitment to Your Privacy</h2>
          <p>
            At <strong>Calcify</strong>, we believe that web utility tools and financial calculators should be fast, transparent, and completely private. We operate under a strict <strong>Privacy-First, Client-Side First</strong> philosophy.
          </p>
          <p>
            100% of calculation processing—including financial inputs, health statistics, developer tools, text formatting, Base64 conversion, and image compression—takes place directly in your web browser. Your inputs are never uploaded, transmitted, stored, or analyzed on remote servers.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>2. Information We Do NOT Collect</h2>
          <p>
            When using Calcify, you do not need to create an account, log in, or provide personal details. Specifically:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>No Financial Data:</strong> Principal amounts, loan tenures, interest rates, salary figures, and net worth calculations remain purely in local browser memory.</li>
            <li><strong>No Personal Identifiable Information (PII):</strong> We do not collect names, email addresses, phone numbers, or passwords.</li>
            <li><strong>No Text / File Storage:</strong> Text entered into Word Counter, JSON Formatter, or Regex tools, as well as images uploaded to Image Compressor, are processed locally in Web Workers/Memory and discarded immediately when you close the tab.</li>
          </ul>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>3. Local Storage & Cookies</h2>
          <p>
            Calcify uses standard browser <code>localStorage</code> solely to persist user UI preferences locally on your device:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><code>calcify-theme</code>: Stores your selected light or dark mode preference.</li>
            <li><code>calcify_install_dismissed</code>: Remembers if you dismissed the PWA installation banner.</li>
          </ul>
          <p>
            These key-value pairs are stored locally on your device and are never transmitted to our servers.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>4. Service Worker & Offline Caching</h2>
          <p>
            As a Progressive Web App (PWA), Calcify uses a browser Service Worker (<code>sw.js</code>) to cache static website files (HTML, CSS, JavaScript, icons) locally on your device. This allows the application shell to load instantly and function completely offline without an internet connection.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>5. Third-Party Services & Analytics</h2>
          <p>
            We may use privacy-preserving, aggregate web analytics to count overall website traffic (e.g., total daily page views). These analytics metrics do not track individual users, log IP addresses, or associate calculations with specific visitor identities.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>6. Changes to This Policy</h2>
          <p>
            We may periodically update this Privacy Policy to reflect technical enhancements or new features. Any modifications will be posted directly on this page with an updated &quot;Last Updated&quot; date.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>7. Contact Us</h2>
          <p>
            If you have questions, feedback, or concerns regarding our privacy practices, please reach out to us at{" "}
            <a href="mailto:support@calcify.tools" className="text-[#3B68FC] font-semibold hover:underline">
              support@calcify.tools
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}

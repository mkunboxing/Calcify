import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Calcify",
  description: "Terms of Service and conditions for using Calcify's free online calculators and utility tools.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "August 9, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6 text-slate-400">
        <Link href="/" className="hover:text-[#3B68FC]">Home</Link>
        <span>/</span>
        <span className="text-slate-200">Terms of Service</span>
      </nav>

      <header className="mb-8 border-b pb-6" style={{ borderColor: "var(--border)" }}>
        <h1 className="text-3xl font-extrabold mb-2">Terms of Service</h1>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Last Updated: {lastUpdated}
        </p>
      </header>

      <div className="space-y-8 prose-custom text-sm" style={{ color: "var(--text-secondary)" }}>
        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>Calcify</strong> (located at calcify.tools or accessed via installed Progressive Web App), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our services.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>2. Use of Service</h2>
          <p>
            Calcify provides free online calculators, mathematical units conversion, health estimators, developer tools, and text utilities. You are granted a non-exclusive, non-transferable, revocable license to access and use the tools for personal, educational, or commercial purposes.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>You agree not to misuse, reverse-engineer, or attempt to disrupt the availability of Calcify.</li>
            <li>You agree not to use automated scripts to spam or scrape website infrastructure.</li>
          </ul>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>3. Calculation Accuracy & Disclaimers</h2>
          <p>
            All calculations, algorithms, estimations, and results provided on Calcify are executed using standard mathematical formulas in your browser. While we strive for 100% accuracy:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Tools are provided on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis without warranties of any kind.</li>
            <li>Financial, investment, loan, tax, and health outputs are estimates intended for educational and general planning purposes only.</li>
            <li>Users are strongly advised to independently verify critical numbers with certified professional advisors (such as chartered accountants, financial planners, or healthcare professionals) before taking financial, legal, or health actions.</li>
          </ul>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>4. Intellectual Property</h2>
          <p>
            All content, brand design, logos, user interface components, software code, and graphic assets associated with Calcify are the exclusive property of Calcify and protected by applicable copyright, trademark, and intellectual property laws.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>5. Limitation of Liability</h2>
          <p>
            In no event shall Calcify, its creators, or contributors be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your use or inability to use the site or reliance on any calculations provided.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>6. Modifications to Service</h2>
          <p>
            We reserve the right to modify, update, suspend, or discontinue any calculator, utility tool, or feature on Calcify at any time without prior notice.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with standard legal frameworks, without regard to conflict of law provisions.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>8. Contact Us</h2>
          <p>
            For questions regarding these Terms of Service, please contact us at{" "}
            <a href="mailto:terms@calcify.tools" className="text-[#3B68FC] font-semibold hover:underline">
              terms@calcify.tools
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}

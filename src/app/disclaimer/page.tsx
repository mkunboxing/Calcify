import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | Calcify",
  description: "General, Financial, Health, and Legal Disclaimer for Calcify calculators and utility tools.",
};

export default function DisclaimerPage() {
  const lastUpdated = "August 9, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6 text-slate-400">
        <Link href="/" className="hover:text-[#3B68FC]">Home</Link>
        <span>/</span>
        <span className="text-slate-200">Disclaimer</span>
      </nav>

      <header className="mb-8 border-b pb-6" style={{ borderColor: "var(--border)" }}>
        <h1 className="text-3xl font-extrabold mb-2">Disclaimer</h1>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Last Updated: {lastUpdated}
        </p>
      </header>

      <div className="space-y-8 prose-custom text-sm" style={{ color: "var(--text-secondary)" }}>
        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>1. General Information Disclaimer</h2>
          <p>
            The information, calculators, converters, and software utilities provided on <strong>Calcify</strong> are for general informational, educational, and convenience purposes only. While every reasonable effort is made to maintain algorithmic precision and functional reliability, Calcify makes no representations or warranties of any kind—express or implied—about the completeness, accuracy, reliability, or suitability of any calculation.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3 border-l-4 border-l-amber-500">
          <h2 className="text-lg font-bold text-amber-400">2. Financial, Loan & Investment Disclaimer</h2>
          <p>
            Calculations performed by tools such as the EMI Calculator, SIP Calculator, Compound Interest Calculator, FD/RD Calculators, CAGR, ROI, Net Worth, GST, and Retirement Corpus estimators are illustrative estimates.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Actual bank loan EMIs, interest rates, tax liabilities, or mutual fund returns may vary depending on financial institution policies, compounding methods, market fluctuations, and applicable laws.</li>
            <li>No calculation on Calcify constitutes certified financial advice, investment recommendation, or tax counsel.</li>
            <li>Always consult a qualified financial advisor, chartered accountant, or bank representative before making significant financial commitments.</li>
          </ul>
        </section>

        <section className="card p-6 sm:p-8 space-y-3 border-l-4 border-l-rose-500">
          <h2 className="text-lg font-bold text-rose-400">3. Health & Fitness Disclaimer</h2>
          <p>
            Health-related tools including the BMI Calculator, BMR Calculator, TDEE Calculator, Calorie Deficit Estimator, Ideal Weight Calculator, and Daily Water Intake Estimator rely on standard population equations (such as Mifflin-St Jeor, Harris-Benedict, or Devine formulas).
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Outputs are statistical approximations intended for general fitness tracking only and do NOT constitute medical advice, diagnosis, or treatment plans.</li>
            <li>Individual metabolic rates, muscle mass, age factors, and medical conditions significantly influence actual health needs.</li>
            <li>Always consult a licensed physician, nutritionist, or healthcare specialist before starting any diet, caloric deficit, or exercise regimen.</li>
          </ul>
        </section>

        <section className="card p-6 sm:p-8 space-y-3 border-l-4 border-l-emerald-500">
          <h2 className="text-lg font-bold text-emerald-400">4. Developer & Data Conversion Disclaimer</h2>
          <p>
            Developer utilities—including Base64 Encoder/Decoder, JSON Formatter, SHA Hash Generator, UUID Generator, Regex Tester, and Unit Converters—operate entirely client-side in your browser.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>SHA hash and UUID generators use standard browser Web Crypto APIs (`crypto.subtle` / `crypto.randomUUID()`).</li>
            <li>Users are responsible for verifying generated data prior to deploying code into production or security-critical applications.</li>
          </ul>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>5. External Links</h2>
          <p>
            Calcify may contain links to external third-party websites for reference. We have no control over the content, privacy policies, or practices of external sites and accept no responsibility for them.
          </p>
        </section>

        <section className="card p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>6. Contact Us</h2>
          <p>
            If you have questions regarding this Disclaimer, please contact us at{" "}
            <a href="mailto:support@calcify.tools" className="text-[#3B68FC] font-semibold hover:underline">
              support@calcify.tools
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}

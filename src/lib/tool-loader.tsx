import ToolClientLoader from "@/components/tool/ToolClientLoader";

export { ToolClientLoader };

// ── Static Content Mapping for SSR (SEO) ─────────────────────────
export function getToolStaticContent(slug: string): {
  formulaHtml?: string;
  exampleText?: string;
  faqs?: { q: string; a: string }[];
} {
  switch (slug) {
    case "emi-calculator":
      return {
        formulaHtml: `
          <p>The Equated Monthly Installment (EMI) formula is:</p>
          <pre class="code-block">EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]</pre>
          <p>Where:</p>
          <ul>
            <li><strong>P</strong> = Principal loan amount</li>
            <li><strong>r</strong> = Monthly interest rate (Annual Rate / 12 / 100)</li>
            <li><strong>n</strong> = Loan tenure in months</li>
          </ul>
        `,
        exampleText: "For a ₹10,00,000 loan at 8.5% annual interest for 15 years (180 months), monthly EMI is ₹9,847.",
        faqs: [
          { q: "What is EMI?", a: "EMI stands for Equated Monthly Installment..." },
          { q: "How is loan interest calculated?", a: "Interest is computed on a reducing balance basis..." },
        ],
      };
    case "sip-calculator":
      return {
        formulaHtml: `
          <p>The SIP maturity amount formula is:</p>
          <pre class="code-block">M = P × [ (1 + i)^n - 1 ] × (1 + i) / i</pre>
          <p>Where <strong>P</strong> is monthly deposit, <strong>i</strong> is monthly return rate, and <strong>n</strong> is number of months.</p>
        `,
        exampleText: "Investing ₹5,000 monthly for 10 years at an expected 12% annual return yields an estimated maturity value of ₹11,61,695.",
        faqs: [
          { q: "What is SIP?", a: "Systematic Investment Plan (SIP) allows disciplined monthly mutual fund investments." },
        ],
      };
    default:
      return {
        formulaHtml: `<p>Formula and calculations are performed using standard mathematical equations in your browser.</p>`,
        exampleText: `Calculate values instantly with accurate, zero-latency local execution.`,
        faqs: [
          { q: "Is this tool free?", a: "Yes, all tools on Calcify are 100% free to use with no account required." },
          { q: "Is my data private?", a: "Yes, all calculations are performed entirely client-side in your web browser." },
        ],
      };
  }
}

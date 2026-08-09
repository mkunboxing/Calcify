import Link from "next/link";
import { ToolDefinition } from "@/lib/tool-registry";
import FAQItem from "@/components/tool/FAQItem";
import RelatedTools from "@/components/tool/RelatedTools";
import ToolClientLoader from "@/components/tool/ToolClientLoader";

type Props = {
  tool: ToolDefinition;
  staticContent: {
    formulaHtml?: string;
    exampleText?: string;
    faqs?: { q: string; a: string }[];
  };
};

const DISCLAIMER_TEXTS = {
  health:
    "⚠️ Medical Disclaimer: Results are estimates based on standard population formulas and are intended for general educational purposes only. Always consult a qualified health professional before making health or fitness decisions.",
  finance:
    "⚠️ Financial Disclaimer: Returns, interest, and calculations shown are for illustrative purposes. Rates vary based on market conditions, institution policies, and individual eligibility.",
  tax:
    "⚠️ Tax Disclaimer: Tax rules change frequently based on government regulations. Use these estimates for general guidance and consult a certified tax advisor for exact computations.",
  security:
    "🔒 Privacy Notice: All operations are executed 100% locally in your web browser. No data is stored, recorded, or transmitted to any remote server.",
};

export default function ToolShell({ tool, staticContent }: Props) {
  const disclaimer = tool.disclaimerType
    ? DISCLAIMER_TEXTS[tool.disclaimerType]
    : DISCLAIMER_TEXTS.security;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-up">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6 text-slate-400">
        <Link href="/" className="hover:text-indigo-400">Home</Link>
        <span>/</span>
        <Link href={`/category/${tool.categorySlug}`} className="hover:text-indigo-400">{tool.category}</Link>
        <span>/</span>
        <span className="text-slate-200">{tool.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{tool.icon}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{tool.title}</h1>
        </div>
        <p className="text-base text-slate-300 max-w-2xl">{tool.shortDescription}</p>
      </header>

      {/* Disclaimer */}
      {disclaimer && (
        <div className="mb-6 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-500">
          {disclaimer}
        </div>
      )}

      {/* Tool Interactive Widget */}
      <div className="card p-6 sm:p-8 mb-10">
        <ToolClientLoader componentKey={tool.componentKey} />
      </div>

      {/* Formula & How-to (SSR for SEO) */}
      {staticContent.formulaHtml && (
        <section className="card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Formula & Calculation</h2>
          <div
            className="prose-custom text-sm"
            dangerouslySetInnerHTML={{ __html: staticContent.formulaHtml }}
          />
        </section>
      )}

      {/* Example */}
      {staticContent.exampleText && (
        <section className="card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold mb-3">Example Calculation</h2>
          <p className="text-sm text-slate-300">{staticContent.exampleText}</p>
        </section>
      )}

      {/* FAQs */}
      {staticContent.faqs && staticContent.faqs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {staticContent.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      <RelatedTools relatedSlugs={tool.related} />
    </div>
  );
}

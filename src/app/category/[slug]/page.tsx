import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getToolsByCategory } from "@/lib/tool-registry";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} Calculators & Tools | Calcify`,
    description: `Free online ${category.name.toLowerCase()} calculators and utility tools. Fast, browser-based, no login required.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-xs mb-6 text-slate-400">
        <Link href="/" className="hover:text-indigo-400">Home</Link>
        <span>/</span>
        <span className="text-slate-200">{category.name}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-3xl font-extrabold">{category.name} Tools</h1>
        </div>
        <p className="text-sm text-slate-400">Explore {tools.length} free online tools in {category.name.toLowerCase()}.</p>
      </header>

      <div className="tool-grid">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 group flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">{tool.icon}</span>
                <h2 className="text-base font-bold group-hover:text-indigo-400 transition-colors">{tool.title}</h2>
              </div>
              <p className="text-xs line-clamp-2" style={{ color: "var(--text-secondary)" }}>{tool.shortDescription}</p>
            </div>
            <div className="mt-4 pt-3 border-t text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ borderColor: "var(--border)" }}>
              Open Tool <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

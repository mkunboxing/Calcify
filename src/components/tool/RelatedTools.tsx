import Link from "next/link";
import { getTool } from "@/lib/tool-registry";

export default function RelatedTools({ relatedSlugs }: { relatedSlugs: string[] }) {
  const tools = relatedSlugs.map(slug => getTool(slug)).filter(Boolean);

  if (tools.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
      <h2 className="text-xl font-bold mb-4">Related Calculators & Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map(tool => tool && (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-4 group">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">{tool.icon}</span>
              <h3 className="font-bold text-sm group-hover:text-indigo-400 transition-colors">{tool.title}</h3>
            </div>
            <p className="text-xs line-clamp-2" style={{ color: "var(--text-muted)" }}>{tool.shortDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

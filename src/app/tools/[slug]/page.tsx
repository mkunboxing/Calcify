import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTool, publishedTools } from "@/lib/tool-registry";
import ToolShell from "@/components/tool/ToolShell";
import { getToolStaticContent } from "@/lib/tool-loader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publishedTools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      type: "website",
      url: `https://calcify.tools/tools/${tool.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seo.title,
      description: tool.seo.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  const staticContent = getToolStaticContent(tool.slug);

  return <ToolShell tool={tool} staticContent={staticContent} />;
}

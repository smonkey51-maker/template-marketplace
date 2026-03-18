import type { Metadata } from "next";
import { getTemplate } from "@/lib/templates";
import PreviewContent from "@/components/PreviewContent";

export async function generateMetadata(
  { params }: { params: Promise<{ templateId: string }> }
): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) return { title: "Template non trovato — TemplateLab" };
  const ogImage = `/api/og?id=${templateId}`;
  return {
    title: `${template.name} — TemplateLab`,
    description: template.description,
    openGraph: {
      title: `${template.name} — TemplateLab`,
      description: template.description,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: template.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} — TemplateLab`,
      description: template.description,
      images: [ogImage],
    },
  };
}

export default async function PreviewPage(
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params;
  return <PreviewContent templateId={templateId} />;
}

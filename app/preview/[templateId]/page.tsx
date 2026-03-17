import type { Metadata } from "next";
import { getTemplate } from "@/lib/templates";
import PreviewContent from "@/components/PreviewContent";

export async function generateMetadata(
  { params }: { params: Promise<{ templateId: string }> }
): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) return { title: "Template non trovato — TemplateLab" };
  return {
    title: `${template.name} — TemplateLab`,
    description: template.description,
    openGraph: {
      title: `${template.name} — TemplateLab`,
      description: template.description,
      type: "website",
    },
  };
}

export default async function PreviewPage(
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params;
  return <PreviewContent templateId={templateId} />;
}

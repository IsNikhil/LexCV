import { CustomSection } from "@/app/types/resume";

interface Props {
  customSections: CustomSection[];
}

export default function ResumeCustomSections({ customSections }: Props) {
  const visible = (customSections ?? []).filter((s) => s.title.trim() || s.content.trim());
  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((section) => (
        <div key={section.id} className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-800 pb-1 mb-1.5">
            {section.title || "Section"}
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
        </div>
      ))}
    </>
  );
}

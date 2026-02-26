import { SkillCategory } from "@/app/types/resume";

interface Props {
  skills: SkillCategory[];
}

export default function ResumeSkills({ skills }: Props) {
  const hasContent = skills.some((s) => s.items.length > 0);
  if (!hasContent) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">
        Skills
      </h2>
      <div className="space-y-1">
        {skills
          .filter((s) => s.items.length > 0)
          .map((cat) => (
            <div key={cat.id} className="flex gap-1 text-xs">
              {cat.category && (
                <span className="font-semibold text-gray-800 flex-shrink-0">{cat.category}:</span>
              )}
              <span className="text-gray-700">{cat.items.join(", ")}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

import { Experience } from "@/app/types/resume";

interface Props {
  experience: Experience[];
}

export default function ResumeExperience({ experience }: Props) {
  const hasContent = experience.some((e) => e.company || e.title);
  if (!hasContent) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-800 pb-0.5 mb-2">
        Experience
      </h2>
      {experience.map((exp) => (
        <div key={exp.id} className="mb-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-900">{exp.title}</span>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold text-gray-700 italic">{exp.company}</span>
            {exp.location && (
              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{exp.location}</span>
            )}
          </div>
          {exp.bullets.filter(Boolean).length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {exp.bullets.filter(Boolean).map((bullet, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-gray-700">
                  <span className="flex-shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

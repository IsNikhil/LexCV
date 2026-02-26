import { Project } from "@/app/types/resume";

interface Props {
  projects: Project[];
}

export default function ResumeProjects({ projects }: Props) {
  const hasContent = projects.some((p) => p.name);
  if (!hasContent) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">
        Projects
      </h2>
      {projects.map((proj) => (
        <div key={proj.id} className="mb-2.5">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-gray-900">{proj.name}</span>
            {proj.technologies && (
              <span className="text-xs text-gray-500 italic"> | {proj.technologies}</span>
            )}
          </div>
          {proj.bullets.filter(Boolean).length > 0 && (
            <ul className="mt-0.5 space-y-0.5">
              {proj.bullets.filter(Boolean).map((bullet, i) => (
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

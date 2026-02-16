import { Education } from "@/app/types/resume";

interface Props {
  education: Education[];
}

export default function ResumeEducation({ education }: Props) {
  const hasContent = education.some((e) => e.institution || e.degree);
  if (!hasContent) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-800 pb-0.5 mb-2">
        Education
      </h2>
      {education.map((edu) => (
        <div key={edu.id} className="mb-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-900">{edu.institution}</span>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-gray-700">
              {[edu.degree, edu.field].filter(Boolean).join(", ")}
            </span>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{edu.location}</span>
          </div>
          {edu.gpa && (
            <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>
          )}
        </div>
      ))}
    </div>
  );
}

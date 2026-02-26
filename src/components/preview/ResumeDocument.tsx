import { ResumeData } from "@/app/types/resume";
import ResumeHeader from "./ResumeHeader";
import ResumeSummary from "./ResumeSummary";
import ResumeExperience from "./ResumeExperience";
import ResumeEducation from "./ResumeEducation";
import ResumeProjects from "./ResumeProjects";
import ResumeSkills from "./ResumeSkills";
import ResumeCustomSections from "./ResumeCustomSections";

interface Props {
  data: ResumeData;
}

export default function ResumeDocument({ data }: Props) {
  const order = data.sectionOrder ?? ["summary", "experience", "education", "projects", "skills"];
  const customMap = new Map((data.customSections ?? []).map((s) => [s.id, s]));

  return (
    <div
      id="resume-preview"
      className="bg-white"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "48px 56px",
        fontFamily: "'Inter', system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <ResumeHeader personalInfo={data.personalInfo} />
      {order.map((key) => {
        if (key === "summary") return <ResumeSummary key="summary" summary={data.summary} />;
        if (key === "experience") return <ResumeExperience key="experience" experience={data.experience} />;
        if (key === "education") return <ResumeEducation key="education" education={data.education} />;
        if (key === "projects") return <ResumeProjects key="projects" projects={data.projects} />;
        if (key === "skills") return <ResumeSkills key="skills" skills={data.skills} />;
        const cs = customMap.get(key);
        if (cs) return <ResumeCustomSections key={cs.id} customSections={[cs]} />;
        return null;
      })}
    </div>
  );
}

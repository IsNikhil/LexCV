import { ResumeData } from "@/app/types/resume";
import ResumeHeader from "./ResumeHeader";
import ResumeSummary from "./ResumeSummary";
import ResumeExperience from "./ResumeExperience";
import ResumeEducation from "./ResumeEducation";
import ResumeProjects from "./ResumeProjects";
import ResumeSkills from "./ResumeSkills";

interface Props {
  data: ResumeData;
}

export default function ResumeDocument({ data }: Props) {
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
      <ResumeSummary summary={data.summary} />
      <ResumeExperience experience={data.experience} />
      <ResumeEducation education={data.education} />
      <ResumeProjects projects={data.projects} />
      <ResumeSkills skills={data.skills} />
    </div>
  );
}

"use client";

import { ResumeData } from "@/app/types/resume";
import PersonalInfoSection from "./PersonalInfoSection";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import { useResumeState } from "@/app/hooks/useResumeState";

interface Props {
  data: ResumeData;
  updater: ReturnType<typeof useResumeState>["updater"];
}

export default function EditorPanel({ data, updater }: Props) {
  return (
    <div className="pb-10">
      <PersonalInfoSection data={data.personalInfo} onChange={updater.setPersonalInfo} />
      <SummarySection value={data.summary} onChange={updater.setSummary} />
      <ExperienceSection
        items={data.experience}
        onAdd={updater.addExperience}
        onUpdate={updater.updateExperience}
        onUpdateBullet={updater.updateExperienceBullet}
        onAddBullet={updater.addExperienceBullet}
        onRemoveBullet={updater.removeExperienceBullet}
        onRemove={updater.removeExperience}
      />
      <EducationSection
        items={data.education}
        onAdd={updater.addEducation}
        onUpdate={updater.updateEducation}
        onRemove={updater.removeEducation}
      />
      <ProjectSection
        items={data.projects}
        onAdd={updater.addProject}
        onUpdate={updater.updateProject}
        onUpdateBullet={updater.updateProjectBullet}
        onAddBullet={updater.addProjectBullet}
        onRemoveBullet={updater.removeProjectBullet}
        onRemove={updater.removeProject}
      />
      <SkillsSection
        items={data.skills}
        onAddCategory={updater.addSkillCategory}
        onUpdateCategory={updater.updateSkillCategory}
        onAddItem={updater.addSkillItem}
        onRemoveItem={updater.removeSkillItem}
        onRemoveCategory={updater.removeSkillCategory}
      />
    </div>
  );
}

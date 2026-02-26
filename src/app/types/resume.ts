export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  bullets: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export const BUILT_IN_SECTIONS = ["summary", "experience", "education", "projects", "skills"] as const;
export const DEFAULT_SECTION_ORDER = [...BUILT_IN_SECTIONS];

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  customSections: CustomSection[];
  sectionOrder: string[];
}

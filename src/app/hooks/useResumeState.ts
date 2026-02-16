"use client";

import { useState, useCallback } from "react";
import { ResumeData, PersonalInfo, Experience, Education, SkillCategory, Project } from "@/app/types/resume";
import { sampleResumeData } from "@/app/data/sampleData";
import { v4 as uuidv4 } from "uuid";

export function useResumeState() {
  const [resume, setResume] = useState<ResumeData>(sampleResumeData);

  const setPersonalInfo = useCallback((field: keyof PersonalInfo, value: string) => {
    setResume((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  }, []);

  const setSummary = useCallback((value: string) => {
    setResume((prev) => ({ ...prev, summary: value }));
  }, []);

  const addExperience = useCallback(() => {
    const blank: Experience = { id: uuidv4(), company: "", title: "", startDate: "", endDate: "", location: "", bullets: [""] };
    setResume((prev) => ({ ...prev, experience: [...prev.experience, blank] }));
  }, []);

  const updateExperience = useCallback((id: string, field: keyof Omit<Experience, "id" | "bullets">, value: string) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.map((e) => e.id === id ? { ...e, [field]: value } : e) }));
  }, []);

  const updateExperienceBullet = useCallback((id: string, index: number, value: string) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.map((e) => e.id === id ? { ...e, bullets: e.bullets.map((b, i) => i === index ? value : b) } : e) }));
  }, []);

  const addExperienceBullet = useCallback((id: string) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.map((e) => e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e) }));
  }, []);

  const removeExperienceBullet = useCallback((id: string, index: number) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.map((e) => e.id === id ? { ...e, bullets: e.bullets.filter((_, i) => i !== index) } : e) }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  }, []);

  const addEducation = useCallback(() => {
    const blank: Education = { id: uuidv4(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", location: "" };
    setResume((prev) => ({ ...prev, education: [...prev.education, blank] }));
  }, []);

  const updateEducation = useCallback((id: string, field: keyof Omit<Education, "id">, value: string) => {
    setResume((prev) => ({ ...prev, education: prev.education.map((e) => e.id === id ? { ...e, [field]: value } : e) }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResume((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  }, []);

  const addSkillCategory = useCallback(() => {
    const blank: SkillCategory = { id: uuidv4(), category: "", items: [] };
    setResume((prev) => ({ ...prev, skills: [...prev.skills, blank] }));
  }, []);

  const updateSkillCategory = useCallback((id: string, category: string) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.map((s) => s.id === id ? { ...s, category } : s) }));
  }, []);

  const addSkillItem = useCallback((id: string, item: string) => {
    if (!item.trim()) return;
    setResume((prev) => ({ ...prev, skills: prev.skills.map((s) => s.id === id ? { ...s, items: [...s.items, item.trim()] } : s) }));
  }, []);

  const removeSkillItem = useCallback((id: string, index: number) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.map((s) => s.id === id ? { ...s, items: s.items.filter((_, i) => i !== index) } : s) }));
  }, []);

  const removeSkillCategory = useCallback((id: string) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  }, []);

  const addProject = useCallback(() => {
    const blank: Project = { id: uuidv4(), name: "", technologies: "", bullets: [""] };
    setResume((prev) => ({ ...prev, projects: [...prev.projects, blank] }));
  }, []);

  const updateProject = useCallback((id: string, field: keyof Omit<Project, "id" | "bullets">, value: string) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.map((p) => p.id === id ? { ...p, [field]: value } : p) }));
  }, []);

  const updateProjectBullet = useCallback((id: string, index: number, value: string) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.map((p) => p.id === id ? { ...p, bullets: p.bullets.map((b, i) => i === index ? value : b) } : p) }));
  }, []);

  const addProjectBullet = useCallback((id: string) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.map((p) => p.id === id ? { ...p, bullets: [...p.bullets, ""] } : p) }));
  }, []);

  const removeProjectBullet = useCallback((id: string, index: number) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.map((p) => p.id === id ? { ...p, bullets: p.bullets.filter((_, i) => i !== index) } : p) }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  }, []);

  return {
    resume,
    updater: {
      setPersonalInfo, setSummary,
      addExperience, updateExperience, updateExperienceBullet, addExperienceBullet, removeExperienceBullet, removeExperience,
      addEducation, updateEducation, removeEducation,
      addSkillCategory, updateSkillCategory, addSkillItem, removeSkillItem, removeSkillCategory,
      addProject, updateProject, updateProjectBullet, addProjectBullet, removeProjectBullet, removeProject,
    },
  };
}

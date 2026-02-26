"use client";

import { useCallback, useEffect, useState } from "react";
import { ResumeData } from "@/app/types/resume";

export interface SavedProject {
  id: string;
  name: string;
  savedAt: number;
  data: ResumeData;
}

const STORAGE_KEY = "lexcv_projects";

function loadProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedProject[]) : [];
  } catch {
    return [];
  }
}

function persistProjects(projects: SavedProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function useProjectManager() {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const saveProject = useCallback((name: string, data: ResumeData): string => {
    // Use functional update so we always have the latest activeProjectId via closure capture at call time
    const id = activeProjectId ?? crypto.randomUUID();
    const project: SavedProject = { id, name, savedAt: Date.now(), data };
    setProjects((prev) => {
      const updated = [project, ...prev.filter((p) => p.id !== id)];
      persistProjects(updated);
      return updated;
    });
    setActiveProjectId(id);
    return id;
  }, [activeProjectId]);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persistProjects(updated);
      return updated;
    });
    setActiveProjectId((prev) => (prev === id ? null : prev));
  }, []);

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;

  return { projects, activeProject, activeProjectId, setActiveProjectId, saveProject, deleteProject };
}

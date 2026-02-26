"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import TwoPanel from "@/components/layout/TwoPanel";
import EditorPanel from "@/components/editor/EditorPanel";
import PreviewPanel from "@/components/preview/PreviewPanel";
import { useResumeState } from "@/app/hooks/useResumeState";
import { useProjectManager, SavedProject } from "@/app/hooks/useProjectManager";
import { downloadResumeAsPdf } from "@/app/lib/downloadPdf";

export default function Home() {
  const { resume, updater, setResumeFull } = useResumeState();
  const { projects, activeProject, setActiveProjectId, saveProject, deleteProject } = useProjectManager();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadResumeAsPdf(resume.personalInfo.name);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = (name: string) => {
    saveProject(name, resume);
  };

  const handleLoadProject = (project: SavedProject) => {
    setResumeFull(project.data);
    setActiveProjectId(project.id);
  };

  return (
    <>
      <Header
        onDownload={handleDownload}
        isDownloading={isDownloading}
        isDark={isDark}
        onToggleDark={() => setIsDark((v) => !v)}
        projects={projects}
        activeProjectName={activeProject?.name ?? null}
        onSave={handleSave}
        onLoadProject={handleLoadProject}
        onDeleteProject={deleteProject}
      />
      <TwoPanel
        left={<EditorPanel data={resume} updater={updater} />}
        right={<PreviewPanel data={resume} />}
      />
    </>
  );
}

"use client";

import { useRef, useState } from "react";
import { SavedProject } from "@/app/hooks/useProjectManager";

interface HeaderProps {
  onDownload: () => void;
  isDownloading: boolean;
  isDark: boolean;
  onToggleDark: () => void;
  projects: SavedProject[];
  activeProjectName: string | null;
  onSave: (name: string) => void;
  onLoadProject: (project: SavedProject) => void;
  onDeleteProject: (id: string) => void;
}

export default function Header({
  onDownload, isDownloading, isDark, onToggleDark,
  projects, activeProjectName, onSave, onLoadProject, onDeleteProject,
}: HeaderProps) {
  const [showProjects, setShowProjects] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveName, setSaveName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSaveClick() {
    setSaveName(activeProjectName ?? "");
    setShowSaveModal(true);
  }

  function handleSaveConfirm() {
    const name = saveName.trim() || "Untitled Resume";
    onSave(name);
    setShowSaveModal(false);
  }

  function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-600 tracking-tight">Lex</span>
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">CV</span>
          {activeProjectName && (
            <span className="hidden sm:inline text-sm text-gray-400 dark:text-gray-500 ml-1">— {activeProjectName}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Projects dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProjects((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
              </svg>
              <span className="hidden sm:inline">Projects</span>
              {projects.length > 0 && (
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs rounded-full px-1.5">
                  {projects.length}
                </span>
              )}
            </button>

            {showProjects && (
              <div className="absolute right-0 top-11 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Saved Projects</p>
                </div>
                {projects.length === 0 ? (
                  <p className="text-sm text-gray-400 px-4 py-4">No saved projects yet.</p>
                ) : (
                  <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                    {projects.map((p) => (
                      <li key={p.id} className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                        <button
                          className="flex-1 text-left"
                          onClick={() => { onLoadProject(p); setShowProjects(false); }}
                        >
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{p.name}</p>
                          <p className="text-xs text-gray-400">{formatDate(p.savedAt)}</p>
                        </button>
                        <button
                          onClick={() => onDeleteProject(p.id)}
                          className="text-gray-300 dark:text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete project"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={handleSaveClick}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Download button */}
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="hidden sm:inline">Generating...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Download PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Save modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Save Project</h2>
            <input
              autoFocus
              className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
              placeholder="Project name"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSaveConfirm(); if (e.key === "Escape") setShowSaveModal(false); }}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfirm}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click-outside to close dropdown */}
      {showProjects && (
        <div className="fixed inset-0 z-40" onClick={() => setShowProjects(false)} />
      )}
    </>
  );
}

"use client";

import { useState } from "react";

interface TwoPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

function Footer() {
  return (
    <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-700 px-5 py-3 flex items-center justify-between">
      <span className="text-xs text-gray-400 dark:text-gray-500">
        Built by{" "}
        <a
          href="https://nikhilshah.com.np"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
        >
          Nikhil Shah
        </a>
      </span>
      <a
        href="https://github.com/IsNikhil/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        title="View on GitHub"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </a>
    </div>
  );
}

export default function TwoPanel({ left, right }: TwoPanelProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <>
      {/* Mobile tab bar — fixed below the header */}
      <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex">
        {(["edit", "preview"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
                : "text-gray-500 dark:text-gray-400 border-transparent"
            }`}
          >
            {tab === "edit" ? "Edit" : "Preview"}
          </button>
        ))}
      </div>

      {/* Desktop: side-by-side layout */}
      <div className="hidden md:flex h-screen pt-14 overflow-hidden">
        <div className="w-[420px] flex-shrink-0 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors flex flex-col">
          <div className="flex-1">{left}</div>
          <Footer />
        </div>
        <div className="flex-1 h-full overflow-y-auto bg-gray-100 dark:bg-gray-950 transition-colors">
          {right}
        </div>
      </div>

      {/* Mobile: single panel with tabs */}
      <div
        className="md:hidden flex flex-col overflow-hidden"
        style={{ height: "100dvh", paddingTop: "96px" }}
      >
        {/* Edit panel */}
        <div
          className={`flex-1 overflow-y-auto flex flex-col bg-white dark:bg-gray-900 transition-colors ${
            activeTab === "edit" ? "" : "hidden"
          }`}
        >
          <div className="flex-1">{left}</div>
          <Footer />
        </div>

        {/* Preview panel */}
        <div
          className={`flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950 transition-colors ${
            activeTab === "preview" ? "" : "hidden"
          }`}
        >
          {right}
        </div>
      </div>
    </>
  );
}

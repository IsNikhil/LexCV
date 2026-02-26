"use client";

import { CustomSection } from "@/app/types/resume";
import CollapsibleSection from "./CollapsibleSection";
import AddItemButton from "./AddItemButton";

interface Props {
  items: CustomSection[];
  sectionOrder: string[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Omit<CustomSection, "id">, value: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: "up" | "down") => void;
}

export default function CustomSectionsEditor({ items, sectionOrder, onAdd, onUpdate, onRemove, onMove }: Props) {
  function positionLabel(id: string): string {
    const idx = sectionOrder.indexOf(id);
    const total = sectionOrder.length;
    if (idx === 0) return "first";
    if (idx === total - 1) return "last";
    return `#${idx + 1} of ${total}`;
  }

  return (
    <>
      {items.map((section) => {
        const idx = sectionOrder.indexOf(section.id);
        const canMoveUp = idx > 0;
        const canMoveDown = idx < sectionOrder.length - 1;

        return (
          <CollapsibleSection
            key={section.id}
            title={section.title || "Custom Section"}
            defaultOpen={true}
          >
            <div className="space-y-3">
              {/* Title + delete */}
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 text-sm border border-gray-200 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Section title (e.g. Awards, Publications)"
                  value={section.title}
                  onChange={(e) => onUpdate(section.id, "title", e.target.value)}
                />
                <button
                  onClick={() => onRemove(section.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                  title="Remove section"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Position controls */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-500 flex-1">
                  Position: <span className="font-medium text-gray-600 dark:text-gray-300">{positionLabel(section.id)}</span>
                </span>
                <button
                  onClick={() => onMove(section.id, "up")}
                  disabled={!canMoveUp}
                  title="Move up in resume"
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Up
                </button>
                <button
                  onClick={() => onMove(section.id, "down")}
                  disabled={!canMoveDown}
                  title="Move down in resume"
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Down
                </button>
              </div>

              <textarea
                className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                placeholder="Enter content for this section…"
                rows={5}
                value={section.content}
                onChange={(e) => onUpdate(section.id, "content", e.target.value)}
              />
            </div>
          </CollapsibleSection>
        );
      })}
      <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-3">
        <AddItemButton label="Add Custom Section" onClick={onAdd} />
      </div>
    </>
  );
}

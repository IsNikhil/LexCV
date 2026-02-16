"use client";

import { useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import AddItemButton from "./AddItemButton";
import { SkillCategory } from "@/app/types/resume";

interface Props {
  items: SkillCategory[];
  onAddCategory: () => void;
  onUpdateCategory: (id: string, category: string) => void;
  onAddItem: (id: string, item: string) => void;
  onRemoveItem: (id: string, index: number) => void;
  onRemoveCategory: (id: string) => void;
}

function SkillCategoryRow({ data, onUpdateCategory, onAddItem, onRemoveItem, onRemoveCategory }: {
  data: SkillCategory;
  onUpdateCategory: (category: string) => void;
  onAddItem: (item: string) => void;
  onRemoveItem: (index: number) => void;
  onRemoveCategory: () => void;
}) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onAddItem(input.trim());
      setInput("");
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 mb-2 bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={data.category}
          onChange={(e) => onUpdateCategory(e.target.value)}
          placeholder="e.g. Languages, Frameworks, Tools"
          className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none w-full uppercase tracking-wide"
        />
        <button onClick={onRemoveCategory} className="text-gray-400 hover:text-red-500 text-xs ml-2 flex-shrink-0">✕</button>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {data.items.map((item, i) => (
          <span key={i} className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-0.5 rounded-full">
            {item}
            <button onClick={() => onRemoveItem(i)} className="hover:text-red-500">×</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="w-full border border-dashed border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none focus:border-indigo-400"
      />
    </div>
  );
}

export default function SkillsSection({ items, onAddCategory, onUpdateCategory, onAddItem, onRemoveItem, onRemoveCategory }: Props) {
  return (
    <CollapsibleSection title="Skills">
      {items.map((cat) => (
        <SkillCategoryRow
          key={cat.id}
          data={cat}
          onUpdateCategory={(category) => onUpdateCategory(cat.id, category)}
          onAddItem={(item) => onAddItem(cat.id, item)}
          onRemoveItem={(index) => onRemoveItem(cat.id, index)}
          onRemoveCategory={() => onRemoveCategory(cat.id)}
        />
      ))}
      <AddItemButton label="Add Skill Category" onClick={onAddCategory} />
    </CollapsibleSection>
  );
}

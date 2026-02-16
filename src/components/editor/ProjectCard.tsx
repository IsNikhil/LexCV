"use client";

import { Project } from "@/app/types/resume";

interface Props {
  data: Project;
  onUpdate: (field: keyof Omit<Project, "id" | "bullets">, value: string) => void;
  onUpdateBullet: (index: number, value: string) => void;
  onAddBullet: () => void;
  onRemoveBullet: (index: number) => void;
  onRemove: () => void;
}

const inputCls = "w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500";

export default function ProjectCard({ data, onUpdate, onUpdateBullet, onAddBullet, onRemoveBullet, onRemove }: Props) {
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-3 bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{data.name || "New Project"}</span>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 text-xs">✕ Remove</button>
      </div>
      <div className="space-y-2 mb-2">
        <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Project Name</label><input type="text" value={data.name} onChange={(e) => onUpdate("name", e.target.value)} placeholder="BloodBridge" className={inputCls} /></div>
        <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Technologies</label><input type="text" value={data.technologies} onChange={(e) => onUpdate("technologies", e.target.value)} placeholder="React, TypeScript, Node.js" className={inputCls} /></div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bullet Points</label>
        {data.bullets.map((bullet, i) => (
          <div key={i} className="flex gap-1 mb-1">
            <span className="text-gray-400 mt-2 text-xs">•</span>
            <textarea value={bullet} onChange={(e) => onUpdateBullet(i, e.target.value)} rows={2} placeholder="Describe what you built or achieved..." className="flex-1 border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500" />
            {data.bullets.length > 1 && <button onClick={() => onRemoveBullet(i)} className="text-gray-400 hover:text-red-500 text-xs self-start mt-1">✕</button>}
          </div>
        ))}
        <button onClick={onAddBullet} className="text-xs text-indigo-500 hover:text-indigo-700 mt-1">+ Add bullet</button>
      </div>
    </div>
  );
}

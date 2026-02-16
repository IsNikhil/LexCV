"use client";

import { Experience } from "@/app/types/resume";

interface Props {
  data: Experience;
  onUpdate: (field: keyof Omit<Experience, "id" | "bullets">, value: string) => void;
  onUpdateBullet: (index: number, value: string) => void;
  onAddBullet: () => void;
  onRemoveBullet: (index: number) => void;
  onRemove: () => void;
}

const inputCls = "w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500";

export default function ExperienceCard({ data, onUpdate, onUpdateBullet, onAddBullet, onRemoveBullet, onRemove }: Props) {
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-3 bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{data.company || "New Experience"}</span>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 text-xs">✕ Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Job Title</label><input type="text" value={data.title} onChange={(e) => onUpdate("title", e.target.value)} placeholder="Software Engineer Intern" className={inputCls} /></div>
        <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Company</label><input type="text" value={data.company} onChange={(e) => onUpdate("company", e.target.value)} placeholder="Acme Inc." className={inputCls} /></div>
        <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</label><input type="text" value={data.startDate} onChange={(e) => onUpdate("startDate", e.target.value)} placeholder="Jun 2024" className={inputCls} /></div>
        <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">End Date</label><input type="text" value={data.endDate} onChange={(e) => onUpdate("endDate", e.target.value)} placeholder="Present" className={inputCls} /></div>
        <div className="col-span-2"><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Location</label><input type="text" value={data.location} onChange={(e) => onUpdate("location", e.target.value)} placeholder="San Francisco, CA" className={inputCls} /></div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bullet Points</label>
        {data.bullets.map((bullet, i) => (
          <div key={i} className="flex gap-1 mb-1">
            <span className="text-gray-400 mt-2 text-xs">•</span>
            <textarea value={bullet} onChange={(e) => onUpdateBullet(i, e.target.value)} rows={2} placeholder="Describe an achievement..." className="flex-1 border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500" />
            {data.bullets.length > 1 && <button onClick={() => onRemoveBullet(i)} className="text-gray-400 hover:text-red-500 text-xs self-start mt-1">✕</button>}
          </div>
        ))}
        <button onClick={onAddBullet} className="text-xs text-indigo-500 hover:text-indigo-700 mt-1">+ Add bullet</button>
      </div>
    </div>
  );
}

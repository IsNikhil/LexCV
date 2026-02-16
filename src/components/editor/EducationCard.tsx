"use client";

import { Education } from "@/app/types/resume";

interface Props {
  data: Education;
  onUpdate: (field: keyof Omit<Education, "id">, value: string) => void;
  onRemove: () => void;
}

const inputCls = "w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500";
const labelCls = "block text-xs text-gray-500 dark:text-gray-400 mb-1";

export default function EducationCard({ data, onUpdate, onRemove }: Props) {
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-3 bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{data.institution || "New Education"}</span>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 text-xs">✕ Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2"><label className={labelCls}>Institution</label><input type="text" value={data.institution} onChange={(e) => onUpdate("institution", e.target.value)} placeholder="University of California, Berkeley" className={inputCls} /></div>
        <div><label className={labelCls}>Degree</label><input type="text" value={data.degree} onChange={(e) => onUpdate("degree", e.target.value)} placeholder="Bachelor of Science" className={inputCls} /></div>
        <div><label className={labelCls}>Field of Study</label><input type="text" value={data.field} onChange={(e) => onUpdate("field", e.target.value)} placeholder="Computer Science" className={inputCls} /></div>
        <div><label className={labelCls}>Start Date</label><input type="text" value={data.startDate} onChange={(e) => onUpdate("startDate", e.target.value)} placeholder="Aug 2022" className={inputCls} /></div>
        <div><label className={labelCls}>End Date</label><input type="text" value={data.endDate} onChange={(e) => onUpdate("endDate", e.target.value)} placeholder="May 2026" className={inputCls} /></div>
        <div><label className={labelCls}>GPA (optional)</label><input type="text" value={data.gpa} onChange={(e) => onUpdate("gpa", e.target.value)} placeholder="3.8" className={inputCls} /></div>
        <div><label className={labelCls}>Location</label><input type="text" value={data.location} onChange={(e) => onUpdate("location", e.target.value)} placeholder="Berkeley, CA" className={inputCls} /></div>
      </div>
    </div>
  );
}

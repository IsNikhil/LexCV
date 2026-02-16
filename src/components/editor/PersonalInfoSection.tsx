"use client";

import CollapsibleSection from "./CollapsibleSection";
import { PersonalInfo } from "@/app/types/resume";

interface Props {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

const fields: { key: keyof PersonalInfo; label: string; placeholder: string }[] = [
  { key: "name", label: "Full Name", placeholder: "Nikhil Shah" },
  { key: "email", label: "Email", placeholder: "you@email.com" },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000" },
  { key: "location", label: "Location", placeholder: "City, State" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname" },
  { key: "github", label: "GitHub", placeholder: "github.com/yourusername" },
  { key: "website", label: "Website", placeholder: "yourportfolio.com (optional)" },
];

export default function PersonalInfoSection({ data, onChange }: Props) {
  return (
    <CollapsibleSection title="Personal Info">
      <div className="space-y-3">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
            <input
              type="text"
              value={data[key]}
              placeholder={placeholder}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

"use client";

import CollapsibleSection from "./CollapsibleSection";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SummarySection({ value, onChange }: Props) {
  return (
    <CollapsibleSection title="Summary">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Write a brief professional summary..."
        className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 focus:border-transparent"
      />
    </CollapsibleSection>
  );
}

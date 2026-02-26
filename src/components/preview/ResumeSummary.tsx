interface Props {
  summary: string;
}

export default function ResumeSummary({ summary }: Props) {
  if (!summary.trim()) return null;
  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-800 pb-1 mb-1.5">
        Summary
      </h2>
      <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
}

interface AddItemButtonProps {
  label: string;
  onClick: () => void;
}

export default function AddItemButton({ label, onClick }: AddItemButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
    >
      + {label}
    </button>
  );
}

"use client";

interface HeaderProps {
  onDownload: () => void;
  isDownloading: boolean;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Header({ onDownload, isDownloading, isDark, onToggleDark }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-indigo-600 tracking-tight">Lex</span>
        <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">CV</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Download button */}
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>
    </header>
  );
}

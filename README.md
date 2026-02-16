# LexCV

A modern, browser-based resume builder with a live two-panel editor and one-click PDF export. Built by [Nikhil Shah](https://nikhilshah.com.np).

![LexCV Preview](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

---

## Features

- **Live preview** — Edit on the left, see your A4 resume update in real time on the right
- **PDF export** — Download a pixel-perfect PDF with one click
- **Dark mode** — Full light/dark theme toggle
- **Sections** — Personal Info, Summary, Experience, Education, Projects, Skills
- **Tag-based skills** — Type and press Enter to add skills per category
- **Bullet point editor** — Add/remove bullet points for each experience and project entry

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| PDF Export | html2canvas + jsPDF |
| State | React `useState` + custom hook |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/IsNikhil/LexCV.git
cd LexCV

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── data/sampleData.ts       # Pre-filled resume data
│   ├── hooks/useResumeState.ts  # All state + updater logic
│   ├── lib/downloadPdf.ts       # PDF export (html2canvas + jsPDF)
│   ├── types/resume.ts          # TypeScript interfaces
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── layout/                  # Header, TwoPanel
    ├── editor/                  # Form sections (Experience, Education, etc.)
    └── preview/                 # A4 resume render components
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT © [Nikhil Shah](https://github.com/IsNikhil)

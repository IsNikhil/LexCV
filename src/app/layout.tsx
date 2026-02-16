import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LexCV – Build Your Resume",
  description: "Create industry-standard resumes easily with LexCV",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}

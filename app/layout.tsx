import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piscerya — AI Workspace Platform",
  description: "AI workspace untuk mengelola proyek, tugas, dan pengetahuan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}

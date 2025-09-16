import FloatingHomeButton from "@/app/(legal)/_components/FloatingHomeButton";
import Footer from "@/app/_components/layout/Footer";
import { ThemeModeToggle } from "@/components/Theme/theme-mode-toggle";
import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-white via-neutral-100 to-white text-gray-800 dark:from-black dark:via-gray-900 dark:to-black dark:text-white">
      <main className="flex flex-1 flex-col items-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-10 rounded-3xl border border-gray-300 bg-white/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10 dark:border-gray-700 dark:bg-black/40">
          {children}
        </div>
      </main>
      <Footer />
      <FloatingHomeButton />
      <div className="fixed top-4 right-4 z-50 max-sm:top-2">
        <ThemeModeToggle />
      </div>
    </div>
  );
}

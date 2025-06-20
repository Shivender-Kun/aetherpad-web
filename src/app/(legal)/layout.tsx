import { ThemeModeToggle } from "@/components/Theme/theme-mode-toggle";
import FloatingHomeButton from "@/components/floatingHomeBtn";
import Footer from "@/components/layout/footer";
import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-white via-neutral-100 to-white dark:from-black dark:via-gray-900 dark:to-black text-gray-800 dark:text-white">
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-4xl rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-black/40 backdrop-blur-xl shadow-2xl p-6 sm:p-10 space-y-10">
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

// src/app/page.tsx

import { Button } from "@/components/ui/button"; // Assuming this is your Shadcn UI button
import {
  NotebookPenIcon,
  // LockIcon,
  // TagIcon,
  SunMoonIcon,
  // SmartphoneIcon,
  SparklesIcon,
  // SearchIcon,
  ArchiveIcon,
  Trash2Icon,
} from "lucide-react";
import { redirect } from "next/navigation"; // For server-side redirect
import Link from "next/link";
import Image from "next/image"; // For optimized images
import isUserAuthenticated from "@/lib/isUserAuthenticated"; // Your authentication check

// --- Configuration Constants ---
// These constants are kept here for the page content,
// but the Metadata is now managed in the root layout.
const APP_NAME = "Personal Notes";
// const APP_TAGLINE_HERO = "Your Ideas, Perfectly Captured.";
const APP_SUB_TAGLINE_HERO =
  "Effortless, secure, and beautifully organized note-taking for everyone.";

// --- HomePage Component ---
export default async function HomePage() {
  // Check if user is authenticated and redirect if so
  const userData = await isUserAuthenticated();
  if (userData) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center pt-16 pb-8 sm:pt-20 sm:pb-12 px-4 relative overflow-hidden">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center z-10">
          <div className="flex flex-col items-center gap-6 max-w-2xl w-full text-center">
            {/* App Icon & Title */}
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 p-3 sm:p-4 shadow-lg animate-fade-in-down">
                <NotebookPenIcon size={48} className="text-white" />
              </span>
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white tracking-tight drop-shadow-lg animate-fade-in-down">
                {APP_NAME}
              </h1>
            </div>
            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium animate-fade-in-down animation-delay-200">
              {APP_SUB_TAGLINE_HERO}
            </p>
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in-down animation-delay-400">
              <Link href="/login">
                <Button className="w-full sm:w-auto text-base sm:text-lg px-8 py-3 sm:py-6 rounded-xl shadow-md bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Start Writing Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Image / Mockup Section */}
        {/* Using a desktop screenshot as the main hero image */}
        <div className="relative w-full max-w-4xl mx-auto mt-10 md:mt-16 z-0 animate-fade-in-up animation-delay-600">
          <Image
            src="/screenshots/desktop/dark_add_note.webp" // Your chosen desktop screenshot
            alt={`${APP_NAME} app interface on desktop - Add Note Page`}
            width={1920} // Match your screenshot's width
            height={1080} // Match your screenshot's height
            priority={true} // High priority for LCP (Largest Contentful Paint)
            className="w-full h-auto rounded-lg shadow-2xl border-4 border-white dark:border-gray-700 rotate-2 hover:rotate-0 transition-transform duration-500 transform-gpu"
          />
          {/* Optional subtle glow effect */}
          <div className="absolute inset-0 bg-indigo-500 rounded-lg filter blur-2xl opacity-10 pointer-events-none z-[-1]"></div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="w-full max-w-6xl mx-auto px-4 py-12 sm:py-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-t-3xl shadow-xl border-t border-gray-200 dark:border-gray-800 z-20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 text-gray-900 dark:text-white">
          Features Designed for Your Productivity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {/* <FeatureCard
            icon={<LockIcon size={28} className="text-indigo-500" />}
            title="Privacy First"
            description="Your notes are encrypted and never shared or sold. Your thoughts, truly private."
          />
          <FeatureCard
            icon={<TagIcon size={28} className="text-blue-500" />}
            title="Smart Labels & Tags"
            description="Effortlessly organize with custom labels to categorize and find notes in a flash."
          /> */}
          <FeatureCard
            icon={<SunMoonIcon size={28} className="text-yellow-500" />}
            title="Adaptive Themes"
            description="Switch between beautiful light and dark modes for comfortable viewing, day or night."
          />
          {/* <FeatureCard
            icon={<SmartphoneIcon size={28} className="text-green-500" />}
            title="PWA Ready"
            description="Install the app directly to your device for offline access and a native-like experience."
          />
          <FeatureCard
            icon={<SearchIcon size={28} className="text-red-500" />}
            title="Powerful Search"
            description="Find any note instantly with intelligent search across all your content, including archived notes."
          /> */}
          <FeatureCard
            icon={<ArchiveIcon size={28} className="text-orange-500" />}
            title="Seamless Archiving"
            description="Declutter your main view by archiving old or completed notes, keeping them safe but out of sight."
          />
          <FeatureCard
            icon={<Trash2Icon size={28} className="text-red-600" />}
            title="Recovery Bin"
            description="Deleted a note by mistake? Recover it from the trash bin before it's permanently gone."
          />
          <FeatureCard
            icon={<SparklesIcon size={28} className="text-purple-500" />}
            title="Always Evolving"
            description="We're constantly adding new features and improvements based on user feedback."
          />
        </div>
      </section>

      {/* Why Choose Us? Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Why Choose {APP_NAME}?
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          In a world full of distractions, {APP_NAME} cuts through the noise. We
          focus on a **beautifully simple, highly functional, and completely
          private** note-taking experience, so you can focus on what truly
          matters: your ideas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
              Uncluttered Interface
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Write without distractions. Our minimalist design keeps you
              focused.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
              Reliable Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fast, fluid, and dependable on any device, ensuring your notes are
              always there.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
              User-Centric Design
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Every feature is crafted with your productivity and ease-of-use in
              mind.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="w-full flex flex-col items-center pb-8 sm:pb-12 px-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/80 dark:bg-gray-900/80 px-6 py-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-lg animate-fade-in-up animation-delay-800">
          <SparklesIcon size={22} className="text-indigo-500" />
          <span className="font-medium text-gray-800 dark:text-gray-200 text-center text-sm sm:text-base">
            Ready to boost your productivity?{" "}
            <Link
              href="/register"
              className="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
            >
              Sign up now
            </Link>{" "}
            and start writing!
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 sm:py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 text-sm sm:text-base">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>
            Made with <span className="text-red-500">❤️</span> by Shivender-Kun
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- FeatureCard Component ---
// This component is reusable for your feature grid.
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="mb-2 sm:mb-4">{icon}</div>
      <h3 className="font-semibold text-base sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white whitespace-nowrap">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}

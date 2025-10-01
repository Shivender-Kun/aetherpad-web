import Footer from "@/app/_components/layout/Footer";
import isUserAuthenticated from "@/lib/utils/isUserAuthenticated";
import { redirect } from "next/navigation";
import Features from "./_components/landing/Features";
import Hero from "./_components/landing/Hero";
import SignupShortcut from "./_components/landing/SignupShortcut";
import ThemeController from "./_components/landing/ThemeController";
import Why from "./_components/landing/Why";

export default async function LandingPage() {
  const userData = await isUserAuthenticated();
  if (userData) redirect("/home");

  return (
    <div className="flex min-h-screen flex-col transition-colors">
      <main className="relative flex flex-grow flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-8 sm:pt-20 sm:pb-12">
        <Hero />
        <Features />
        <Why />
        <SignupShortcut />
      </main>
      <Footer />
      <ThemeController />
    </div>
  );
}

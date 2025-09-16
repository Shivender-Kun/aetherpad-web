import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignupShortcut = () => {
  return (
    <section className="w-full flex flex-col items-center pb-8 sm:pb-12 px-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-indigo-800/20 px-6 py-4 rounded-xl shadow-lg border border-border w-full max-w-lg animate-fade-in-up animation-delay-800">
        <SparklesIcon size={22} className="text-indigo-400" />
        <span className="font-medium text-center text-sm sm:text-base">
          Ready to boost your productivity?{" "}
          <Link
            href="/signup"
            className="underline text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign up now
          </Link>{" "}
          and start writing!
        </span>
      </div>
    </section>
  );
};

export default SignupShortcut;

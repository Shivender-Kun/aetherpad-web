import isUserAuthenticated from "@/lib/isUserAuthenticated";
import { Home } from "lucide-react";
import Link from "next/link";

const FloatingHomeButton = async () => {
  const url = (await isUserAuthenticated()) ? "/home" : "/";

  return (
    <Link
      href={url}
      className="group fixed bottom-11 right-6 max-sm:bottom-13 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-white/90 dark:bg-gray-900/90 border border-gray-300 dark:border-gray-700 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-indigo-100 dark:hover:bg-indigo-950"
      aria-label="Home"
    >
      <Home className="h-6 w-6 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
    </Link>
  );
};

export default FloatingHomeButton;

import { NotebookPenIcon } from "lucide-react";
import Link from "next/link";

const AppLogoBig = () => {
  return (
    <Link href="/">
      <div
        className="flex gap-4 items-center 
                  bg-white/70 dark:bg-black/50 
                  backdrop-blur-md 
                  border border-gray-300 dark:border-gray-700 
                  rounded-2xl p-4 shadow-md w-fit 
                  transition hover:shadow-lg"
      >
        <NotebookPenIcon className="text-gray-800 dark:text-white" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          AetherPad
        </h2>
      </div>
    </Link>
  );
};
export default AppLogoBig;

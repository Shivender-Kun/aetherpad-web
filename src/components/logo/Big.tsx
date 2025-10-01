import { NotebookPenIcon } from "lucide-react";
import Link from "next/link";

const AppLogoBig = () => {
  return (
    <Link href="/">
      <div className="flex w-fit items-center gap-4 rounded-2xl border bg-white/70 p-4 shadow-md transition hover:shadow-lg dark:bg-black/50">
        <NotebookPenIcon className="text-gray-800 dark:text-white" />
        <h2 className="text-lg font-semibold">AetherPad</h2>
      </div>
    </Link>
  );
};
export default AppLogoBig;

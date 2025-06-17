import { NotebookPenIcon } from "lucide-react";
import Link from "next/link";

const AppLogoBig = () => {
  return (
    <Link href="/">
      <div className="flex gap-4 items-center border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-4 w-fit">
        <NotebookPenIcon />
        <h2 className="text-lg font-medium">Personal Notes</h2>
      </div>
    </Link>
  );
};
export default AppLogoBig;

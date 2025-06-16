import isUserAuthenticated from "@/lib/isUserAuthenticated";
import { NotebookPenIcon } from "lucide-react";
import Link from "next/link";

const FloatingHomeButton = async () => {
  const url = (await isUserAuthenticated()) ? "/home" : "/login";

  return (
    <Link
      href={url}
      className="p-2 fixed bottom-4 right-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700"
    >
      <NotebookPenIcon />
    </Link>
  );
};

export default FloatingHomeButton;

import { Notebook } from "lucide-react";

const AppLogoBig = () => {
  return (
    <div className="flex gap-4 items-center border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-4 w-fit">
      <Notebook />
      <h2 className="text-lg font-medium">Personal Notes</h2>
    </div>
  );
};
export default AppLogoBig;

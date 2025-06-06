import { Suspense } from "react";
import LabelsList from "./_list";
import AddLabel from "./_add";

const Labels = () => {
  return (
    <main className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 justify-between px-4">
        <h2 className="text-xl">Labels</h2> <AddLabel />
      </div>
      <div className="px-4 overflow-auto">
        <Suspense fallback={<h3>Loading...</h3>}>
          <LabelsList />
        </Suspense>
      </div>
    </main>
  );
};

export default Labels;

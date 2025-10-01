import { APP } from "@/constants/frontend";

const Why = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8">
        Why Choose {APP.NAME}?
      </h2>
      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
        In a world full of distractions, {APP.NAME} cuts through the noise. We
        offer a{" "}
        <strong className="text-indigo-500 dark:text-indigo-400">
          beautifully simple, powerful, and private
        </strong>{" "}
        note-taking experience—so you can focus on what matters most: your
        ideas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-muted p-6 rounded-xl shadow-xl border border-border">
          <h3 className="font-semibold text-xl mb-2">Uncluttered Interface</h3>
          <p className="text-muted-foreground">
            Stay focused with a minimalist, distraction-free workspace.
          </p>
        </div>
        <div className="bg-muted p-6 rounded-xl shadow-xl border border-border">
          <h3 className="font-semibold text-xl mb-2">Reliable Performance</h3>
          <p className="text-muted-foreground">
            Built for speed and stability across all your devices.
          </p>
        </div>
        <div className="bg-muted p-6 rounded-xl shadow-xl border border-border">
          <h3 className="font-semibold text-xl mb-2">User-Centric Design</h3>
          <p className="text-muted-foreground">
            Every detail is thoughtfully crafted to enhance your workflow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Why;

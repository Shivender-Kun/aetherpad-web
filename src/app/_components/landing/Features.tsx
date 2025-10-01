import {
  ArchiveIcon,
  LockIcon,
  SearchIcon,
  SparklesIcon,
  SunMoonIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";

const Features = () => {
  return (
    <section
      id="features"
      className="bg-card/30 z-20 mx-auto w-full max-w-6xl rounded-3xl border px-4 py-12 shadow-xl sm:py-20"
    >
      <h2 className="mb-10 text-center text-3xl font-bold sm:mb-16 sm:text-4xl">
        Features Designed for Your Productivity
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        <FeatureCard
          icon={<SunMoonIcon size={28} className="text-yellow-400" />}
          title="Adaptive Themes"
          description="Enjoy a seamless transition between light and dark modes for optimal comfort."
        />
        <FeatureCard
          icon={<LockIcon size={28} className="text-indigo-500" />}
          title="Privacy First"
          description="Your notes stay private. We don’t sell data—ever."
        />
        <FeatureCard
          icon={<TagIcon size={28} className="text-blue-500" />}
          title="Smart Labels"
          description="Categorize your notes for faster search and smarter organization."
        />
        <FeatureCard
          icon={<ArchiveIcon size={28} className="text-orange-400" />}
          title="Seamless Archiving"
          description="Move completed notes out of the way without losing access to them."
        />
        <FeatureCard
          icon={<Trash2Icon size={28} className="text-red-500" />}
          title="Recovery Bin"
          description="Recover binned notes before they’re gone for good with our safety net."
        />
        <FeatureCard
          icon={<SearchIcon size={28} className="text-red-500" />}
          title="Powerful Search"
          description="Find anything, instantly—including archived and labeled notes."
        />
        <FeatureCard
          icon={<SparklesIcon size={28} className="text-purple-400" />}
          title="Always Evolving"
          description="We continuously update and refine based on user input and modern trends."
        />
      </div>
    </section>
  );
};

export default Features;

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background border-border flex transform flex-col items-center rounded-2xl border p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="mb-3">{icon}</div>
      <h3 className="text-foreground mb-2 text-base font-semibold sm:text-xl">
        {title}
      </h3>
      <p className="text-muted-foreground text-center text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}

{
  /* <FeatureCard
  icon={<SmartphoneIcon size={28} className="text-green-500" />}
  title="PWA Ready"
  description="Install directly to your device and work offline, anytime."
/>; */
}

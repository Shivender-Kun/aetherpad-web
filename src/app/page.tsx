import {
  NotebookPenIcon,
  SunMoonIcon,
  SparklesIcon,
  ArchiveIcon,
  Trash2Icon,
  // LockIcon,
  // TagIcon,
  // SmartphoneIcon,
  // SearchIcon,
} from "lucide-react";
import { ThemeModeToggle } from "@/components/Theme/theme-mode-toggle";
import isUserAuthenticated from "@/lib/isUserAuthenticated";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { APP } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const userData = await isUserAuthenticated();
  if (userData) redirect("/home");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <main className="flex-grow flex flex-col items-center justify-center pt-16 pb-8 sm:pt-20 sm:pb-12 px-4 relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500 opacity-20 blur-3xl z-[-1]" />

        <section className="w-full flex flex-col items-center justify-center z-10">
          <div className="flex flex-col items-center gap-6 max-w-2xl w-full text-center">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-background p-3 sm:p-4 shadow-lg animate-fade-in-down border border-border">
                <NotebookPenIcon size={48} />
              </span>
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight drop-shadow-lg animate-fade-in-down">
                {APP.NAME}
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium animate-fade-in-down animation-delay-200">
              {APP.SUB_TAGLINE_HERO}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in-down animation-delay-400">
              <Link href="/login">
                <Button className="w-full sm:w-auto text-base sm:text-lg px-8 py-3 sm:py-6 rounded-xl shadow-lg">
                  Start Writing Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="relative w-full max-w-4xl mx-auto mt-10 md:mt-16 z-0 animate-fade-in-up animation-delay-600">
          <Image
            src="/screenshots/desktop/dark_add_note.webp"
            alt={`${APP.NAME} interface on desktop – Add Note Page`}
            width={1920}
            height={1080}
            priority
            className="w-full h-auto rounded-lg shadow-2xl border-4 border-border rotate-2 hover:rotate-0 transition-transform duration-500 transform-gpu"
          />
        </div>
      </main>

      <section
        id="features"
        className="w-full max-w-6xl mx-auto px-4 py-12 sm:py-20 bg-muted/50 backdrop-blur-md rounded-t-3xl shadow-xl border-t border-border z-20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">
          Features Designed for Your Productivity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <FeatureCard
            icon={<SunMoonIcon size={28} className="text-yellow-400" />}
            title="Adaptive Themes"
            description="Enjoy a seamless transition between light and dark modes for optimal comfort."
          />
          <FeatureCard
            icon={<ArchiveIcon size={28} className="text-orange-400" />}
            title="Seamless Archiving"
            description="Move completed notes out of the way without losing access to them."
          />
          <FeatureCard
            icon={<Trash2Icon size={28} className="text-red-500" />}
            title="Recovery Bin"
            description="Recover deleted notes before they’re gone for good with our safety net."
          />
          <FeatureCard
            icon={<SparklesIcon size={28} className="text-purple-400" />}
            title="Always Evolving"
            description="We continuously update and refine based on user input and modern trends."
          />
        </div>
      </section>

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
            <h3 className="font-semibold text-xl mb-2">
              Uncluttered Interface
            </h3>
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

      <section className="w-full flex flex-col items-center pb-8 sm:pb-12 px-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-indigo-800/20 px-6 py-4 rounded-xl shadow-lg border border-border w-full max-w-lg animate-fade-in-up animation-delay-800">
          <SparklesIcon size={22} className="text-indigo-400" />
          <span className="font-medium text-center text-sm sm:text-base">
            Ready to boost your productivity?{" "}
            <Link
              href="/register"
              className="underline text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign up now
            </Link>{" "}
            and start writing!
          </span>
        </div>
      </section>

      <Footer />

      <div className="fixed top-4 right-4 z-50">
        <ThemeModeToggle />
      </div>
    </div>
  );
}

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
    <div className="flex flex-col items-center bg-muted border border-border rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-base sm:text-xl mb-2 text-foreground">
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
            icon={<LockIcon size={28} className="text-indigo-500" />}
            title="Privacy First"
            description="Your notes stay private. We don’t sell data—ever."
          />
          <FeatureCard
            icon={<TagIcon size={28} className="text-blue-500" />}
            title="Smart Labels & Tags"
            description="Categorize your notes for faster search and smarter organization."
          />
          <FeatureCard
            icon={<SmartphoneIcon size={28} className="text-green-500" />}
            title="PWA Ready"
            description="Install directly to your device and work offline, anytime."
          />
          <FeatureCard
            icon={<SearchIcon size={28} className="text-red-500" />}
            title="Powerful Search"
            description="Find anything, instantly—including archived and labeled notes."
          /> */
}

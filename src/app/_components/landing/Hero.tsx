import { Button } from "@/components/ui/button";
import { APP } from "@/constants/frontend";
import { NotebookPenIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="z-10 flex w-full flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-4">
          <span className="animate-fade-in-down p-3 shadow-lg sm:p-4">
            <NotebookPenIcon size={48} />
          </span>
          <h1 className="animate-fade-in-down text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl">
            {APP.NAME}
          </h1>
        </div>
        <p className="text-muted-foreground animate-fade-in-down animation-delay-200 text-lg font-medium sm:text-xl md:text-2xl">
          {APP.SUB_TAGLINE_HERO}
        </p>
        <div className="animate-fade-in-down animation-delay-400 mt-6 flex flex-col gap-4 sm:flex-row">
          <Link href="/signin">
            <Button className="w-full cursor-pointer px-8 py-3 text-base shadow-lg sm:w-auto sm:py-6 sm:text-lg">
              Start Writing Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

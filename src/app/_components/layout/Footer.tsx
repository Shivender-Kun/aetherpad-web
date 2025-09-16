import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-border bg-background text-muted-foreground w-full border-t text-sm transition-colors sm:text-base">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-2 px-4 py-4 sm:py-6 md:flex-row">
        <Link
          href="https://www.shivender.pro"
          target="_blank"
          className="flex items-center gap-2"
        >
          Made with <Heart className="" fill="red" color="red" />
          by Shiv
        </Link>

        <div className="flex gap-4">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

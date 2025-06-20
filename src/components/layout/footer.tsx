import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background text-muted-foreground text-sm sm:text-base transition-colors">
      <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p>
          Made with <span className="text-red-500">❤️</span> by Shivender-Kun
        </p>
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

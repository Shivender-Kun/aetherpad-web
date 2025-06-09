import { ThemeProvider } from "@/components/Theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Personal Notes",
  description: "Personal notes app for private users.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Personal Notes",
  //   description: "Personal notes app for private users.",
  //   images: [
  //     {
  //       url: "/apple-icon.png",
  //       alt: "Personal Notes",
  //     },
  //   ],
  // },
  // openGraph: {
  //   title: "Personal Notes",
  //   description: "Personal notes app for private users.",
  //   url: "https://personal-notes.vercel.app/",
  //   siteName: "Personal Notes",
  //   images: [
  //     {
  //       url: "/apple-icon.png",
  //       alt: "Personal Notes",
  //     },
  //   ],
  // },
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

// ! Cookies Policy Handler
{
  /* <Script src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"></Script>
<Script
  id="usercentrics-cmp"
  src="https://web.cmp.usercentrics.eu/ui/loader.js"
  data-settings-id="7rGMwDzT_b8aLf"
  async
></Script> */
}

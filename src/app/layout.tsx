import { ThemeProvider } from "@/components/Theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { APP } from "@/constants";
import "@/styles/globals.css";

export const metadata: Metadata = {
  // Primary SEO & Browser Tab Info
  title: `${APP.NAME} - ${APP.TAGLINE_HERO}`, // Combines name and main benefit
  description: APP.DESCRIPTION_SEO, // Detailed, keyword-rich description
  applicationName: APP.NAME, // Used by some browsers/OS for install prompts

  // Icons for various platforms and resolutions
  icons: {
    icon: [
      // Use a high-res maskable icon for the primary PWA icon
      {
        url: "/icons/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { url: "/favicon.ico", type: "image/x-icon" }, // Favicon for older browsers/contexts
    ],
    // For shortcut, use a commonly supported size that you have
    shortcut: "/icons/icon_192.png",
    // Apple Touch Icon should ideally be 180x180
    apple: "/icons/icon_180.png",
    other: [
      // Apple Web App specific icons (if needed, otherwise manifest covers PWA)
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/icon_180.png",
        sizes: "180x180",
      },
      // Mask icon for Safari pinned tabs
      { rel: "mask-icon", url: "/icons/maskable_icon.png", color: "#4f46e5" }, // Using the 1024x1024 maskable icon for mask-icon
    ],
  },
  // Link to your PWA manifest file
  manifest: "/manifest.webmanifest", // Correct path as served by Next.js from `app/manifest.ts`

  // PWA specific settings for Apple devices
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent", // Or 'default', 'black'
    title: APP.NAME, // Name to appear on the home screen
    // startupImage: [], // Keep empty unless you have specific iOS splash screen images
  },

  // Twitter Card Meta Tags (for sharing on Twitter)
  twitter: {
    card: "summary_large_image", // Best for showing an image with title/description
    title: `${APP.NAME} - ${APP.TAGLINE_HERO}`,
    description: APP.DESCRIPTION_SEO,
    // creator: "@yourtwitterhandle", // Your Twitter handle (replace if applicable)
    images: {
      // For social sharing images, it's best to use a dedicated wide screenshot.
      // Your desktop screenshots are 1920x1080 (wide), which works well here.
      url: `${APP.URL}screenshots/desktop/dark_add_note.webp`, // Using one of your desktop screenshots
      alt: `${APP.NAME} app screenshot`,
      width: 1920,
      height: 1080,
    },
  },

  // Open Graph Meta Tags (for sharing on Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: `${APP.NAME} - ${APP.TAGLINE_HERO}`,
    description: APP.DESCRIPTION_SEO,
    url: APP.URL, // Canonical URL for the page
    siteName: APP.NAME,
    images: {
      // Using a desktop screenshot for the Open Graph image
      url: `${APP.URL}screenshots/desktop/dark_add_note.webp`,
      alt: `${APP.NAME} app screenshot`,
      width: 1920, // Match your screenshot's width
      height: 1080, // Match your screenshot's height
      type: "image/webp", // Correct type for your .webp images
    },
    type: "website", // Or 'article', 'profile', etc.
    locale: "en_US", // Or your primary locale
  },

  verification: { google: "XP0fIXIKn6GNwkOdOKq-ALLoik_6M9VhZwvEUyUtf1M" },

  // Keywords for search engines
  keywords: [
    "notes app",
    "AetherPad",
    "secure notes",
    "note-taking",
    "productivity app",
    "private notes",
    "PWA notes",
  ],

  // Author and Publisher
  authors: [{ name: "Shivender Kumar", url: "https://www.shivender.pro" }],
  creator: "Shivender Kumar",
  publisher: "Shivender Kumar",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4f46e5", // Your primary brand color
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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

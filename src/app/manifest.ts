import { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: "Personal Notes - Your Ideas, Perfectly Captured.",
    short_name: "Personal Notes",
    description:
      "Effortless, secure, and beautifully organized note-taking for everyone. Capture, organize, and secure your thoughts with Personal Notes.",

    display: "standalone",
    display_override: [
      "window-controls-overlay",
      "standalone",
      "fullscreen",
      "minimal-ui",
    ],
    theme_color: "#4f46e5", // Tailwind indigo-600
    background_color: "#ffffff", // White background
    id: "/",
    start_url: "/",
    icons: [
      {
        // Favicon for browsers
        src: "/favicon.ico",
        sizes: "any", // Use 'any' for .ico files as size isn't fixed
        type: "image/x-icon",
      },
      // Maskable Icons (primary for PWA install prompts and adaptive icons)
      {
        src: "/icons/maskable_icon_x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon_x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon_x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon_x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon_x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon_x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable_icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable",
      },
      // Regular Icons (fallback for non-maskable compatible systems)
      { src: "/icons/icon_128.png", sizes: "128x128", type: "image/png" },
      { src: "/icons/icon_144.png", sizes: "144x144", type: "image/png" },
      { src: "/icons/icon_192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon_384.png", sizes: "384x384", type: "image/png" },
      { src: "/icons/icon_512.png", sizes: "512x512", type: "image/png" },
    ],

    screenshots: [
      {
        form_factor: "wide",
        label: "Add Note Page - Dark Mode",
        platform: "windows",
        src: "/screenshots/desktop/dark_add_note.webp",
        sizes: "1920x1080",
        type: "image/webp", // Ensure correct type
      },
      {
        form_factor: "wide",
        label: "Profile Page - Dark Mode",
        platform: "windows",
        src: "/screenshots/desktop/dark_profile.webp",
        sizes: "1920x1080",
        type: "image/webp",
      },
      {
        form_factor: "wide",
        label: "Notes Others Page - Dark Mode",
        platform: "windows",
        src: "/screenshots/desktop/dark_notes_others.webp",
        sizes: "1920x1080",
        type: "image/webp",
      },
      {
        form_factor: "wide",
        label: "Archived Page - Light Mode",
        platform: "windows",
        src: "/screenshots/desktop/light_archived.webp",
        sizes: "1920x1080",
        type: "image/webp",
      },
      {
        form_factor: "wide",
        label: "Labels Page - Light Mode",
        platform: "windows",
        src: "/screenshots/desktop/light_labels.webp",
        sizes: "1920x1080",
        type: "image/webp",
      },
      {
        form_factor: "wide",
        label: "Notes Pinned Page - Light Mode",
        platform: "windows",
        src: "/screenshots/desktop/light_notes_pinned.webp",
        sizes: "1920x1080",
        type: "image/webp",
      },
      {
        form_factor: "wide",
        label: "Trash Page - Light Mode",
        platform: "windows",
        src: "/screenshots/desktop/light_trash.webp",
        sizes: "1920x1080",
        type: "image/webp",
      },
      {
        form_factor: "narrow",
        label: "Add Note Page - Dark Mode",
        platform: "android",
        src: "/screenshots/mobile/dark_add_note.webp",
        sizes: "1081x2146",
        type: "image/webp",
      },
      {
        form_factor: "narrow",
        label: "Notes Others Page - Dark Mode",
        platform: "android",
        src: "/screenshots/mobile/dark_notes_others.webp",
        sizes: "1081x2146",
        type: "image/webp",
      },
      {
        form_factor: "narrow",
        label: "Profile Page - Light Mode",
        platform: "android",
        src: "/screenshots/mobile/light_profile.webp",
        sizes: "1081x2146",
        type: "image/webp",
      },
      {
        form_factor: "narrow",
        label: "Archived Page - Dark Mode",
        platform: "android",
        src: "/screenshots/mobile/dark_archived.webp",
        sizes: "1081x2146",
        type: "image/webp",
      },
      {
        form_factor: "narrow",
        label: "Labels Page - Dark Mode",
        platform: "android",
        src: "/screenshots/mobile/dark_labels.webp",
        sizes: "1081x2146",
        type: "image/webp",
      },
    ],
    shortcuts: [
      {
        name: "View Notes",
        short_name: "Notes",
        description: "Quickly view your saved notes",
        url: "/home",
        // Assuming you'll choose one of your existing icons or create a specific one
        icons: [{ src: "/icons/icon_128.png", sizes: "128x128" }],
      },
      {
        name: "View Archives",
        short_name: "Archives",
        description: "Browse your archived notes",
        url: "/archives",
        icons: [{ src: "/icons/icon_128.png", sizes: "128x128" }],
      },
      {
        name: "All Labels",
        short_name: "Labels",
        description: "View and manage your note labels",
        url: "/labels",
        icons: [{ src: "/icons/icon_128.png", sizes: "128x128" }],
      },
    ],
  };
};

export default manifest;

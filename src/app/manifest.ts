import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Personal Notes",
    short_name: "Personal Notes",
    categories: ["notes", "personal notes", "private notes"],
    description: "Personal notes app for private users.",
    display: "standalone",
    display_override: [
      "window-controls-overlay",
      "standalone",
      "fullscreen",
      "minimal-ui",
    ],
    theme_color: "#000",
    background_color: "#fff",
    id: "/",
    start_url: "/",
    icons: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/personal-notes-47a71.firebasestorage.app/o/assets%2Flogo_192x192.png?alt=media&token=1bae72a0-760b-401e-83e3-9a53353bb2c7",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://firebasestorage.googleapis.com/v0/b/personal-notes-47a71.firebasestorage.app/o/assets%2Flogo_512x512.png?alt=media&token=a9cf6d26-dff2-41e0-9b58-bee9fbf13556",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

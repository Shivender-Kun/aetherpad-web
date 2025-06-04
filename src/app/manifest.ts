import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Personal Notes",
    short_name: "Personal Notes",
    categories: ["notes", "personal notes"],
    description: "Personal notes app for private users.",
    display: "standalone",
    theme_color: "#000",
    background_color: "#fff",
    id: "/",
    start_url: "/",
    icons: [
      {
        src: "/icon5.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon6.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

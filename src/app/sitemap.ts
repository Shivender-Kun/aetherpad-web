import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aetherpad.shivender.pro",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    {
      url: "https://aetherpad.shivender.pro/about",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://aetherpad.shivender.pro/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://aetherpad.shivender.pro/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://aetherpad.shivender.pro/signup",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.0,
    },
    {
      url: "https://aetherpad.shivender.pro/signin",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.0,
    },
  ];
}

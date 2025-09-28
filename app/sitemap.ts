import type { MetadataRoute } from "next";

const siteUrl = "https://deyan.world";

const routes = [
  "",
  "/music",
  "/videos",
  "/gallery",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.6,
  }));
}

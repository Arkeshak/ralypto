import { MetadataRoute } from "next";
import { labOrder, labs, projects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ralypto.com";

  const labUrls = labOrder.map((id) => ({
    url: `${baseUrl}${labs[id].path}`,
    lastModified: new Date(),
  }));

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/work`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...labUrls,
    ...projectUrls,
  ];
}

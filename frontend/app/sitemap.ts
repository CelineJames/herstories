import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const SITE_URL = "https://herstories-africa.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biography`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hall-of-fame`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/submit-story`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/get-involved`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  try {
    const [biosRes, postsRes, archiveRes] = await Promise.all([
      fetch(`${BASE_URL}/biographies/?limit=100`),
      fetch(`${BASE_URL}/blog/?limit=100`),
      fetch(`${BASE_URL}/archive/?limit=100`),
    ]);

    const biosData = await biosRes.json();
    const postsData = await postsRes.json();
    const archiveData = await archiveRes.json();

    const biographyPages =
      biosData.biographies?.map((bio: { slug: string }) => ({
        url: `${SITE_URL}/biography/${bio.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })) || [];

    const blogPages =
      postsData.posts?.map((post: { slug: string }) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })) || [];

    const archivePages =
      archiveData.items?.map((item: { id: number }) => ({
        url: `${SITE_URL}/archive/${item.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })) || [];

    return [...staticPages, ...biographyPages, ...blogPages, ...archivePages];
  } catch {
    return staticPages;
  }
}

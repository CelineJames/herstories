import BiographyDetail from "@/views/biography/[slug]";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(`${BASE_URL}/biographies/${params.slug}`);
    if (!res.ok) return { title: "Biography" };
    const bio = await res.json();

    const imageUrl = bio.image?.startsWith("http")
      ? bio.image
      : `https://herstories-africa.vercel.app/logo.png`;

    return {
      title: bio.name,
      description: bio.summary,
      openGraph: {
        title: `${bio.name} | HerStories`,
        description: bio.summary,
        url: `https://herstories-africa.vercel.app/biography/${bio.slug}`,
        images: [
          {
            url: imageUrl,
            alt: bio.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${bio.name} | HerStories`,
        description: bio.summary,
        images: [imageUrl],
      },
    };
  } catch {
    return { title: "Biography | HerStories" };
  }
}

export default function Page(): React.ReactElement {
  return <BiographyDetail />;
}

import ArchiveDetail from "@/views/archive/[id]";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(`${BASE_URL}/archive/${params.id}`);
    if (!res.ok) return { title: "Archive" };
    const item = await res.json();

    const imageUrl = item.thumbnail_url?.startsWith("http")
      ? item.thumbnail_url
      : `https://herstories-africa.vercel.app/logo.png`;

    return {
      title: item.title,
      description: item.description,
      openGraph: {
        title: `${item.title} | HerStories`,
        description: item.description,
        url: `https://herstories-africa.vercel.app/archive/${item.id}`,
        images: [
          {
            url: imageUrl,
            alt: item.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${item.title} | HerStories`,
        description: item.description,
        images: [imageUrl],
      },
    };
  } catch {
    return { title: "Archive | HerStories" };
  }
}

export default function Page(): React.ReactElement {
  return <ArchiveDetail />;
}
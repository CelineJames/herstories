import BlogPost from "@/views/blog/[slug]";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(`${BASE_URL}/blog/${params.slug}`);
    if (!res.ok) return { title: "Blog" };
    const post = await res.json();

    const imageUrl = post.cover_image?.startsWith("http")
      ? post.cover_image
      : `https://herstories-africa.vercel.app/logo.png`;

    return {
      title: post.title,
      description: post.excerpt || post.title,
      openGraph: {
        title: `${post.title} | HerStories`,
        description: post.excerpt || post.title,
        url: `https://herstories-africa.vercel.app/blog/${post.slug}`,
        images: [
          {
            url: imageUrl,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | HerStories`,
        description: post.excerpt || post.title,
        images: [imageUrl],
      },
    };
  } catch {
    return { title: "Blog | HerStories" };
  }
}

export default function Page(): React.ReactElement {
  return <BlogPost />;
}

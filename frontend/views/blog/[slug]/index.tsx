"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  cover_image: string | null;
  author: string;
  created_at: string;
  updated_at: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  About: "bg-purple-100 text-purple-800",
  Research: "bg-teal-100 text-teal-800",
  Spotlight: "bg-orange-100 text-orange-800",
  Community: "bg-pink-100 text-pink-800",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function renderMarkdown(content: string): string {
  return content
    .replace(
      /^## (.+)$/gm,
      '<h2 class="font-alnevrada text-2xl text-primarydeep mt-10 mb-4">$1</h2>',
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 class="font-alnevrada text-xl text-primarydeep mt-8 mb-3">$1</h3>',
    )
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-medium text-primarydeep">$1</strong>',
    )
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-primary pl-4 italic text-gray-600 my-6">$1</blockquote>',
    )
    .replace(
      /\n\n/g,
      '</p><p class="font-lufga text-gray-700 leading-relaxed text-lg mb-4">',
    )
    .replace(
      /^/,
      '<p class="font-lufga text-gray-700 leading-relaxed text-lg mb-4">',
    )
    .replace(/$/, "</p>");
}

export default function BlogPostPage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${BASE_URL}/blog/${params.slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setPost(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ashwhite flex items-center justify-center">
        <p className="font-poppins text-gray-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-ashwhite flex flex-col items-center justify-center">
        <p className="font-alnevrada text-2xl text-gray-400 mb-4">
          Post not found
        </p>
        <button
          onClick={() => router.push("/blog")}
          className="font-poppins text-sm text-primary underline"
        >
          Back to blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ashwhite">
      {/* Hero */}
      <div className="relative w-full h-72 md:h-96 bg-primarydeep">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primarydeep to-primary" />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-16">
          {post.category && (
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-poppins mb-4 w-fit ${
                CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-800"
              }`}
            >
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-alnevrada text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/60 font-poppins text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-poppins text-gray-400 hover:text-primary transition-colors mb-10"
        >
          ← Back
        </button>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-lufga text-xl text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-200">
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
          <div>
            <p className="font-poppins text-xs text-gray-400 uppercase tracking-wide">
              Written by
            </p>
            <p className="font-poppins text-gray-700">{post.author}</p>
          </div>
          <button
            onClick={() => router.push("/blog")}
            className="px-5 py-2 rounded-full border border-primary text-primary font-poppins text-sm hover:bg-primary hover:text-white transition-colors"
          >
            More posts
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  cover_image: string | null;
  author: string;
  created_at: string;
};

type BlogListResponse = {
  total: number;
  posts: BlogPost[];
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

export default function BlogList(): React.ReactElement {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/blog/categories`);
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * limit;
        const params = new URLSearchParams({
          skip: skip.toString(),
          limit: limit.toString(),
        });
        if (activeCategory) params.append("category", activeCategory);

        const res = await fetch(`${BASE_URL}/blog/?${params}`);
        const data: BlogListResponse = await res.json();
        setPosts(data.posts);
        setTotal(data.total);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [activeCategory, page]);

  const totalPages = Math.ceil(total / limit);
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-ashwhite dark:bg-dark-bg transition-colors duration-300">
      {/* Hero */}
      <div className="bg-primarydeep py-20 px-4 text-center">
        <h1 className="font-alnevrada text-4xl md:text-6xl text-white mb-4">
          Stories & Research
        </h1>
        <p className="font-poppins text-white/70 max-w-xl mx-auto">
          Essays, deep dives, and reflections on African women&apos;s history —
          written by the HerStories team.
        </p>
      </div>

      {/* Category filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveCategory("");
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition-colors ${
              activeCategory === ""
                ? "bg-primary text-white border-primary"
                : "bg-white dark:bg-dark-surface text-gray-600 dark:text-dark-muted border-gray-300 dark:border-dark-border hover:border-primary"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white dark:bg-dark-surface text-gray-600 dark:text-dark-muted border-gray-300 dark:border-dark-border hover:border-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="space-y-6">
            <div className="h-96 bg-gray-200 dark:bg-dark-surface rounded-2xl animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 dark:bg-dark-surface rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-alnevrada text-2xl text-gray-400 mb-2">
              No posts yet
            </p>
            <p className="font-poppins text-gray-400 text-sm">
              Check back soon
            </p>
          </div>
        ) : (
          <>
            {/* Featured post — first post gets a big card */}
            {featuredPost && page === 1 && (
              <div
                onClick={() => router.push(`/blog/${featuredPost.slug}`)}
                className="relative w-full h-96 rounded-2xl overflow-hidden cursor-pointer mb-10 group"
              >
                {featuredPost.cover_image ? (
                  <Image
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-primarydeep" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  {featuredPost.category && (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-poppins mb-3 w-fit ${
                        CATEGORY_COLORS[featuredPost.category] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {featuredPost.category}
                    </span>
                  )}
                  <h2 className="font-alnevrada text-3xl text-white mb-2 leading-tight">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="font-poppins text-white/70 text-sm line-clamp-2 mb-3">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <p className="font-poppins text-white/50 text-xs">
                    {formatDate(featuredPost.created_at)}
                  </p>
                </div>
              </div>
            )}

            {/* Remaining posts grid */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="relative h-48 bg-primarydeep">
                      {post.cover_image ? (
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primarydeep to-primary" />
                      )}
                      {post.category && (
                        <span
                          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-poppins ${
                            CATEGORY_COLORS[post.category] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-alnevrada text-xl text-primarydeep dark:text-dark-text mb-2 leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="font-poppins text-gray-500 dark:text-dark-muted text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="font-poppins text-gray-400 dark:text-dark-muted text-xs">
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-full border dark:border-dark-border font-poppins text-sm disabled:opacity-40 hover:border-primary dark:text-dark-text transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-poppins text-gray-500 dark:text-dark-muted">
                  {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-full border dark:border-dark-border font-poppins text-sm disabled:opacity-40 hover:border-primary dark:text-dark-text transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

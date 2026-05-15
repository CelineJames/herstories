"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  is_published: boolean;
  created_at: string;
};

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string;
  author: string;
  is_published: boolean;
};

const emptyForm: FormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  cover_image: "",
  author: "HerStories",
  is_published: false,
};

function getAdminKey() {
  return sessionStorage.getItem("admin_key") || "";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlog(): React.ReactElement {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const key = getAdminKey();
    if (!key) {
      router.push("/admin");
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/blog`, {
        headers: { "x-admin-key": getAdminKey() },
      });
      if (res.status === 403) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setPreview(false);
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category || "",
      cover_image: post.cover_image || "",
      author: post.author,
      is_published: post.is_published,
    });
    setError("");
    setPreview(false);
    setShowForm(true);
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: editing ? prev.slug : generateSlug(title),
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      setError("Title and content are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        excerpt: form.excerpt || null,
        content: form.content,
        category: form.category || null,
        cover_image: form.cover_image || null,
        author: form.author || "HerStories",
        is_published: form.is_published,
      };

      const url = editing
        ? `${BASE_URL}/admin/blog/${editing.id}`
        : `${BASE_URL}/admin/blog`;

      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Save failed");
      }
      setShowForm(false);
      fetchPosts();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await fetch(`${BASE_URL}/admin/blog/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": getAdminKey() },
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePublishToggle = async (post: BlogPost) => {
    try {
      await fetch(`${BASE_URL}/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify({ is_published: !post.is_published }),
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-ashwhite">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin")}
              className="font-poppins text-sm text-gray-400 hover:text-primary transition-colors"
            >
              ← Admin
            </button>
            <h1 className="font-alnevrada text-3xl text-primarydeep">Blog</h1>
            <span className="font-poppins text-sm text-gray-400">
              {posts.length} posts
            </span>
          </div>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors"
          >
            + Write post
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-alnevrada text-2xl text-gray-400 mb-2">
              No posts yet
            </p>
            <button
              onClick={openCreate}
              className="font-poppins text-sm text-primary underline"
            >
              Write your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-2 mb-1">
                      {post.category && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-poppins bg-purple-100 text-purple-800">
                          {post.category}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-poppins ${
                          post.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="font-alnevrada text-lg text-primarydeep truncate">
                      {post.title}
                    </p>
                    <p className="font-poppins text-xs text-gray-400">
                      {formatDate(post.created_at)} · {post.author}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handlePublishToggle(post)}
                      className={`px-3 py-1.5 rounded-lg font-poppins text-xs border transition-colors ${
                        post.is_published
                          ? "border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {post.is_published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => openEdit(post)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg font-poppins text-xs hover:border-primary transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="px-3 py-1.5 border border-red-200 text-red-500 rounded-lg font-poppins text-xs hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal — full screen for writing */}
      {showForm && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Form header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setShowForm(false)}
                className="font-poppins text-sm text-gray-400 hover:text-primary transition-colors"
              >
                ← Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreview(!preview)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-poppins text-sm hover:border-primary transition-colors"
                >
                  {preview ? "Edit" : "Preview"}
                </button>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) =>
                      setForm({ ...form, is_published: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="font-poppins text-sm text-gray-600">
                    Publish
                  </span>
                </label>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors disabled:opacity-40"
                >
                  {saving
                    ? "Saving..."
                    : editing
                      ? "Save changes"
                      : "Save post"}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-poppins text-sm text-red-500 mb-4">{error}</p>
            )}

            {preview ? (
              /* Preview mode */
              <div className="max-w-3xl mx-auto">
                <h1 className="font-alnevrada text-4xl text-primarydeep mb-4">
                  {form.title || "Untitled"}
                </h1>
                {form.excerpt && (
                  <p className="font-lufga text-xl text-gray-600 mb-8 pb-8 border-b border-gray-200">
                    {form.excerpt}
                  </p>
                )}
                <div className="font-lufga text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {form.content}
                </div>
              </div>
            ) : (
              /* Edit mode */
              <div className="space-y-6">
                {/* Title */}
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title..."
                  className="w-full text-3xl font-alnevrada text-primarydeep border-none outline-none bg-transparent placeholder-gray-300"
                />

                {/* Slug */}
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-xs text-gray-400">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="font-poppins text-xs text-gray-500 border-b border-gray-200 focus:outline-none focus:border-primary pb-0.5 flex-1"
                  />
                </div>

                {/* Meta row */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="font-poppins text-xs text-gray-400 uppercase tracking-wide block mb-1">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="">None</option>
                      <option value="About">About</option>
                      <option value="Research">Research</option>
                      <option value="Spotlight">Spotlight</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-poppins text-xs text-gray-400 uppercase tracking-wide block mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-poppins text-xs text-gray-400 uppercase tracking-wide block mb-1">
                      Cover image URL
                    </label>
                    <input
                      type="text"
                      value={form.cover_image}
                      onChange={(e) =>
                        setForm({ ...form, cover_image: e.target.value })
                      }
                      placeholder="/assets/image.jpg"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="font-poppins text-xs text-gray-400 uppercase tracking-wide block mb-1">
                    Excerpt — shown on blog list page
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm({ ...form, excerpt: e.target.value })
                    }
                    rows={2}
                    placeholder="A short preview of what this post is about..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="font-poppins text-xs text-gray-400 uppercase tracking-wide block mb-1">
                    Content — supports markdown (## headings, **bold**,
                    *italic*)
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    rows={24}
                    placeholder="Write your post here...&#10;&#10;## A heading&#10;&#10;Your paragraph text..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

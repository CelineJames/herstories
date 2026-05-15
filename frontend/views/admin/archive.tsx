"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type ArchiveItem = {
  id: number;
  title: string;
  item_type: string;
  description: string;
  era: string | null;
  region: string | null;
  country: string | null;
  tags: string[];
  source: string | null;
  thumbnail_url: string | null;
  is_published: boolean;
};

type FormData = {
  title: string;
  item_type: string;
  description: string;
  era: string;
  region: string;
  country: string;
  tags: string;
  source: string;
  thumbnail_url: string;
  is_published: boolean;
};

const emptyForm: FormData = {
  title: "",
  item_type: "document",
  description: "",
  era: "",
  region: "",
  country: "",
  tags: "",
  source: "",
  thumbnail_url: "",
  is_published: true,
};

function getAdminKey() {
  return sessionStorage.getItem("admin_key") || "";
}

const TYPE_COLORS: Record<string, string> = {
  document: "bg-purple-100 text-purple-800",
  photo: "bg-orange-100 text-orange-800",
  oral_history: "bg-green-100 text-green-800",
  artwork: "bg-pink-100 text-pink-800",
};

export default function AdminArchive(): React.ReactElement {
  const router = useRouter();
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ArchiveItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const key = getAdminKey();
    if (!key) {
      router.push("/admin");
      return;
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/archive`, {
        headers: { "x-admin-key": getAdminKey() },
      });
      if (res.status === 403) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setItems(data);
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
    setShowForm(true);
  };

  const openEdit = (item: ArchiveItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      item_type: item.item_type,
      description: item.description,
      era: item.era || "",
      region: item.region || "",
      country: item.country || "",
      tags: item.tags?.join(", ") || "",
      source: item.source || "",
      thumbnail_url: item.thumbnail_url || "",
      is_published: item.is_published,
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      setError("Title and description are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        item_type: form.item_type,
        description: form.description,
        era: form.era || null,
        region: form.region || null,
        country: form.country?.toLowerCase() || null,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        source: form.source || null,
        thumbnail_url: form.thumbnail_url || null,
        is_published: form.is_published,
      };

      const url = editing
        ? `${BASE_URL}/admin/archive/${editing.id}`
        : `${BASE_URL}/admin/archive`;

      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");
      setShowForm(false);
      fetchItems();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await fetch(`${BASE_URL}/admin/archive/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": getAdminKey() },
      });
      fetchItems();
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
            <h1 className="font-alnevrada text-3xl text-primarydeep">
              Archive
            </h1>
            <span className="font-poppins text-sm text-gray-400">
              {items.length} items
            </span>
          </div>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors"
          >
            + Add item
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-poppins ${TYPE_COLORS[item.item_type] || "bg-gray-100 text-gray-600"}`}
                    >
                      {item.item_type}
                    </span>
                    {!item.is_published && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-poppins bg-gray-100 text-gray-500">
                        draft
                      </span>
                    )}
                  </div>
                  <p className="font-poppins text-sm text-primarydeep">
                    {item.title}
                  </p>
                  {item.era && (
                    <p className="font-poppins text-xs text-gray-400 capitalize">
                      {item.era} · {item.region}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg font-poppins text-xs hover:border-primary transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="px-3 py-1.5 border border-red-200 text-red-500 rounded-lg font-poppins text-xs hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-alnevrada text-2xl text-primarydeep">
                {editing ? "Edit archive item" : "Add archive item"}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Type
                  </label>
                  <select
                    value={form.item_type}
                    onChange={(e) =>
                      setForm({ ...form, item_type: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="document">Document</option>
                    <option value="photo">Photo</option>
                    <option value="oral_history">Oral History</option>
                    <option value="artwork">Artwork</option>
                  </select>
                </div>
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Era
                  </label>
                  <select
                    value={form.era}
                    onChange={(e) => setForm({ ...form, era: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="">Select era</option>
                    <option value="pre-colonial">Pre-colonial</option>
                    <option value="colonial">Colonial</option>
                    <option value="post-independence">Post-independence</option>
                    <option value="contemporary">Contemporary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Region
                  </label>
                  <input
                    type="text"
                    value={form.region}
                    onChange={(e) =>
                      setForm({ ...form, region: e.target.value })
                    }
                    placeholder="e.g. West Africa"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    placeholder="e.g. nigeria"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="e.g. activism, Nigeria, colonial resistance"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Source
                  </label>
                  <input
                    type="text"
                    value={form.source}
                    onChange={(e) =>
                      setForm({ ...form, source: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    value={form.thumbnail_url}
                    onChange={(e) =>
                      setForm({ ...form, thumbnail_url: e.target.value })
                    }
                    placeholder="/assets/image.jpg"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={form.is_published}
                  onChange={(e) =>
                    setForm({ ...form, is_published: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label
                  htmlFor="is_published"
                  className="font-poppins text-sm text-gray-700 cursor-pointer"
                >
                  Published (visible to public)
                </label>
              </div>

              {error && (
                <p className="font-poppins text-sm text-red-500">{error}</p>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-poppins text-sm hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors disabled:opacity-40"
              >
                {saving ? "Saving..." : editing ? "Save changes" : "Add item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

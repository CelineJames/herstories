"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type Biography = {
  id: number;
  name: string;
  slug: string;
  image: string;
  summary: string;
  country: string;
  category: string;
  flag: string | null;
  details: Record<string, unknown> | null;
};

type FormData = {
  name: string;
  image: string;
  summary: string;
  country: string;
  category: string;
  flag: string;
  details: string;
};

const emptyForm: FormData = {
  name: "",
  image: "",
  summary: "",
  country: "",
  category: "",
  flag: "",
  details: "{}",
};

function getAdminKey() {
  return sessionStorage.getItem("admin_key") || "";
}

export default function AdminBiographies(): React.ReactElement {
  const router = useRouter();
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Biography | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const key = getAdminKey();
    if (!key) {
      router.push("/admin");
      return;
    }
    fetchBiographies();
  }, []);

  const fetchBiographies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/biographies`, {
        headers: { "x-admin-key": getAdminKey() },
      });
      if (res.status === 403) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setBiographies(data);
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

  const openEdit = (bio: Biography) => {
    setEditing(bio);
    setForm({
      name: bio.name,
      image: bio.image,
      summary: bio.summary,
      country: bio.country,
      category: bio.category,
      flag: bio.flag || "",
      details: JSON.stringify(bio.details || {}, null, 2),
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.summary || !form.country || !form.category) {
      setError("Name, summary, country and category are required");
      return;
    }

    let parsedDetails = {};
    try {
      parsedDetails = JSON.parse(form.details);
    } catch {
      setError("Details must be valid JSON");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const S3 = "https://herstories-media.s3.us-east-1.amazonaws.com/assets";

      const payload = {
        name: form.name,
        image: form.image
          ? form.image.startsWith("http")
            ? form.image
            : `${S3}/${form.image}`
          : null,
        summary: form.summary,
        country: form.country.toLowerCase(),
        category: form.category,
        flag: form.flag
          ? form.flag.startsWith("http")
            ? form.flag
            : `${S3}/${form.flag}`
          : null,
        details: parsedDetails,
      };

      const url = editing
        ? `${BASE_URL}/admin/biographies/${editing.id}`
        : `${BASE_URL}/admin/biographies`;

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
      fetchBiographies();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await fetch(`${BASE_URL}/admin/biographies/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": getAdminKey() },
      });
      fetchBiographies();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = biographies.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-ashwhite">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin")}
              className="font-poppins text-sm text-gray-400 hover:text-primary transition-colors"
            >
              ← Admin
            </button>
            <h1 className="font-alnevrada text-3xl text-primarydeep">
              Biographies
            </h1>
            <span className="font-poppins text-sm text-gray-400">
              {biographies.length} total
            </span>
          </div>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors"
          >
            + Add biography
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary mb-6"
        />

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((bio) => (
              <div
                key={bio.id}
                className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div>
                  <p className="font-alnevrada text-lg text-primarydeep">
                    {bio.name}
                  </p>
                  <p className="font-poppins text-xs text-gray-400 capitalize">
                    {bio.country} · {bio.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(bio)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg font-poppins text-xs hover:border-primary transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bio.id, bio.name)}
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
                {editing ? "Edit biography" : "Add biography"}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Full name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Country *
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Activist">Activist</option>
                    <option value="Politician">Politician</option>
                    <option value="Artist">Artist</option>
                    <option value="Scientist">Scientist</option>
                    <option value="Educator">Educator</option>
                    <option value="Economist">Economist</option>
                    <option value="Author">Author</option>
                    <option value="Humanitarian">Humanitarian</option>
                    <option value="Architect">Architect</option>
                    <option value="Feminist">Feminist</option>
                    <option value="Stateswoman">Stateswoman</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                    <option value="Journalist">Journalist</option>
                    <option value="Physician">Physician</option>
                    <option value="Lawyer">Lawyer</option>
                    <option value="Athlete">Athlete</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Image filename
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    placeholder="e.g. kudirat-abiola.jpeg"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  Summary *
                </label>
                <textarea
                  value={form.summary}
                  onChange={(e) =>
                    setForm({ ...form, summary: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  Flag path
                </label>
                <input
                  type="text"
                  value={form.flag}
                  onChange={(e) => setForm({ ...form, flag: e.target.value })}
                  placeholder="e.g. flags/nigeria.png"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-poppins text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  Details (JSON)
                </label>
                <textarea
                  value={form.details}
                  onChange={(e) =>
                    setForm({ ...form, details: e.target.value })
                  }
                  rows={8}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary resize-none"
                  placeholder='{"basic_info": {}, "career_highlights": []}'
                />
                <p className="font-poppins text-xs text-gray-400 mt-1">
                  Must be valid JSON. Leave as {} if unsure.
                </p>
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
                {saving
                  ? "Saving..."
                  : editing
                    ? "Save changes"
                    : "Add biography"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

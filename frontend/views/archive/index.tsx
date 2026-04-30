"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type ArchiveItem = {
  id: number;
  title: string;
  item_type: string;
  description: string;
  era: string;
  region: string;
  country: string;
  tags: string[];
  thumbnail_url: string | null;
  source: string | null;
};

const TYPE_LABELS: Record<string, string> = {
  document: "Document",
  photo: "Photo",
  oral_history: "Oral History",
  artwork: "Artwork",
};

const ERA_LABELS: Record<string, string> = {
  "pre-colonial": "Pre-colonial",
  colonial: "Colonial",
  "post-independence": "Post-independence",
  contemporary: "Contemporary",
};

const TYPE_COLORS: Record<string, string> = {
  document: "bg-purple-100 text-purple-800",
  photo: "bg-orange-100 text-orange-800",
  oral_history: "bg-green-100 text-green-800",
  artwork: "bg-pink-100 text-pink-800",
};

export default function Archive(): React.ReactElement {
  const router = useRouter();
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("");
  const [activeEra, setActiveEra] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const fetchArchive = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * limit;
        const params = new URLSearchParams({
          skip: skip.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);
        if (activeType) params.append("item_type", activeType);
        if (activeEra) params.append("era", activeEra);

        const res = await fetch(`${BASE_URL}/archive/?${params}`);
        if (!res.ok) throw new Error("Failed to fetch archive");
        const data = await res.json();
        setItems(data.items);
        setTotal(data.total);
      } catch (error) {
        console.error("Archive fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchArchive, 300);
    return () => clearTimeout(debounce);
  }, [search, activeType, activeEra, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-ashwhite">
      {/* Hero */}
      <div className="relative w-full h-72 md:h-96">
        <Image
          src="/assets/archive-image.jpg"
          alt="Archive"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl text-white font-alnevrada text-center mb-6">
            The Digital Archive
          </h1>
          <p className="text-white/80 text-center mb-8 max-w-xl">
            A living record of African women who shaped history — their words,
            their acts, their legacies.
          </p>
          {/* Search */}
          <div className="w-full max-w-xl">
            <input
              type="text"
              placeholder="Search the archive..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-5 py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-sm text-gray-500 font-poppins self-center mr-2">
            Type:
          </span>
          <button
            onClick={() => {
              setActiveType("");
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition-colors ${
              activeType === ""
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-300 hover:border-primary"
            }`}
          >
            All
          </button>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <button
              key={value}
              onClick={() => {
                setActiveType(value);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition-colors ${
                activeType === value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Era filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 font-poppins self-center mr-2">
            Era:
          </span>
          <button
            onClick={() => {
              setActiveEra("");
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition-colors ${
              activeEra === ""
                ? "bg-secondary text-white border-secondary"
                : "bg-white text-gray-600 border-gray-300 hover:border-secondary"
            }`}
          >
            All
          </button>
          {Object.entries(ERA_LABELS).map(([value, label]) => (
            <button
              key={value}
              onClick={() => {
                setActiveEra(value);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition-colors ${
                activeEra === value
                  ? "bg-secondary text-white border-secondary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        {!loading && (
          <p className="text-sm text-gray-500 font-poppins">
            {total} {total === 1 ? "item" : "items"} found
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-alnevrada text-gray-400 mb-2">
              Nothing found
            </p>
            <p className="text-gray-400 font-poppins text-sm">
              Try a different search or filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/archive/${item.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-100">
                  {item.thumbnail_url ? (
                    <Image
                      src={item.thumbnail_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primarydeep">
                      <span className="text-white/40 font-alnevrada text-lg">
                        {item.item_type}
                      </span>
                    </div>
                  )}
                  {/* Type badge */}
                  <span
                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-poppins font-medium ${
                      TYPE_COLORS[item.item_type] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {TYPE_LABELS[item.item_type] || item.item_type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-alnevrada text-primarydeep text-lg leading-tight mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-poppins line-clamp-3 mb-3">
                    {item.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400 font-poppins">
                    <span>{item.era?.replace("-", " ")}</span>
                    <span>{item.region}</span>
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-poppins"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
              className="px-4 py-2 rounded-full border font-poppins text-sm disabled:opacity-40 hover:border-primary transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm font-poppins text-gray-500">
              {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full border font-poppins text-sm disabled:opacity-40 hover:border-primary transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

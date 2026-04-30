"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

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
  created_at: string;
};

const TYPE_COLORS: Record<string, string> = {
  document: "bg-purple-100 text-purple-800",
  photo: "bg-orange-100 text-orange-800",
  oral_history: "bg-green-100 text-green-800",
  artwork: "bg-pink-100 text-pink-800",
};

const TYPE_LABELS: Record<string, string> = {
  document: "Document",
  photo: "Photo",
  oral_history: "Oral History",
  artwork: "Artwork",
};

export default function ArchiveDetail(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<ArchiveItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${BASE_URL}/archive/${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setItem(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchItem();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ashwhite flex items-center justify-center">
        <p className="font-poppins text-gray-400 animate-pulse">
          Loading archive item...
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-ashwhite flex flex-col items-center justify-center">
        <p className="font-alnevrada text-2xl text-gray-400 mb-4">
          Item not found
        </p>
        <button
          onClick={() => router.push("/archive")}
          className="font-poppins text-sm text-primary underline"
        >
          Back to archive
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ashwhite">
      {/* Hero image */}
      <div className="relative w-full h-72 md:h-96 bg-primarydeep">
        {item.thumbnail_url ? (
          <Image
            src={item.thumbnail_url}
            alt={item.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-16">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-poppins font-medium mb-4 w-fit ${
              TYPE_COLORS[item.item_type] || "bg-gray-100 text-gray-800"
            }`}
          >
            {TYPE_LABELS[item.item_type] || item.item_type}
          </span>
          <h1 className="text-3xl md:text-5xl font-alnevrada text-white leading-tight">
            {item.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-poppins text-gray-400 hover:text-primary transition-colors mb-8"
        >
          ← Back to archive
        </button>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-200">
          {item.era && (
            <div>
              <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide">
                Era
              </p>
              <p className="text-sm font-poppins text-gray-700 capitalize">
                {item.era.replace("-", " ")}
              </p>
            </div>
          )}
          {item.region && (
            <div>
              <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide">
                Region
              </p>
              <p className="text-sm font-poppins text-gray-700">
                {item.region}
              </p>
            </div>
          )}
          {item.country && (
            <div>
              <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide">
                Country
              </p>
              <p className="text-sm font-poppins text-gray-700 capitalize">
                {item.country}
              </p>
            </div>
          )}
          {item.source && (
            <div>
              <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide">
                Source
              </p>
              <p className="text-sm font-poppins text-gray-700">
                {item.source}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed font-lufga text-lg">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide mb-3">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-poppins"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

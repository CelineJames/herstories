"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ShareBookmark from "@/components/share-bookmark";

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
  const [citationStyle, setCitationStyle] = useState<
    "APA" | "MLA" | "Chicago" | null
  >(null);
  const [copied, setCopied] = useState(false);

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
      <div className="min-h-screen bg-ashwhite dark:bg-dark-bg flex items-center justify-center">
        <p className="font-poppins text-gray-400 animate-pulse">
          Loading archive item...
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-ashwhite dark:bg-dark-bg flex flex-col items-center justify-center">
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

  const generateCitation = (style: "APA" | "MLA" | "Chicago"): string => {
    if (!item) return "";
    const today = new Date();
    const accessed = today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const year = new Date(item.created_at).getFullYear();
    const siteUrl = `https://herstories-africa.vercel.app/archive/${item.id}`;

    if (style === "APA") {
      return `HerStories Africa. (${year}). ${item.title} [${item.item_type.replace("_", " ")}]. HerStories Digital Archive. Retrieved ${accessed}, from ${siteUrl}`;
    }
    if (style === "MLA") {
      return `"${item.title}." HerStories Africa, ${year}, ${siteUrl}. Accessed ${accessed}.`;
    }
    if (style === "Chicago") {
      return `HerStories Africa. "${item.title}." HerStories Digital Archive, ${year}. ${siteUrl} (accessed ${accessed}).`;
    }
    return "";
  };

  const handleCopy = () => {
    if (!citationStyle) return;
    navigator.clipboard.writeText(generateCitation(citationStyle));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-ashwhite dark:bg-dark-bg transition-colors duration-300">
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
        {/* Back button + Share/Bookmark */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-poppins text-gray-400 dark:text-dark-muted hover:text-primary transition-colors"
          >
            ← Back to archive
          </button>
          <ShareBookmark title={item.title} type="archive" id={item.id} />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-dark-border">
          {item.era && (
            <div>
              <p className="text-xs text-gray-400 dark:text-dark-muted font-poppins uppercase tracking-wide">
                Era
              </p>
              <p className="text-sm font-poppins text-gray-700 dark:text-dark-muted capitalize">
                {item.era.replace("-", " ")}
              </p>
            </div>
          )}
          {item.region && (
            <div>
              <p className="text-xs text-gray-400 dark:text-dark-muted font-poppins uppercase tracking-wide">
                Region
              </p>
              <p className="text-sm font-poppins text-gray-700 dark:text-dark-muted">
                {item.region}
              </p>
            </div>
          )}
          {item.country && (
            <div>
              <p className="text-xs text-gray-400 dark:text-dark-muted font-poppins uppercase tracking-wide">
                Country
              </p>
              <p className="text-sm font-poppins text-gray-700 dark:text-dark-muted capitalize">
                {item.country}
              </p>
            </div>
          )}
          {item.source && (
            <div>
              <p className="text-xs text-gray-400 dark:text-dark-muted font-poppins uppercase tracking-wide">
                Source
              </p>
              <p className="text-sm font-poppins text-gray-700 dark:text-dark-muted">
                {item.source}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 dark:text-dark-muted leading-relaxed font-lufga text-lg">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-12">
            <p className="text-xs text-gray-400 dark:text-dark-muted font-poppins uppercase tracking-wide mb-3">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-muted text-sm rounded-full font-poppins"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Citation Tool */}
        <div className="border-t border-gray-200 dark:border-dark-border pt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-alnevrada text-xl text-primarydeep dark:text-dark-text">
                Cite this source
              </h3>
              <p className="font-poppins text-xs text-gray-400 dark:text-dark-muted mt-1">
                Select a citation style to generate a reference for this archive
                item.
              </p>
            </div>
          </div>

          {/* Style selector */}
          <div className="flex gap-2 mb-4">
            {(["APA", "MLA", "Chicago"] as const).map((style) => (
              <button
                key={style}
                onClick={() => setCitationStyle(style)}
                className={`px-4 py-2 rounded-lg font-poppins text-sm border transition-colors ${
                  citationStyle === style
                    ? "bg-primary text-white border-primary"
                    : "bg-white dark:bg-dark-surface text-gray-600 dark:text-dark-muted border-gray-200 dark:border-dark-border hover:border-primary"
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Citation text */}
          {citationStyle && (
            <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-4 border border-gray-200 dark:border-dark-border">
              <p className="font-poppins text-sm text-gray-700 dark:text-dark-muted leading-relaxed mb-4">
                {generateCitation(citationStyle)}
              </p>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-poppins text-sm transition-colors ${
                  copied
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-primary text-white hover:bg-primarydeep"
                }`}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Copy citation
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

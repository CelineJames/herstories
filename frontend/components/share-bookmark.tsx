"use client";

import { useState, useEffect } from "react";

type Props = {
  title: string;
  type: "biography" | "archive" | "blog";
  id: string | number;
};

export default function ShareBookmark({
  title,
  type,
  id,
}: Props): React.ReactElement {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const storageKey = `herstories-bookmark-${type}-${id}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setBookmarked(saved === "true");
  }, [storageKey]);

  const toggleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem(storageKey, next.toString());

    const allBookmarks = JSON.parse(
      localStorage.getItem("herstories-bookmarks") || "[]",
    );

    if (next) {
      const exists = allBookmarks.find(
        (b: { type: string; id: string | number }) =>
          b.type === type && b.id === id,
      );
      if (!exists) {
        allBookmarks.push({
          type,
          id,
          title,
          url: window.location.href,
        });
        localStorage.setItem(
          "herstories-bookmarks",
          JSON.stringify(allBookmarks),
        );
      }
    } else {
      const updated = allBookmarks.filter(
        (b: { type: string; id: string | number }) =>
          !(b.type === type && b.id === id),
      );
      localStorage.setItem("herstories-bookmarks", JSON.stringify(updated));
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    // Use native share sheet if available (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled — do nothing
      }
      return;
    }

    // Fallback — copy link to clipboard
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Bookmark */}
      <button
        onClick={toggleBookmark}
        title={bookmarked ? "Remove bookmark" : "Bookmark"}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border font-poppins text-sm transition-colors ${
          bookmarked
            ? "bg-primary/10 border-primary text-primary"
            : "bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border text-gray-500 dark:text-dark-muted hover:border-primary hover:text-primary"
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={bookmarked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {bookmarked ? "Saved" : "Save"}
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        title="Share"
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border font-poppins text-sm transition-colors ${
          copied
            ? "bg-green-50 border-green-300 text-green-600"
            : "bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border text-gray-500 dark:text-dark-muted hover:border-primary hover:text-primary"
        }`}
      >
        {copied ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle
                cx="18"
                cy="5"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="6"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="19"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Share
          </>
        )}
      </button>
    </div>
  );
}

"use client";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Show ellipsis if current page is far from start
    if (page > 3) pages.push("...");

    // Show pages around current
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show ellipsis if current page is far from end
    if (page < totalPages - 2) pages.push("...");

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex justify-center items-center mt-8 gap-1.5 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className={`px-3 py-2 rounded-lg font-poppins text-sm transition-all ${
          page === 1
            ? "bg-primary/40 text-white/50 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primarydeep"
        }`}
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 py-2 font-poppins text-sm text-gray-400 dark:text-dark-muted"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`w-9 h-9 rounded-lg font-poppins text-sm transition-all border ${
              page === p
                ? "bg-primary text-white border-primary"
                : "bg-white dark:bg-dark-surface text-gray-700 dark:text-dark-text border-gray-200 dark:border-dark-border hover:border-primary hover:text-primary"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className={`px-3 py-2 rounded-lg font-poppins text-sm transition-all ${
          page === totalPages
            ? "bg-primary/40 text-white/50 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primarydeep"
        }`}
      >
        Next →
      </button>
    </div>
  );
}

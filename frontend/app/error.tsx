"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): React.ReactElement {
  return (
    <div className="min-h-screen bg-ashwhite flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-alnevrada text-4xl text-primarydeep mb-4">
        Something went wrong
      </h1>
      <p className="font-poppins text-gray-400 text-sm mb-8 max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 border border-primary text-primary rounded-xl font-poppins text-sm hover:bg-primary hover:text-white transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

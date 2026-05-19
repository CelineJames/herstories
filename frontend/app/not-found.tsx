import Link from "next/link";

export default function NotFound(): React.ReactElement {
  return (
    <div className="min-h-screen bg-ashwhite flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-alnevrada text-6xl text-primarydeep mb-4">404</h1>
      <p className="font-alnevrada text-2xl text-gray-600 mb-2">
        Page not found
      </p>
      <p className="font-poppins text-gray-400 text-sm mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/biography"
          className="px-6 py-2.5 border border-primary text-primary rounded-xl font-poppins text-sm hover:bg-primary hover:text-white transition-colors"
        >
          Browse biographies
        </Link>
      </div>
    </div>
  );
}

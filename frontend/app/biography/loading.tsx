export default function Loading() {
  return (
    <div className="p-6 mt-20 max-w-7xl mx-auto">
      <h1 className="font-alnevrada font-bold text-4xl text-center mb-8 text-gray-300 animate-pulse">
        Biographies
      </h1>

      {/* Search & Filter skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full md:w-1/3 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="w-full md:w-1/4 h-10 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Cards skeleton */}
      <h1 className="font-alnevrada font-bold text-4xl text-center mb-8 text-gray-300 animate-pulse">
        Loading Biographies...
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded shadow p-4">
            <div className="w-full h-80 bg-gray-200 rounded-lg mb-4 animate-pulse" />
            <div className="h-5 bg-gray-200 rounded mb-2 w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded mb-1 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded mb-3 w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

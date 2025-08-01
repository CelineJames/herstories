"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { Flag } from "lucide-react";

type Biography = {
  id: number;
  name: string;
  image: string;
  flag: string;
  summary: string;
  country: string;
  category: string;
  details: string;
};

export default function BiographyList(): React.ReactElement {
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);

  const fetchBiographies = async (
    page: number,
    limit: number,
    search: string,
    category: string
  ) => {
    const skip = (page - 1) * limit;
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    if (search) params.append("search", search);
    if (category) params.append("category", category);

    const res = await fetch(`http://localhost:8000/biographies?${params}`);
    const data = await res.json();
    setBiographies(data.biographies || data);
    setTotal(data.total || 0);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/category");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    const updateLimit = () => {
      setLimit(window.innerWidth < 768 ? 10 : 15);
    };
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBiographies(page, limit, searchTerm, selectedCategory);
  }, [page, limit, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="px-4 py-8 mt-20">
      <h1 className="text-4xl text-center font-semibold mb-6 font-alnevrada">
        Biographies
      </h1>

      <div className="md:max-w-[80%] mx-auto">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded w-full md:max-w-[450px]"
          />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded w-full md:max-w-[450px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.trim()}>
                {cat.trim()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {biographies.length === 0 ? (
        <p className="text-gray-500 text-center">No biographies found.</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center md:justify-center items-start gap-6">
            {biographies.map((bio) => (
              <div
                key={bio.id}
                className="bg-white rounded-xl shadow p-4 w-full max-w-[300px]"
              >
                <div className="relative aspect-[1/1] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={bio.image}
                    alt={bio.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 w-8 h-6 rounded overflow-hidden border border-white shadow">
                    <Image
                      src={`http://localhost:8000/static/flags/${bio.country}.png`}
                      alt={`${bio.country} flag`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h2 className="font-semibold text-lg">{bio.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{bio.summary}</p>
                <Link
                  href={`/biography/${bio.id}`}
                  className="text-primary font-medium mt-2 inline-block"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-4 py-2 rounded ${
                  num === page
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                setPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}

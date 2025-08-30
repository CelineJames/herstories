"use client";

import React, { useEffect, useState } from "react";
import { fetchBiographies, fetchCategories } from "@/utils/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Biography {
  id: number;
  name: string;
  summary: string;
  image: string;
  country: string;
}

export default function BiographyList() {
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const router = useRouter();
  // const searchParams = useSearchParams();

  useEffect(() => {
    // console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    fetchCategories()
      .then((data) => setCategories(data.categories || []))
      .catch((error) => console.error("Failed to fetch categories", error));
  }, []);

  useEffect(() => {
    fetchBiographies(page, limit, searchTerm, selectedCategory)
      .then((data) => {
        setBiographies(data.biographies || data);
        setTotal(data.total || 0);
      })
      .catch((error) => console.error("Failed to fetch biographies", error));
  }, [page, limit, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      <h1 className="font-alnevrada font-bold text-4xl text-center mb-8">
        Biographies
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search biographies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 p-2 border rounded"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/4 p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {!biographies ? (
        <p className="text-gray-500 text-center">No biographies found.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {biographies.map((bio) => (
              <div
                key={bio.id}
                className="bg-white rounded shadow p-4 hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/biography/${bio.id}`)}
              >
                {/* new */}
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    // src={`https://herstories-backend.onrender.com/static/flags/${bio.country}.png`}
                    // src={`${bio.image}`}
                    src={`https://herstories-backend.onrender.com/static/${bio.image}`}
                    alt={bio.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  <div className="absolute top-[6px] left-[6px] w-8 h-6 rounded overflow-hidden border border-white shadow ">
                    {bio.country && (
                      <Image
                        src={`https://herstories-backend.onrender.com/static/flags/${bio.country}.png`}
                        alt={bio.country}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">{bio.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{bio.summary}</p>
                <Link
                  href={`/biography/${bio.id}`}
                  className="text-primary font-medium mt-2 inline-block"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded transition-all ${
              page === 1
                ? "bg-primary/45 text-black/50 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 border rounded transition-all ${
                page === i + 1
                  ? "bg-primary text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page === totalPages}
            className={`px-4 py-2 rounded transition-all ${
              page === totalPages
                ? "bg-primary/45 text-black/40 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

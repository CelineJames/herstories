"use client";

import React, { useEffect, useState } from "react";
import { fetchBiographies, fetchCategories } from "@/utils/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import Pagination from "@/components/pagination";

interface Biography {
  id: number;
  name: string;
  slug: string;
  summary: string;
  image: string;
  flag: string | null;
  country: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded shadow p-4">
      <div className="w-full h-80 bg-gray-200 rounded-lg mb-4 animate-pulse" />
      <div className="h-5 bg-gray-200 rounded mb-2 w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-100 rounded mb-1 animate-pulse" />
      <div className="h-4 bg-gray-100 rounded mb-3 w-5/6 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
    </div>
  );
}

export default function BiographyList() {
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data.categories || []))
      .catch((error) => console.error("Failed to fetch categories", error));
  }, []);

  useEffect(() => {
    setLoading(true); //ed

    fetchBiographies(page, limit, searchTerm, selectedCategory)
      .then((data) => {
        setBiographies(data.biographies || data);
        setTotal(data.total || 0);
      })
      .catch((error) => console.error("Failed to fetch biographies", error))
      .finally(() => setLoading(false));
  }, [page, limit, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(total / limit);

  return (
    <Container className="p-6 mt-20">
      <h1 className="font-alnevrada font-bold text-4xl text-center mb-8 dark:text-dark-text">
        Biographies
      </h1>

      {/* Search & Filter — always visible */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search biographies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 p-2 border rounded bg-white dark:bg-dark-surface dark:border-dark-muted dark:text-dark-text focus:outline-none focus:border-primary"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/4 p-2 border rounded bg-white dark:bg-dark-surface dark:border-dark-muted dark:text-dark-text focus:outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          {categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Show skeleton while loading */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : !biographies || biographies.length === 0 ? (
        <p className="text-gray-500 text-center">No biographies found.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {biographies.map((bio) => (
              <div
                key={bio.id}
                className="bg-white dark:bg-dark-surface rounded shadow p-4 hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/biography/${bio.slug}`)}
              >
                <div className="relative w-full h-80 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={
                      bio.image?.startsWith("http")
                        ? bio.image
                        : `https://herstories-media.s3.us-east-1.amazonaws.com/assets/${bio.image}`
                    }
                    alt={bio.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute top-[6px] left-[6px] w-8 h-6 rounded overflow-hidden border border-white shadow">
                    {bio.country && (
                      <Image
                        src={
                          bio.flag?.startsWith("http")
                            ? bio.flag
                            : `https://herstories-media.s3.us-east-1.amazonaws.com/assets/flags/${bio.country}.png`
                        }
                        alt={bio.country}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 dark:text-dark-text">
                  {bio.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">
                  {bio.summary}
                </p>
                <Link
                  href={`/biography/${bio.slug}`}
                  className="text-primary dark:text-dark-muted font-medium mt-2 inline-block hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </Container>
  );
}

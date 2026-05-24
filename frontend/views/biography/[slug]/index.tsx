"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type Biography = {
  id: number;
  name: string;
  slug: string;
  image: string;
  flag: string;
  country: string;
  category: string;
  summary: string;
  details: {
    basic_info?: {
      full_name?: string;
      birth?: string;
      nationality?: string;
      physical_appearance?: string;
      status?: string;
    };
    education?: {
      institution: string;
      degree: string;
      year: string;
    }[];
    career_highlights?: string[];
    author_and_advocate?: string[];
    honors?: string[];
    personal_life?: string[];
    impact_and_influence?: string[];
    full_summary?: string;
  };
};

export default function BiographyDetail(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const [bio, setBio] = useState<Biography | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await fetch(`${BASE_URL}/biographies/${params.slug}`);
        if (!res.ok) throw new Error("Failed to fetch biography");
        const data = await res.json();
        setBio(data);
      } catch (error) {
        console.error("Failed to fetch biography:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) fetchBio();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-dark-bg">
        <p className="font-poppins text-gray-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!bio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-dark-bg">
        <p className="font-alnevrada text-2xl text-gray-400 mb-4">
          Biography not found
        </p>
        <button
          onClick={() => router.push("/biography")}
          className="font-poppins text-sm text-primary underline"
        >
          Back to biographies
        </button>
      </div>
    );
  }

  const imageUrl = bio.image.startsWith("http")
    ? bio.image
    : `/assets/${bio.image}`;

  return (
    <div className="min-h-screen bg-ashwhite dark:bg-dark-bg transition-colors duration-300">
      {/* Hero image */}
      <div className="relative w-full h-72 md:h-[70vh] bg-primarydeep">
        <Image
          src={imageUrl}
          alt={`Portrait of ${bio.name}`}
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-poppins bg-secondary/80 text-white mb-4 w-fit">
            {bio.category}
          </span>
          <h1 className="text-3xl md:text-6xl font-alnevrada text-white leading-tight mb-2">
            {bio.name}
          </h1>
          <p className="text-white/70 font-poppins text-sm md:text-base capitalize">
            {bio.country}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-poppins text-gray-400 dark:text-dark-muted hover:text-primary transition-colors"
        >
          ← Back
        </button>

        {/* Summary */}
        <section className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm">
          <p className="text-gray-700 dark:text-dark-muted font-lufga text-lg leading-relaxed">
            {bio.summary}
          </p>
        </section>

        {/* Basic Info */}
        {bio.details?.basic_info && (
          <section>
            <h2 className="font-alnevrada text-2xl text-primarydeep dark:text-dark-text mb-4">
              Basic info
            </h2>
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              {bio.details.basic_info.full_name && (
                <div>
                  <p className="text-xs text-gray-400 dark:text-dark-muted font-poppins uppercase tracking-wide">
                    Full name
                  </p>
                  <p className="font-poppins text-gray-700 dark:text-dark-muted">
                    {bio.details.basic_info.full_name}
                  </p>
                </div>
              )}
              {bio.details.basic_info.birth && (
                <div>
                  <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide">
                    Born
                  </p>
                  <p className="font-poppins text-gray-700 dark:text-dark-muted">
                    {bio.details.basic_info.birth}
                  </p>
                </div>
              )}
              {bio.details.basic_info.nationality && (
                <div>
                  <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide">
                    Nationality
                  </p>
                  <p className="font-poppins text-gray-700 dark:text-dark-muted">
                    {bio.details.basic_info.nationality}
                  </p>
                </div>
              )}
              {bio.details.basic_info.status && (
                <div>
                  <p className="text-xs text-gray-400 font-poppins uppercase tracking-wide">
                    Status
                  </p>
                  <p className="font-poppins text-gray-700 dark:text-dark-muted">
                    {bio.details.basic_info.status}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Education */}
        {bio.details?.education && bio.details.education.length > 0 && (
          <section>
            <h2 className="font-alnevrada text-2xl text-primarydeep dark:text-dark-text mb-4">
              Education
            </h2>
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm space-y-4">
              {bio.details.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border-l-2 border-primary dark:border-dark-muted pl-4"
                >
                  <p className="font-poppins font-medium text-gray-800 dark:text-dark-text">
                    {edu.institution}
                  </p>
                  {edu.degree && (
                    <p className="font-poppins text-gray-600 dark:text-dark-muted text-sm">
                      {edu.degree}
                    </p>
                  )}
                  {edu.year && (
                    <p className="font-poppins text-gray-400 dark:text-dark-muted text-xs">
                      {edu.year}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Career Highlights */}
        {bio.details?.career_highlights &&
          bio.details.career_highlights.length > 0 && (
            <section>
              <h2 className="font-alnevrada text-2xl text-primarydeep dark:text-dark-text mb-4">
                Career highlights
              </h2>
              <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm space-y-3">
                {bio.details.career_highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-secondary mt-1 shrink-0">◆</span>
                    <p className="font-poppins text-gray-700 dark:text-dark-muted text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Honors */}
        {bio.details?.honors && bio.details.honors.length > 0 && (
          <section>
            <h2 className="font-alnevrada text-2xl text-primarydeep dark:text-dark-text mb-4">
              Honors & awards
            </h2>
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm space-y-3">
              {bio.details.honors.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-primary dark:text-secondary mt-1 shrink-0">
                    ★
                  </span>
                  <p className="font-poppins text-gray-700 dark:text-dark-muted text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Personal Life */}
        {bio.details?.personal_life && bio.details.personal_life.length > 0 && (
          <section>
            <h2 className="font-alnevrada text-2xl text-primarydeep dark:text-dark-text mb-4">
              Personal life
            </h2>
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm space-y-3">
              {bio.details.personal_life.map((item, idx) => (
                <p
                  key={idx}
                  className="font-poppins text-gray-700 dark:text-dark-muted text-sm leading-relaxed"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Impact */}
        {bio.details?.impact_and_influence &&
          bio.details.impact_and_influence.length > 0 && (
            <section>
              <h2 className="font-alnevrada text-2xl text-primarydeep dark:text-dark-text mb-4">
                Impact & influence
              </h2>
              <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm space-y-3">
                {bio.details.impact_and_influence.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-secondary mt-1 shrink-0">→</span>
                    <p className="font-poppins text-gray-700 dark:text-dark-muted text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Full Summary */}
        {bio.details?.full_summary && (
          <section className="bg-primarydeep dark:bg-dark-surface rounded-2xl p-8 transition-colors duration-300">
            <h2 className="font-alnevrada text-2xl text-primarydeep dark:text-dark-text mb-4">
              Her story
            </h2>
            <p className="font-lufga text-white/80  dark:text-dark-muted leading-relaxed">
              {bio.details.full_summary}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

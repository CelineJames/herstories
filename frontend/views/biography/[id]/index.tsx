"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Biography = {
  id: number;
  name: string;
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

export default function BiographyDetail({ id }: { id: string }) {
  const [bio, setBio] = useState<Biography | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await fetch(
          `https://herstories-backend.onrender.com/biographies/${parseInt(id)}`
        );
        if (!res.ok) throw new Error("Failed to fetch biography");
        const data = await res.json();
        setBio(data);
      } catch (error) {
        console.error("Failed to fetch biography:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBio();
  }, [id]);

  if (loading) return <p className="text-center py-5 mt-24">Loading...</p>;
  if (!bio)
    return <p className="text-center py-10 mt-20">Biography not found.</p>;

  return (
    <div className="max-w-[100%] md:max-w-[80%] mx-auto p-2 md:p-10 mt-20 space-y-10">
      <div className="relative w-full h-[400px] md:h-[80vh] mb-6 rounded-lg overflow-hidden">
        <Image
          src={
            bio.image.startsWith("http")
              ? bio.image
              : `https://herstories-backend.onrender.com/${bio.image}`
          }
          alt={`Picture of ${bio.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain md:object-cover "
          priority
        />
      </div>

      {/* Basic Info */}
      {bio.details?.basic_info && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Basic Info</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Full Name:</strong> {bio.details.basic_info.full_name}
            </li>
            <li>
              <strong>Born:</strong> {bio.details.basic_info.birth}
            </li>
            <li>
              <strong>Nationality:</strong> {bio.details.basic_info.nationality}
            </li>
            <li>
              <strong>Physical Appearance:</strong>{" "}
              {bio.details.basic_info.physical_appearance}
            </li>
            <li>
              <strong>Status:</strong> {bio.details.basic_info.status}
            </li>
          </ul>
        </section>
      )}

      {/* Education */}
      {bio.details?.education && bio.details.education.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          <ul className="list-disc ml-6 space-y-1">
            {bio.details.education.map((edu, idx) => (
              <li key={idx}>
                <strong>{edu.institution}</strong>
                {edu.degree && `, ${edu.degree}`}
                {edu.year && ` (${edu.year})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Career Highlights */}
      {bio.details?.career_highlights && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Career Highlights</h2>
          <ul className="list-disc ml-6 space-y-1">
            {bio.details.career_highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Author & Advocate */}
      {bio.details?.author_and_advocate && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Author & Advocate</h2>
          <ul className="list-disc ml-6 space-y-1">
            {bio.details.author_and_advocate.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Honors */}
      {bio.details?.honors && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Honors & Awards</h2>
          <ul className="list-disc ml-6 space-y-1">
            {bio.details.honors.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Personal Life */}
      {bio.details?.personal_life && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Personal Life</h2>
          <ul className="list-disc ml-6 space-y-1">
            {bio.details.personal_life.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Impact & Influence */}
      {bio.details?.impact_and_influence && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Impact & Influence</h2>
          <ul className="list-disc ml-6 space-y-1">
            {bio.details.impact_and_influence.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Full Summary */}
      {bio.details?.full_summary && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Full Summary</h2>
          <p className="leading-relaxed">{bio.details.full_summary}</p>
        </section>
      )}
    </div>
  );
}

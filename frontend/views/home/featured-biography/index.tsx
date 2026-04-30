"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import featuredBiography, { featuredBiog } from "./featuredBiography";
import Button from "@/components/button";

export default function FeaturedBio(): React.ReactElement {
  const [bio, setBio] = useState<featuredBiog>(featuredBiography[0]);

  useEffect(() => {
    const key = "lastFeaturedBioIndex";
    const savedIndex = parseInt(localStorage.getItem(key) || "0", 10);
    const nextIndex = (savedIndex + 1) % featuredBiography.length;

    // Save next index for the next reload
    localStorage.setItem(key, nextIndex.toString());

    setBio(featuredBiography[nextIndex]);
  }, []);

  return (
    <div className="bg-ashwhite flex flex-col md:flex-row-reverse md:justify-around md:items-center py-12 gap-6 px-6">
      {/* Text Content */}
      <div className="md:w-[60%]">
        <Button className="">Featured Story</Button>
        <h1 className="font-alnevrada text-3xl font-semibold mb-2">
          {bio.name}
        </h1>
        <p className="font-lufga text-navyblue font-light">{bio.details}</p>

        <Link
          href={`/biography/${bio.id}`}
          className="inline-flex items-center gap-1 text-secondary border-b border-secondary pb-[1px] group transition mt-8"
        >
          Read Biography
          <ArrowUpRight
            size={16}
            className="mt-[2px] transition-transform duration-300 group-hover:translate-x-2"
          />
        </Link>
      </div>

      {/* Image */}
      <div className="w-full md:w-[40%] max-w-[400px] relative aspect-[1/1]">
        <Image
          src={bio.image}
          alt={bio.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

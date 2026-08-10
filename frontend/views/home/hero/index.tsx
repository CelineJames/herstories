"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type HeroItem = {
  image: string;
  quote: string;
  name: string;
};

const HERO_DATA: HeroItem[] = [
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/ngozi-iweala.jpg",
    quote:
      "I'm a fighter; I'm very focused on what I'm doing, and relentless in what I want to achieve, almost to a fault. If you get in my way, you get kicked.",
    name: "Ngozi Okonjo-Iweala",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/ala-salah2.jpg",
    quote: "I am here to fight for the future generation.",
    name: "Alaa Salah",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/zaha.jpeg",
    quote:
      "Women are always told, 'You're not going to make it, it's too difficult, you can't do that, don't enter this competition, you'll never win it,' - they need confidence in themselves and people around them to help them to get on.",
    name: "Zaha Hadid",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/amel-kabourl.jpg",
    quote:
      "We dont need super heroes, we need real people doing meaningful work.",
    name: "Amel Karboul",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/sirleaf.jpg",
    quote: "If your dreams do not scare you, they are not big enough.",
    name: "Ellen Sirleaf",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/funmi-kuti.jpeg",
    quote:
      "My life has been full of struggles, the fight for the emancipation of women...",
    name: "Funmilayo Ransome Kuti",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/aoua-keita.jpeg",
    quote:
      "I wanted to show that a woman too could be a fighter and a builder.",
    name: "Aoua Keita",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/ilwad-elman.jpg",
    quote: "Peace building must include everyone - especially women.",
    name: "Ilwad Elman",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/tsitsi-dangaremba.jpeg",
    quote: "The condition of women reflects the condition of the society.",
    name: "Tsitsi Dangaremba",
  },
  {
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/nawal-sadami.jpeg",
    quote:
      "They said 'You are a savage and dangerous woman.' I am speaking the truth and the truth is savage and dangerous.",
    name: "Nawal El Saadawi",
  },
];

export default function Hero(): React.ReactElement {
  const [current, setCurrent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_DATA.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? HERO_DATA.length - 1 : prev - 1));
  }, []);

  // Automated slideshow with pause-on-hover capability
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full min-h-[calc(100dvh-5rem)] h-[calc(100dvh-5rem)] overflow-hidden bg-gray-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Stacked Images for Butter-Smooth Cross-Fading */}
      {HERO_DATA.map((item, index) => {
        const isActive = index === current;
        return (
          <div
            key={item.name}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="100vw"
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-black/30 flex items-center justify-center px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center text-white flex flex-col items-center">
          {/* Dynamic Quote */}
          <div className="min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center">
            <p className="text-xl sm:text-3xl md:text-4xl font-serif font-medium leading-relaxed sm:leading-snug tracking-tight max-w-3xl drop-shadow-md">
              &ldquo;{HERO_DATA[current].quote}&rdquo;
            </p>
            <h3 className="mt-4 text-base sm:text-lg font-medium tracking-wide drop-shadow">
              - {HERO_DATA[current].name}
            </h3>
          </div>

          {/* Call To Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/archive"
              className="px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primarydeep rounded-lg shadow-lg transition-all duration-300 "
            >
              Explore Archive
            </Link>
            <Link
              href="/submit-story"
              className="px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-lg transition-all duration-300"
            >
              Submit a Story
            </Link>
          </div>
        </div>
      </div>

      {/* Manual Slide Controls */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto hidden sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto hidden sm:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators / Progress Bar */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center items-center space-x-2">
        {HERO_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current
                ? "w-8 bg-primary"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

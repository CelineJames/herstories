"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type heroItems = {
  image: string;
  quote: string;
  name: string;
};

const heroData: heroItems[] = [
  {
    image: "/assets/ngozi-iweala.jpg",
    quote:
      "I'm a fighter; I'm very focused on what I'm doing, and relentless in what I want to achieve, almost to a fault. If you get in my way, you get kicked.",
    name: "Ngozi Okonjo-Iweala",
  },
  {
    image: "/assets/ala-salah2.jpg",
    quote: "I am here to fight for the future generation.",
    name: "Alaa Salah",
  },
  {
    image: "/assets/Amel-Kabourl.jpg",
    quote:
      "We dont need super heroes, we need real people doing meanifull work.",
    name: "Amel Kabourl",
  },
  {
    image: "/assets/sirleaf.jpg",
    quote: "if your dreams do not scare you, they are not big enough.",
    name: "Ellen Sirleaf",
  },
  {
    image: "/assets/funmi-kuti.jpeg",
    quote:
      "My life has been full of struggles, the fight for the emancipation of women...",
    name: "Funmilayo Ransome Kuti",
  },
  {
    image: "/assets/Aoua-keita.jpeg",
    quote:
      "I wanted to show that a woman too could be a fighter and a builder.",
    name: "Aoua Keita",
  },
  {
    image: "/assets/ilwad-elman.jpg",
    quote: "Peace building must include everyone - especially women.",
    name: "Ilwad Elman",
  },
  {
    image: "/assets/tsitsi-dangaremba.jpeg",
    quote: "The condition of women reflects the condition of the society.",
    name: "Tsitsi Dangaremba",
  },
  {
    image: "/assets/Nawal-sadami.jpeg",
    quote:
      "They said 'You are a savage and dangerous woman' i am speaking the truth and the truth is savge and dangerous.",
    name: "Tsitsi Dangaremba",
  },
  // Add more as needed
];

export default function Hero(): React.ReactElement {
  const [current, setCurrent] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(false), 500);

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroData.length);
        setFade(false);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, []);

  const { image, quote, name } = heroData[current];

  return (
    <div className="relative w-full h-[90vh] overflow-hidden mt-16">
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className={`object-fit md:object-cover transition-opacity duration-1000 ease-in-out ${
          fade ? "opacity-0" : "opacity-100"
        }`}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6 text-center">
        <div
          className={`text-white max-w-2xl transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-xl md:text-3xl font-semibold italic mb-4">
            “{quote}”
          </p>
          <p className="text-sm md:text-lg font-medium">— {name}</p>
        </div>
      </div>
    </div>
  );
}

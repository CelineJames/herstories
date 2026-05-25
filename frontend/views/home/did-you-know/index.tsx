"use client";

import { useState, useEffect } from "react";

const facts = [
  {
    fact: "Yaa Asantewaa led the last major war of African resistance against British colonial rule in Ghana in 1900 — when male chiefs hesitated, she stood up and said 'if you men will not go forward, then we women will.'",
    woman: "Yaa Asantewaa",
    country: "Ghana",
  },
  {
    fact: "Wangari Maathai was the first African woman to win the Nobel Peace Prize in 2004. Her Green Belt Movement planted over 51 million trees across Kenya.",
    woman: "Wangari Maathai",
    country: "Kenya",
  },
  {
    fact: "Funmilayo Ransome-Kuti organised over 10,000 women in protest against taxation and colonial rule in 1949, forcing the King of Abeokuta to abdicate.",
    woman: "Funmilayo Ransome-Kuti",
    country: "Nigeria",
  },
  {
    fact: "Ellen Johnson Sirleaf became Africa's first elected female head of state in 2005, leading Liberia out of civil war and winning the Nobel Peace Prize in 2011.",
    woman: "Ellen Johnson Sirleaf",
    country: "Liberia",
  },
  {
    fact: "Miriam Makeba testified before the United Nations against apartheid in 1963, becoming the first African woman to address the UN Security Council on human rights.",
    woman: "Miriam Makeba",
    country: "South Africa",
  },
  {
    fact: "Ngozi Okonjo-Iweala became the first woman and first African to serve as Director-General of the World Trade Organization in 2021.",
    woman: "Ngozi Okonjo-Iweala",
    country: "Nigeria",
  },
  {
    fact: "Charlotte Maxeke was the first Black South African woman to earn a university degree, graduating from Wilberforce University in Ohio in 1903.",
    woman: "Charlotte Maxeke",
    country: "South Africa",
  },
  {
    fact: "Zaha Hadid was the first woman to receive the Pritzker Architecture Prize in 2004 — the highest honour in architecture.",
    woman: "Zaha Hadid",
    country: "Iraq/UK",
  },
  {
    fact: "Fatou Bensouda became the first African woman to serve as Chief Prosecutor of the International Criminal Court in 2012.",
    woman: "Fatou Bensouda",
    country: "Gambia",
  },
  {
    fact: "Aoua Keïta was one of the first women elected to the National Assembly of Mali in 1959 and wrote one of the first political memoirs by an African woman.",
    woman: "Aoua Keïta",
    country: "Mali",
  },
];

export default function DidYouKnow(): React.ReactElement {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % facts.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const { fact, woman, country } = facts[current];

  const goTo = (index: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 400);
  };

  return (
    <div className="py-16 px-6 bg-white dark:bg-dark-surface rounded-3xl my-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-secondary/10 dark:bg-secondary/20 px-4 py-1.5 rounded-full mb-8">
          <span className="text-secondary text-sm font-poppins font-medium">
            Did you know?
          </span>
        </div>

        {/* Fact */}
        <div
          className={`transition-opacity duration-400 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-lufga text-lg md:text-xl text-gray-700 dark:text-dark-muted leading-relaxed mb-8">
            &ldquo;{fact}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-alnevrada text-primarydeep dark:text-dark-text text-lg">
              {woman}
            </span>
            <span className="text-gray-300 dark:text-dark-border">·</span>
            <span className="font-poppins text-gray-400 dark:text-dark-muted text-sm">
              {country}
            </span>
          </div>
        </div>

        {/* Dots navigation */}
        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {/* Previous */}
          <button
            onClick={() => goTo((current - 1 + facts.length) % facts.length)}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-dark-border flex items-center justify-center hover:border-secondary hover:text-secondary text-gray-400 dark:text-dark-muted transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {facts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? "w-6 h-2 bg-secondary"
                    : "w-2 h-2 bg-gray-200 dark:bg-dark-border hover:bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => goTo((current + 1) % facts.length)}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-dark-border flex items-center justify-center hover:border-secondary hover:text-secondary text-gray-400 dark:text-dark-muted transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

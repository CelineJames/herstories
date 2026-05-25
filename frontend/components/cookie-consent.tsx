"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("herstories-cookie-consent");
    if (!consent) {
      // Small delay so it doesn't pop immediately on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("herstories-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("herstories-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 animate-slide-up">
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-gray-100 dark:border-dark-border p-6">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-base">🍪</span>
          </div>
          <h3 className="font-alnevrada text-lg text-primarydeep dark:text-dark-text">
            We use cookies
          </h3>
        </div>

        {/* Message */}
        <p className="font-poppins text-sm text-gray-500 dark:text-dark-muted leading-relaxed mb-5">
          HerStories uses cookies to improve your experience and understand how
          visitors interact with our archive. No data is sold to third parties.{" "}
          <Link
            href="#"
            className="text-primary dark:text-white/80 underline hover:text-secondary transition-colors"
          >
            Learn more
          </Link>
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 py-2 bg-primary text-white rounded-xl font-poppins text-sm hover:bg-primarydeep transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2 border border-gray-200 dark:border-dark-border text-gray-600 dark:text-dark-muted rounded-xl font-poppins text-sm hover:border-gray-400 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

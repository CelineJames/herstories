"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoDark from "@/public/logo-white.png";
import logoLight from "@/public/logo.png";
import ThemeToggle from "@/components/theme-toggle";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Archive", href: "/archive" },
  { name: "Biography", href: "/biography" },
  { name: "Blog", href: "/blog" },
  { name: "Hall of Voices", href: "/hall-of-fame" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Adds a slight shadow/opacity shift on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200/50 dark:border-dark-border/50 shadow-sm"
          : "bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo (Fix flicker on theme switch) */}
        <Link
          href="/"
          className="flex items-center shrink-0 h-12 w-36 overflow-hidden"
        >
          <Image
            src={logoLight}
            alt="HerStories"
            priority
            className="w-full h-full object-contain scale-[320%] dark:hidden" // Using scale to trim padding from the logo
          />
          <Image
            src={logoDark}
            alt="HerStories"
            priority
            className="w-full h-full object-contain scale-[320%] hidden dark:block" // Using scale to trim padding from the logo
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md2:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary dark:text-primary font-semibold bg-primary/10"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md2:flex items-center space-x-3">
          <ThemeToggle />

          <Link
            href="/submit-story"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primarydeep rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
          >
            Submit a Story
          </Link>

          <Link
            href="/get-involved"
            className="px-4 py-2 text-sm font-medium text-secondary border border-secondary/30 hover:border-secondary hover:bg-secondary hover:text-white rounded-lg transition-all duration-200 active:scale-[0.98]"
          >
            Get Involved
          </Link>
        </div>

        {/* Mobile Control Buttons */}
        <div className="md2:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {menuOpen && (
        <div className="md2:hidden bg-white/95 dark:bg-dark-bg/95 backdrop-blur-lg border-b border-gray-200 dark:border-dark-border px-4 pt-2 pb-6 shadow-xl transition-all">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col space-y-2 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link
              href="/submit-story"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primarydeep rounded-lg shadow-sm transition-all"
            >
              Submit a Story
            </Link>
            <Link
              href="/get-involved"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-medium text-secondary border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all"
            >
              Get Involved
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

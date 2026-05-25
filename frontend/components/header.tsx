"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icon lib
import Image from "next/image";
import Link from "next/link";
import logoDark from "@/public/logo-white.png";
import logoLight from "@/public/logo.png";
import { useTheme } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full h-20 bg-white dark:bg-dark-bg dark:border-b dark:border-dark-border shadow-md fixed top-0 z-50 transition-colors duration-300">
      <div className="xl:w-[80%] lg:max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}

        <Image
          src={theme === "dark" ? logoDark : logoLight}
          alt="HerStories"
          className="w-36 h-12 object-cover mt-2"
        />

        {/* Desktop Links */}
        <nav className="hidden md2:flex space-x-6 items-center font-bold">
          <Link
            href="/#"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/archive"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
          >
            Archive
          </Link>
          <Link
            href="/biography"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
          >
            Biography
          </Link>
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/hall-of-fame"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
          >
            Hall of Voices
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md2:flex space-x-4">
          <ThemeToggle />
          <Link href="/submit-story">
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydeep hover:text-white transition">
              Submit a Story
            </button>
          </Link>
          <Link href="/get-involved">
            <button className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition duration-500">
              Get Involved
            </button>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md2:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 bg-white dark:bg-dark-bg border-t dark:border-dark-border shadow-md transition-colors duration-300">
          <nav className="flex flex-col space-y-3 mt-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/archive"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
            >
              Archive
            </Link>
            <Link
              href="/biography"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
            >
              Biography
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/hall-of-fame"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-dark-text hover:text-primary transition-colors"
            >
              Hall of Voices
            </Link>
          </nav>
          <div className="flex flex-col space-y-3 mt-4">
            <Link href="/submit-story">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydeep hover:text-white transition">
                Submit a story
              </button>
            </Link>
            <Link href="/get-involved">
              <button className="w-full px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition duration-500">
                Get involved
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

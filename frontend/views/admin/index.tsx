"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard(): React.ReactElement {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_key");
    if (stored) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
    if (key === adminKey) {
      sessionStorage.setItem("admin_key", key);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid admin key");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_key");
    setIsAuthenticated(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-poppins text-gray-400 animate-pulse">Loading...</p>
      </div>
    );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ashwhite flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-alnevrada text-3xl text-primarydeep mb-2">
              HerStories Admin
            </h1>
            <p className="font-poppins text-gray-400 text-sm">
              Enter your admin key to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Admin key"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-poppins text-sm focus:outline-none focus:border-primary"
            />
            {error && (
              <p className="font-poppins text-sm text-red-500">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white rounded-xl py-3 font-poppins text-sm hover:bg-primarydeep transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: "Submissions",
      description: "Review and moderate story submissions",
      href: "/admin/submissions",
      color: "bg-purple-50 border-purple-200",
      count: null,
    },
    {
      title: "Biographies",
      description: "Add and manage women's biographies",
      href: "/admin/biographies",
      color: "bg-orange-50 border-orange-200",
      count: null,
    },
    {
      title: "Archive",
      description: "Manage historical archive items",
      href: "/admin/archive",
      color: "bg-teal-50 border-teal-200",
      count: null,
    },
    {
      title: "Blog",
      description: "Write and publish blog posts",
      href: "/admin/blog",
      color: "bg-pink-50 border-pink-200",
      count: null,
    },
  ];

  return (
    <div className="min-h-screen bg-ashwhite">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-alnevrada text-4xl text-primarydeep">Admin</h1>
            <p className="font-poppins text-gray-400 text-sm mt-1">
              HerStories content management
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="font-poppins text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sections.map((section) => (
            <button
              key={section.href}
              onClick={() => router.push(section.href)}
              className={`p-6 rounded-2xl border-2 text-left hover:shadow-md transition-all ${section.color}`}
            >
              <h2 className="font-alnevrada text-2xl text-primarydeep mb-2">
                {section.title}
              </h2>
              <p className="font-poppins text-gray-500 text-sm">
                {section.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

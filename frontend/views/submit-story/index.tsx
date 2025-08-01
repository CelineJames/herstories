"use client";
import { useState } from "react";

export default function SubmitStoryPage() {
  const [formData, setFormData] = useState({
    fullBio: false,
    hallOfVoices: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="p-4 mt-24 max-w-2xl mx-auto">
      <form className="flex flex-col sm:flex-row gap-4">
        {/* Full Biography Option */}
        <label
          className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer w-full border-2 transition 
            ${
              formData.fullBio
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
        >
          <span className="text-lg font-medium">Full Biography</span>
          <input
            type="checkbox"
            name="fullBio"
            checked={formData.fullBio}
            onChange={handleChange}
            className="appearance-none w-5 h-5 rounded-full border-2 border-purple-600 checked:bg-purple-600 checked:border-purple-600 transition"
          />
        </label>

        {/* Hall of Voices Option */}
        <label
          className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer w-full border-2 transition 
            ${
              formData.hallOfVoices
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
        >
          <span className="text-lg font-medium">Hall of Voices</span>
          <input
            type="checkbox"
            name="hallOfVoices"
            checked={formData.hallOfVoices}
            onChange={handleChange}
            className="appearance-none w-5 h-5 rounded-full border-2 border-purple-600 checked:bg-purple-600 checked:border-purple-600 transition"
          />
        </label>
      </form>
    </div>
  );
}

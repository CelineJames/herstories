"use client";
import { useState } from "react";

export default function SubmitStoryPage() {
  const [selected, setSelected] = useState<"fullBio" | "hallOfVoices" | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value as "fullBio" | "hallOfVoices");
  };

  return (
    <div className="p-4 mt-24 max-w-2xl mx-auto">
      {/* Choice between Full Biography or Hall of Voices */}
      <form className="flex flex-col sm:flex-row gap-4 mb-6">
        <label
          className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer w-full border-2 transition 
            ${
              selected === "fullBio"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
        >
          <span className="text-lg font-medium">Full Biography</span>
          <input
            type="radio"
            name="storyOption"
            value="fullBio"
            checked={selected === "fullBio"}
            onChange={handleChange}
            className="appearance-none w-5 h-5 rounded-full border-2 border-purple-600 checked:bg-purple-600 checked:border-purple-600 transition"
          />
        </label>

        <label
          className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer w-full border-2 transition 
            ${
              selected === "hallOfVoices"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
        >
          <span className="text-lg font-medium">Hall of Voices</span>
          <input
            type="radio"
            name="storyOption"
            value="hallOfVoices"
            checked={selected === "hallOfVoices"}
            onChange={handleChange}
            className="appearance-none w-5 h-5 rounded-full border-2 border-purple-600 checked:bg-purple-600 checked:border-purple-600 transition"
          />
        </label>
      </form>

      {/* Conditional forms */}
      {selected === "fullBio" && (
        <form className="space-y-6">
          {/* Submitter Info */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Submitter Info (Optional)
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-2 mb-2"
            />
            <input
              type="email"
              placeholder="Your Contact (email or phone)"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Basic Information (Required)
            </h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Date of Birth"
              className="w-full border rounded-lg p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Nationality"
              className="w-full border rounded-lg p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Physical Appearance"
              className="w-full border rounded-lg p-2 mb-2"
              required
            />
            <select className="w-full border rounded-lg p-2" required>
              <option value="">Status (Alive or Deceased)</option>
              <option value="alive">Alive</option>
              <option value="deceased">Deceased</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Upload Image (Required)
            </h2>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-2 mb-2"
              required
            />
            <select className="w-full border rounded-lg p-2">
              <option value="">Select Image Version</option>
              <option value="standard">Standard</option>
              <option value="high_res">High Resolution</option>
              <option value="thumbnail">Thumbnail</option>
            </select>
          </div>

          {/* Optional Sections */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Education (Optional)</h2>
            <textarea
              placeholder="List education details here..."
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Career Highlights (Optional)
            </h2>
            <textarea
              placeholder="List career highlights here..."
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Honors (Optional)</h2>
            <textarea
              placeholder="List honors and awards here..."
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Impact & Influence (Optional)
            </h2>
            <textarea
              placeholder="Describe impact and influence here..."
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Free Form Story */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Tell Their Story</h2>
            <textarea
              placeholder="Share their story in your own words..."
              className="w-full border rounded-lg p-2"
              rows={5}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Why are you submitting this biography?
            </h2>
            <textarea
              name="reason"
              rows={4}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Tell us why you want this biography included..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-3 font-semibold hover:bg-purple-700 transition"
          >
            Submit Biography
          </button>
        </form>
      )}

      {selected === "hallOfVoices" && (
        <form className="mt-6 space-y-4 p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold">Submit to Hall of Voices</h2>

          {/* Submitter Info (Optional) */}
          <div>
            <label className="block text-sm font-medium">
              Your Name (optional)
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Your Contact (optional)
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Email or phone"
            />
          </div>

          {/* Person’s Image */}
          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium">Person’s Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Enter person's name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Nationality</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Enter nationality"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select className="w-full border rounded-lg p-2" required>
              <option value="">Select status</option>
              <option value="alive">Alive</option>
              <option value="deceased">Deceased</option>
            </select>
          </div>

          {/* Heroic Story */}
          <div>
            <label className="block text-sm font-medium">
              Their Story (Why they should to be on the wall)
            </label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows={5}
              placeholder="Share their story and why this person should be on the Hall of Voices"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

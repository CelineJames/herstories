"use client";

import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type SubmissionType = "biography" | "archive" | null;
type Step = 1 | 2 | 3;

type BiographyForm = {
  subject_name: string;
  country: string;
  category: string;
  summary: string;
  education: string;
  career_highlights: string;
  honors: string;
  impact: string;
  full_story: string;
  reason: string;
  submitter_name: string;
  submitter_email: string;
};

type ArchiveForm = {
  subject_name: string;
  country: string;
  source: string;
  full_story: string;
  reason: string;
  submitter_name: string;
  submitter_email: string;
};

const emptyBiography: BiographyForm = {
  subject_name: "",
  country: "",
  category: "",
  summary: "",
  education: "",
  career_highlights: "",
  honors: "",
  impact: "",
  full_story: "",
  reason: "",
  submitter_name: "",
  submitter_email: "",
};

const emptyArchive: ArchiveForm = {
  subject_name: "",
  country: "",
  source: "",
  full_story: "",
  reason: "",
  submitter_name: "",
  submitter_email: "",
};

export default function SubmitStory(): React.ReactElement {
  const [submissionType, setSubmissionType] = useState<SubmissionType>(null);
  const [step, setStep] = useState<Step>(1);
  const [bioForm, setBioForm] = useState<BiographyForm>(emptyBiography);
  const [archiveForm, setArchiveForm] = useState<ArchiveForm>(emptyArchive);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateBio = (field: keyof BiographyForm, value: string) => {
    setBioForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateArchive = (field: keyof ArchiveForm, value: string) => {
    setArchiveForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const payload =
        submissionType === "biography"
          ? { submission_type: "biography", ...bioForm }
          : { submission_type: "archive", ...archiveForm };

      const res = await fetch(`${BASE_URL}/submissions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-ashwhite flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="font-alnevrada text-3xl text-primarydeep mb-4">
            Thank you
          </h2>
          <p className="font-poppins text-gray-600 mb-2">
            Your submission has been received and is under review.
          </p>
          <p className="font-poppins text-gray-400 text-sm">
            We'll be in touch if we need more information or when it's
            published.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSubmissionType(null);
              setStep(1);
              setBioForm(emptyBiography);
              setArchiveForm(emptyArchive);
            }}
            className="mt-8 px-6 py-2 rounded-full border border-primary text-primary font-poppins text-sm hover:bg-primary hover:text-white transition-colors"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ashwhite">
      {/* Hero */}
      <div className="bg-primarydeep py-20 px-4 text-center">
        <h1 className="font-alnevrada text-4xl md:text-6xl text-white mb-4">
          Submit a story
        </h1>
        <p className="font-poppins text-white/70 max-w-xl mx-auto">
          Help us document the women who shaped Africa. Every submission goes
          through a review process before being published.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Step 1 — Choose type */}
        {step === 1 && (
          <div>
            <h2 className="font-alnevrada text-2xl text-primarydeep mb-2">
              What are you submitting?
            </h2>
            <p className="font-poppins text-gray-500 text-sm mb-8">
              Choose the type of submission that best fits what you want to
              share.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Biography option */}
              <button
                onClick={() => setSubmissionType("biography")}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  submissionType === "biography"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50 bg-white"
                }`}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-poppins text-lg">✍</span>
                </div>
                <h3 className="font-alnevrada text-xl text-primarydeep mb-2">
                  Full biography
                </h3>
                <p className="font-poppins text-gray-500 text-sm">
                  Submit a detailed biography of an African woman — her life,
                  achievements, and legacy.
                </p>
              </button>

              {/* Archive option */}
              <button
                onClick={() => setSubmissionType("archive")}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  submissionType === "archive"
                    ? "border-secondary bg-secondary/5"
                    : "border-gray-200 hover:border-secondary/50 bg-white"
                }`}
              >
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-secondary font-poppins text-lg">
                    📄
                  </span>
                </div>
                <h3 className="font-alnevrada text-xl text-primarydeep mb-2">
                  Archive document
                </h3>
                <p className="font-poppins text-gray-500 text-sm">
                  Submit a historical document, photograph, oral history, or
                  artwork for the digital archive.
                </p>
              </button>
            </div>

            {submissionType && (
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-full bg-primary text-white font-poppins transition-colors hover:bg-primarydeep"
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Step 2 — Fill the form */}
        {step === 2 && submissionType === "biography" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-primary font-poppins text-sm"
              >
                ← Back
              </button>
              <h2 className="font-alnevrada text-2xl text-primarydeep">
                Biography details
              </h2>
            </div>

            {/* Required fields */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-poppins text-sm text-gray-400 uppercase tracking-wide">
                Required
              </h3>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  value={bioForm.subject_name}
                  onChange={(e) => updateBio("subject_name", e.target.value)}
                  placeholder="e.g. Wangari Maathai"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-sm text-gray-700 block mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={bioForm.country}
                    onChange={(e) => updateBio("country", e.target.value)}
                    placeholder="e.g. Kenya"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-poppins text-sm text-gray-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={bioForm.category}
                    onChange={(e) => updateBio("category", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="">Select one</option>
                    <option value="Activist">Activist</option>
                    <option value="Politician">Politician</option>
                    <option value="Artist">Artist</option>
                    <option value="Scientist">Scientist</option>
                    <option value="Educator">Educator</option>
                    <option value="Economist">Economist</option>
                    <option value="Author">Author</option>
                    <option value="Humanitarian">Humanitarian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Brief summary
                </label>
                <textarea
                  value={bioForm.summary}
                  onChange={(e) => updateBio("summary", e.target.value)}
                  placeholder="One or two sentences describing who she is..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* Optional fields */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-poppins text-sm text-gray-400 uppercase tracking-wide">
                Optional — share as much as you know
              </h3>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Education
                </label>
                <textarea
                  value={bioForm.education}
                  onChange={(e) => updateBio("education", e.target.value)}
                  placeholder="Schools attended, degrees earned..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Career highlights
                </label>
                <textarea
                  value={bioForm.career_highlights}
                  onChange={(e) =>
                    updateBio("career_highlights", e.target.value)
                  }
                  placeholder="Key achievements and milestones..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Honors & awards
                </label>
                <textarea
                  value={bioForm.honors}
                  onChange={(e) => updateBio("honors", e.target.value)}
                  placeholder="Recognition received..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Impact & influence
                </label>
                <textarea
                  value={bioForm.impact}
                  onChange={(e) => updateBio("impact", e.target.value)}
                  placeholder="How has she shaped history or her community..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Her full story
                </label>
                <textarea
                  value={bioForm.full_story}
                  onChange={(e) => updateBio("full_story", e.target.value)}
                  placeholder="Tell her story in your own words..."
                  rows={6}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* Reason + submitter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-poppins text-sm text-gray-400 uppercase tracking-wide">
                About your submission
              </h3>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Why are you submitting this biography?
                </label>
                <textarea
                  value={bioForm.reason}
                  onChange={(e) => updateBio("reason", e.target.value)}
                  placeholder="Tell us why this woman deserves to be documented..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-sm text-gray-700 block mb-1">
                    Your name (optional)
                  </label>
                  <input
                    type="text"
                    value={bioForm.submitter_name}
                    onChange={(e) =>
                      updateBio("submitter_name", e.target.value)
                    }
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-poppins text-sm text-gray-700 block mb-1">
                    Your email (optional)
                  </label>
                  <input
                    type="email"
                    value={bioForm.submitter_email}
                    onChange={(e) =>
                      updateBio("submitter_email", e.target.value)
                    }
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={
                !bioForm.subject_name ||
                !bioForm.country ||
                !bioForm.category ||
                !bioForm.summary
              }
              className="w-full py-3 rounded-full bg-primary text-white font-poppins transition-colors hover:bg-primarydeep disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review submission →
            </button>
          </div>
        )}

        {/* Step 2 — Archive form */}
        {step === 2 && submissionType === "archive" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-primary font-poppins text-sm"
              >
                ← Back
              </button>
              <h2 className="font-alnevrada text-2xl text-primarydeep">
                Archive document details
              </h2>
            </div>

            <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4 mb-6">
              <p className="font-poppins text-sm text-secondary">
                Archive submissions are for historical documents, photographs,
                oral histories, and artworks. Describe what you have and we'll
                be in touch about how to share the actual files.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Title or name of the document / item
                </label>
                <input
                  type="text"
                  value={archiveForm.subject_name}
                  onChange={(e) =>
                    updateArchive("subject_name", e.target.value)
                  }
                  placeholder="e.g. Letters of Funmilayo Ransome-Kuti, 1949"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-secondary"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Country or region of origin
                </label>
                <input
                  type="text"
                  value={archiveForm.country}
                  onChange={(e) => updateArchive("country", e.target.value)}
                  placeholder="e.g. Nigeria, West Africa"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-secondary"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Source or attribution
                </label>
                <input
                  type="text"
                  value={archiveForm.source}
                  onChange={(e) => updateArchive("source", e.target.value)}
                  placeholder="Where does this come from? Who created it?"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-secondary"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Describe the document
                </label>
                <textarea
                  value={archiveForm.full_story}
                  onChange={(e) => updateArchive("full_story", e.target.value)}
                  placeholder="What is this document? Why is it historically significant? What does it contain?"
                  rows={6}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-secondary resize-none"
                />
              </div>
              <div>
                <label className="font-poppins text-sm text-gray-700 block mb-1">
                  Why should this be in the archive?
                </label>
                <textarea
                  value={archiveForm.reason}
                  onChange={(e) => updateArchive("reason", e.target.value)}
                  placeholder="Tell us why this matters for African women's history..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-secondary resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-poppins text-sm text-gray-400 uppercase tracking-wide">
                Your details
              </h3>
              <p className="font-poppins text-xs text-gray-400">
                Email is required so we can contact you about sharing the files.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-sm text-gray-700 block mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={archiveForm.submitter_name}
                    onChange={(e) =>
                      updateArchive("submitter_name", e.target.value)
                    }
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="font-poppins text-sm text-gray-700 block mb-1">
                    Your email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={archiveForm.submitter_email}
                    onChange={(e) =>
                      updateArchive("submitter_email", e.target.value)
                    }
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-poppins text-sm focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={
                !archiveForm.subject_name ||
                !archiveForm.full_story ||
                !archiveForm.submitter_email
              }
              className="w-full py-3 rounded-full bg-secondary text-white font-poppins transition-colors hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review submission →
            </button>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setStep(2)}
                className="text-gray-400 hover:text-primary font-poppins text-sm"
              >
                ← Edit
              </button>
              <h2 className="font-alnevrada text-2xl text-primarydeep">
                Review your submission
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              {submissionType === "biography" ? (
                <>
                  <Row label="Type" value="Full biography" />
                  <Row label="Name" value={bioForm.subject_name} />
                  <Row label="Country" value={bioForm.country} />
                  <Row label="Category" value={bioForm.category} />
                  <Row label="Summary" value={bioForm.summary} />
                  {bioForm.education && (
                    <Row label="Education" value={bioForm.education} />
                  )}
                  {bioForm.career_highlights && (
                    <Row
                      label="Career highlights"
                      value={bioForm.career_highlights}
                    />
                  )}
                  {bioForm.honors && (
                    <Row label="Honors" value={bioForm.honors} />
                  )}
                  {bioForm.impact && (
                    <Row label="Impact" value={bioForm.impact} />
                  )}
                  {bioForm.full_story && (
                    <Row label="Full story" value={bioForm.full_story} />
                  )}
                  {bioForm.reason && (
                    <Row label="Reason" value={bioForm.reason} />
                  )}
                  {bioForm.submitter_name && (
                    <Row label="Submitted by" value={bioForm.submitter_name} />
                  )}
                </>
              ) : (
                <>
                  <Row label="Type" value="Archive document" />
                  <Row label="Title" value={archiveForm.subject_name} />
                  {archiveForm.country && (
                    <Row label="Country" value={archiveForm.country} />
                  )}
                  {archiveForm.source && (
                    <Row label="Source" value={archiveForm.source} />
                  )}
                  <Row label="Description" value={archiveForm.full_story} />
                  {archiveForm.reason && (
                    <Row label="Reason" value={archiveForm.reason} />
                  )}
                  {archiveForm.submitter_name && (
                    <Row
                      label="Submitted by"
                      value={archiveForm.submitter_name}
                    />
                  )}
                </>
              )}
            </div>

            {error && (
              <p className="font-poppins text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3 rounded-full bg-primary text-white font-poppins transition-colors hover:bg-primarydeep disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <p className="font-poppins text-xs text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="font-poppins text-sm text-gray-700 whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}

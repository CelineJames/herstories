"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type Submission = {
  id: number;
  submission_type: string;
  subject_name: string;
  country: string | null;
  category: string | null;
  summary: string | null;
  full_story: string | null;
  education: string | null;
  career_highlights: string | null;
  honors: string | null;
  impact: string | null;
  reason: string | null;
  source: string | null;
  submitter_name: string | null;
  submitter_email: string | null;
  status: string;
  created_at: string;
};

function getAdminKey() {
  return sessionStorage.getItem("admin_key") || "";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminSubmissions(): React.ReactElement {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("pending");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    const key = getAdminKey();
    if (!key) {
      router.push("/admin");
      return;
    }
    fetchSubmissions();
  }, [activeStatus]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/admin/submissions?status=${activeStatus}`,
        { headers: { "x-admin-key": getAdminKey() } },
      );
      if (res.status === 403) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setSubmissions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: number, action: "approve" | "reject") => {
    setActing(true);
    try {
      await fetch(`${BASE_URL}/admin/submissions/${id}/${action}`, {
        method: "PATCH",
        headers: { "x-admin-key": getAdminKey() },
      });
      setSelected(null);
      fetchSubmissions();
    } catch (error) {
      console.error(error);
    } finally {
      setActing(false);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-ashwhite">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="font-poppins text-sm text-gray-400 hover:text-primary transition-colors"
          >
            ← Admin
          </button>
          <h1 className="font-alnevrada text-3xl text-primarydeep">
            Submissions
          </h1>
        </div>

        {/* Status tabs */}
        <div className="flex gap-2 mb-6">
          {["pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition-colors capitalize ${
                activeStatus === status
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-primary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-alnevrada text-2xl text-gray-400">
              No {activeStatus} submissions
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelected(sub)}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-poppins ${
                          sub.submission_type === "biography"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {sub.submission_type}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-poppins ${statusColors[sub.status]}`}
                      >
                        {sub.status}
                      </span>
                    </div>
                    <h3 className="font-alnevrada text-xl text-primarydeep">
                      {sub.subject_name}
                    </h3>
                    {sub.country && (
                      <p className="font-poppins text-gray-400 text-sm capitalize">
                        {sub.country}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-poppins text-xs text-gray-400">
                      {formatDate(sub.created_at)}
                    </p>
                    {sub.submitter_name && (
                      <p className="font-poppins text-xs text-gray-400 mt-1">
                        by {sub.submitter_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-alnevrada text-2xl text-primarydeep">
                      {selected.subject_name}
                    </h2>
                    <p className="font-poppins text-gray-400 text-sm capitalize mt-1">
                      {selected.submission_type} · {selected.country}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {selected.summary && (
                  <Field label="Summary" value={selected.summary} />
                )}
                {selected.full_story && (
                  <Field label="Full story" value={selected.full_story} />
                )}
                {selected.education && (
                  <Field label="Education" value={selected.education} />
                )}
                {selected.career_highlights && (
                  <Field
                    label="Career highlights"
                    value={selected.career_highlights}
                  />
                )}
                {selected.honors && (
                  <Field label="Honors" value={selected.honors} />
                )}
                {selected.impact && (
                  <Field label="Impact" value={selected.impact} />
                )}
                {selected.reason && (
                  <Field
                    label="Reason for submission"
                    value={selected.reason}
                  />
                )}
                {selected.source && (
                  <Field label="Source" value={selected.source} />
                )}
                {selected.submitter_name && (
                  <Field label="Submitted by" value={selected.submitter_name} />
                )}
                {selected.submitter_email && (
                  <Field label="Email" value={selected.submitter_email} />
                )}
              </div>

              {selected.status === "pending" && (
                <div className="p-6 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={() => handleAction(selected.id, "approve")}
                    disabled={acting}
                    className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-poppins text-sm hover:bg-green-700 transition-colors disabled:opacity-40"
                  >
                    {acting ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleAction(selected.id, "reject")}
                    disabled={acting}
                    className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-poppins text-sm hover:bg-red-600 transition-colors disabled:opacity-40"
                  >
                    {acting ? "Processing..." : "Reject"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <p className="font-poppins text-xs text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="font-poppins text-sm text-gray-700 whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}

import React from "react";
import ChatMessage from "../components/ChatMessage";

const Report = () => {
  const saved = localStorage.getItem("input");
  const initialValue = JSON.parse(saved);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs text-white/80 tracking-widest uppercase font-medium">
                Analysis Complete
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Resume{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Report
              </span>
            </h1>
          </div>
        </div>

        {/* Score + Summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Score card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 shadow-xl">
            <span className="text-xs text-white/90 tracking-widest uppercase font-medium">
              Overall Score
            </span>
            <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500">
              78
            </span>
            <span className="text-white/90 text-sm font-medium">
              out of 100
            </span>
            <div className="w-full mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-gradient-to-r from-indigo-900 to-purple-600 rounded-full" />
            </div>
          </div>

          {/* Positives */}
          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">
                ✓
              </span>
              <h2 className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">
                Strengths
              </h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              You demonstrate strong technical skills supported by impactful and
              well-executed projects.
            </p>
          </div>

          {/* Negatives */}
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs">
                ✕
              </span>
              <h2 className="text-sm font-semibold text-red-400 tracking-wide uppercase">
                Weaknesses
              </h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Missing strong action verbs and measurable performance metrics.
            </p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-white/60 tracking-widest uppercase">
              Detailed Analysis
            </h2>
          </div>
          <div className="text-white/70 text-sm leading-relaxed">
            <ChatMessage text={initialValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReportContext } from "../context/report-context.js";

const Report = () => {
  const { report } = useContext(ReportContext);
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-2xl text-white/30">?</span>
        </div>
        <h2 className="text-white text-lg font-semibold">
          No Report Data Found
        </h2>
        <p className="text-white/40 text-sm">
          Analyze a resume first to see results here.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-5 py-2 rounded-lg text-sm font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
        >
          Go to Analyzer
        </button>
      </div>
    );
  }

  const safeScore = Math.min(Math.max(report.score || 0, 0), 100);

  const getScoreColor = (s) => {
    if (s >= 80) return "text-emerald-400";
    if (s >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getBarColor = (s) => {
    if (s >= 80) return "from-emerald-500 to-emerald-400";
    if (s >= 60) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const getScoreLabel = (s) => {
    if (s >= 90) return "Interview Ready";
    if (s >= 75) return "Strong Resume";
    if (s >= 60) return "Needs Refinement";
    return "Major Improvements Needed";
  };

  const getScoreBg = (s) => {
    if (s >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (s >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 tracking-widest uppercase font-medium">
                Analysis Complete
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Resume{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Report
              </span>
            </h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="self-start sm:self-auto px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
          >
            Analyze Another
          </button>
        </div>

        {/* Score Hero Card */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center gap-8">
            {/* Score circle */}
            <div className="relative flex-shrink-0">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  className="text-white/5"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(safeScore / 100) * 327} 327`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={
                        safeScore >= 80
                          ? "#34d399"
                          : safeScore >= 60
                            ? "#facc15"
                            : "#f87171"
                      }
                    />
                    <stop
                      offset="100%"
                      stopColor={
                        safeScore >= 80
                          ? "#6ee7b7"
                          : safeScore >= 60
                            ? "#fde68a"
                            : "#fca5a5"
                      }
                    />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-4xl font-bold ${getScoreColor(safeScore)}`}
                >
                  {safeScore}
                </span>
                <span className="text-white/30 text-xs font-medium">
                  / 100
                </span>
              </div>
            </div>

            {/* Score details */}
            <div className="flex-1 text-center sm:text-left">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 border text-xs font-medium tracking-wide mb-3 ${getScoreBg(safeScore)} ${getScoreColor(safeScore)}`}
              >
                {getScoreLabel(safeScore)}
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                {safeScore >= 80
                  ? "Your resume is competitive and well-structured. A few tweaks can make it exceptional."
                  : safeScore >= 60
                    ? "Your resume has a solid foundation but needs targeted improvements to stand out."
                    : "Your resume needs significant work. Follow the improvement areas below to strengthen it."}
              </p>
              {/* Mini bar */}
              <div className="mt-4 w-full max-w-xs h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getBarColor(safeScore)} rounded-full transition-all duration-1000`}
                  style={{ width: `${safeScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Strengths + Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-slate-900 border border-emerald-500/15 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <span className="text-emerald-400 text-sm font-bold">+</span>
              </div>
              <h2 className="text-md font-semibold text-emerald-400 tracking-wide uppercase">
                Strengths
              </h2>
            </div>
            <ul className="space-y-3">
              {report.positives?.map((item, index) => (
                <li key={index} className="flex gap-3 group">
                  <span className="flex-shrink-0 w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center mt-0.5">
                    <span className="text-emerald-400 text-[10px] font-bold">
                      {index + 1}
                    </span>
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-slate-900 border border-red-500/15 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <span className="text-red-400 text-sm font-bold">-</span>
              </div>
              <h2 className="text-md font-semibold text-red-400 tracking-wide uppercase">
                Weaknesses
              </h2>
            </div>
            <ul className="space-y-3">
              {report.negatives?.map((item, index) => (
                <li key={index} className="flex gap-3 group">
                  <span className="flex-shrink-0 w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center mt-0.5">
                    <span className="text-red-400 text-[10px] font-bold">
                      {index + 1}
                    </span>
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <span className="text-indigo-400 text-sm font-bold">#</span>
            </div>
            <h2 className="text-md font-semibold text-white tracking-wide uppercase">
              Summary
            </h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            {report.analysis?.summary}
          </p>
        </div>

        {/* Reasoning Behind Score */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <span className="text-purple-400 text-sm font-bold">?</span>
            </div>
            <h2 className="text-md font-semibold text-white tracking-wide uppercase">
              Reasoning Behind Score
            </h2>
          </div>
          <div className="space-y-3">
            {report.analysis?.reasoning_behind_score?.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 bg-slate-800/50 border border-white/5 rounded-xl p-4 hover:border-purple-500/20 transition-colors"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <span className="text-purple-400 text-xs font-bold">
                    {index + 1}
                  </span>
                </span>
                <span className="text-white/60 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-gradient-to-br from-slate-900 to-amber-950/20 border border-amber-500/15 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <span className="text-amber-400 text-sm font-bold">^</span>
            </div>
            <h2 className="text-md font-semibold text-amber-400 tracking-wide uppercase">
              Improvement Areas
            </h2>
          </div>
          <p className="text-white/30 text-xs mb-5 ml-10">
            Follow these steps to significantly boost your resume's impact.
          </p>

          <div className="space-y-3">
            {report.analysis?.improvement_area?.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-slate-900/60 border border-white/5 rounded-xl p-4 hover:border-amber-500/20 transition-colors group"
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <span className="text-amber-400 text-xs font-bold">
                      {index + 1}
                    </span>
                  </span>
                  {index <
                    (report.analysis?.improvement_area?.length || 0) - 1 && (
                    <div className="w-px flex-1 bg-amber-500/10" />
                  )}
                </div>
                <span className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center pt-2 pb-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;

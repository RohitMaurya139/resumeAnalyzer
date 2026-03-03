import { useContext } from "react";
import { ReportContext } from "../context/report-context.js";
// import ChatMessage from "../components/ChatMessage.jsx";

const Report = () => {
  const { report } = useContext(ReportContext);
  console.log(report);
  

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h2 className="text-slate-300 text-lg font-semibold">
          No Report Data Found
        </h2>
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

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
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

        {/* Score + Strengths + Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Score Card */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-xl">
            <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
              Overall Score
            </span>
            <span className={`text-6xl font-bold ${getScoreColor(safeScore)}`}>
              {safeScore}
              {console.log(report.score)}
            </span>
            <span className="text-slate-400 text-sm">out of 100</span>
            <div className="w-full mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getBarColor(safeScore)} rounded-full transition-all duration-700`}
                style={{ width: `${safeScore}%` }}
              />
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-5 shadow-xl">
            <h2 className="text-md font-semibold text-emerald-400 tracking-wide uppercase mb-3">
              ✓ Strengths
            </h2>
            <ul className="text-slate-200 text-sm font-semibold space-y-2">
              {report.positives?.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-red-950 border border-red-800 rounded-2xl p-5 shadow-xl">
            <h2 className="text-md font-semibold text-red-400 tracking-wide uppercase mb-3">
              ✕ Weaknesses
            </h2>
            <ul className="text-slate-200 text-sm font-semibold space-y-2">
              {report.negatives?.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-400 tracking-widest uppercase mb-6">
            Detailed Analysis
          </h2>

          <div className="space-y-5">
            {/* Summary */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 rounded-full bg-indigo-500 flex-shrink-0" />
                <h3 className="text-white font-semibold text-md">Summary</h3>
              </div>
              <p className="text-slate-300 text-sm font-semibold leading-relaxed">
                {report.analysis?.summary}
              </p>
            </div>

            {/* Reasoning */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 rounded-full bg-purple-500 flex-shrink-0" />
                <h3 className="text-white font-semibold text-md">
                  Reasoning Behind Score
                </h3>
              </div>
              <ul className="text-slate-200 text-sm font-semibold space-y-2">
                {report.analysis?.reasoning_behind_score?.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvement Areas */}
            <div className="bg-amber-950 border border-amber-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full bg-amber-400 flex-shrink-0" />
                <h3 className="text-white font-semibold text-md">
                  Improvement Areas
                </h3>
              </div>
              <ul className="text-slate-200 text-sm font-semibold space-y-2">
                {report.analysis?.improvement_area?.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

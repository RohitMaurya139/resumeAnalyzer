import React, { useContext, useState } from "react";
import { gemini } from "../gemini/gemini";
import { useNavigate } from "react-router-dom";
import { ReportContext } from "../context/report-context";

const SAMPLE_PLACEHOLDER = `John Doe
Software Engineer | john@email.com | (555) 123-4567

EXPERIENCE
Senior Frontend Developer — Acme Corp (2021–Present)
• Built a design system used by 12 product teams...

EDUCATION
B.S. Computer Science — State University (2017–2021)

SKILLS
JavaScript, React, TypeScript, Node.js, AWS...`;

const Input = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { report, setReport } = useContext(ReportContext);
  const navigate = useNavigate();

  async function submit() {
    setLoading(true);
    setError(null);
    const res = await gemini(input, setError);
    if (!res) {
      setLoading(false);
      return;
    }
    setReport(res);
    setLoading(false);
    navigate("/report");
  }

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Card */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl p-px transition-all duration-500 ${
          focused
            ? "bg-gradient-to-br from-indigo-500/50 via-purple-500/30 to-pink-500/20"
            : "bg-white/10"
        }`}
      >
        <div className="w-full bg-slate-950 rounded-2xl p-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-lg shadow-indigo-500/50" />
              <span className="text-xs text-white/80 tracking-widest uppercase font-medium">
                Resume Analyzer
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-white/50 font-medium tracking-wide">
                AI Ready
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-bold text-white leading-snug mb-1 tracking-tight">
            Paste your resume below
          </h1>
          <p className="text-sm text-white/50 mb-5 leading-relaxed">
            Plain text works best — copy directly from your document.
          </p>

          {/* Textarea */}
          <textarea
            name="userInput"
            id="userInput"
            placeholder={SAMPLE_PLACEHOLDER}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={loading}
            className="w-full h-64 bg-slate-900 border border-white/10 rounded-xl text-white text-sm font-mono leading-relaxed placeholder-white/20 p-4 resize-none outline-none focus:border-indigo-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          />

          {/* Meta row */}
          <div className="flex justify-between items-center mt-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 font-mono">
                <span
                  className={
                    input.length > 0 ? "text-indigo-300" : "text-white/40"
                  }
                >
                  {input.length.toLocaleString()}
                </span>{" "}
                chars
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="text-xs text-white/40 font-mono">
                <span
                  className={
                    wordCount > 0 ? "text-indigo-300" : "text-white/40"
                  }
                >
                  {wordCount}
                </span>{" "}
                words
              </span>
            </div>
            <span className="text-[10px] text-white/30 tracking-widest uppercase">
              No formatting needed
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
              <span className="text-red-400 mt-0.5 text-sm flex-shrink-0">
                !
              </span>
              <div>
                <p className="text-red-400 text-sm font-medium">
                  Analysis Failed
                </p>
                <p className="text-red-400/70 text-xs mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={submit}
            disabled={loading || !input.trim()}
            className="group w-full py-3.5 rounded-xl font-semibold text-sm tracking-widest uppercase text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Analyzing your resume...
                </>
              ) : (
                <>
                  Analyze Resume
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    &rarr;
                  </span>
                </>
              )}
            </span>
          </button>

          {/* Footer */}
          <p className="text-center text-[10px] text-white/30 tracking-widest uppercase mt-5">
            Powered by Groq · Results in seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Input;

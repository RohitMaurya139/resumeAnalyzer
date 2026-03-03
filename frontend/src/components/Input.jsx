import React, { useState } from "react";
import { gemini } from "../gemini/gemini";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  async function submit() {
    setLoading(true);
    setError(null);
    const res = await gemini(input, setError);
    localStorage.setItem("input", JSON.stringify(res));
    setLoading(false);
    navigate("/report");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Card */}
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-lg shadow-indigo-500/50" />
          <span className="text-xs text-white tracking-widest uppercase font-medium">
            Resume Analyzer
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-white leading-snug mb-1 tracking-tight">
          Paste your resume
        </h1>
        <p className="text-sm text-white mb-6 leading-relaxed">
          Plain text works best — copy directly from your document.
        </p>

        {/* Textarea wrapper with focus glow */}
        <div
          className={`rounded-xl p-px transition-all duration-300 ${focused ? "bg-gradient-to-br from-indigo-500/60 via-purple-500/30 to-transparent" : "bg-white/10"}`}
        >
          <textarea
            name="userInput"
            id="userInput"
            placeholder="Enter Your Resume in Plain Text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={loading}
            className="w-full h-56 bg-slate-900 rounded-xl text-white text-sm font-mono leading-relaxed placeholder-white/60 p-4 resize-none outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          />
        </div>

        {/* Meta row */}
        <div className="flex justify-between items-center mt-2 mb-5">
          <span className="text-xs text-white/80 font-mono">
            <span
              className={input.length > 0 ? "text-indigo-100" : "text-white/80"}
            >
              {input.length.toLocaleString()}
            </span>{" "}
            characters
          </span>
          <span className="text-xs text-white/80 tracking-wide">
            Plain text · No formatting needed
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={submit}
          disabled={loading || !input.trim()}
          className="w-full py-3 rounded-xl font-semibold text-sm tracking-widest uppercase text-white bg-gradient-to-r from-indigo-800 via-purple-900 to-purple-950 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
                Analyzing resume...
              </>
            ) : (
              "Analyze Resume →"
            )}
          </span>
        </button>

        {/* Footer note */}
        <p className="text-center text-xs text-white/80 tracking-widest uppercase mt-5">
          Powered by Groq · Results in seconds
        </p>
      </div>
    </div>
  );
};

export default Input;

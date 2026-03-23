import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-20 pb-14 px-4 bg-slate-950 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[200px] h-[200px] bg-purple-500/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Top badge */}
      <div className="relative flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <span className="text-xs text-indigo-300 tracking-widest uppercase font-medium">
          AI Powered · Instant Feedback
        </span>
      </div>

      {/* Heading */}
      <h1 className="relative text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5 max-w-3xl">
        Get Your Resume{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          Analyzed
        </span>
        <br />
        <span className="text-white/80 font-normal text-2xl sm:text-3xl mt-2 block">
          by an AI Hiring Manager
        </span>
      </h1>

      {/* Subtitle */}
      <p className="relative text-center text-white/60 text-sm sm:text-base max-w-lg leading-relaxed mb-8">
        Paste your resume in plain text and receive a detailed professional
        report — scores, strengths, weaknesses, and actionable improvements.
      </p>

      {/* Feature pills */}
      <div className="relative flex flex-wrap items-center justify-center gap-3 mb-6">
        {[
          { icon: "~", label: "Score 0–100" },
          { icon: "+", label: "Strengths & Gaps" },
          { icon: "#", label: "Actionable Tips" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2"
          >
            <span className="text-indigo-400 text-sm font-mono font-bold">
              {icon}
            </span>
            <span className="text-white/70 text-xs font-medium tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative mt-4 w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    </div>
  );
};

export default Hero;

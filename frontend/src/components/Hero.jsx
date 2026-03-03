import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 pb-10 px-4 bg-slate-950">
      {/* Top badge */}
      <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <span className="text-xs text-indigo-300 tracking-widest uppercase font-medium">
          AI Powered · Instant Feedback
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4 max-w-2xl">
        Resume{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Analysis
        </span>
        <br />
        <span className="text-white font-normal text-3xl sm:text-4xl">
          Powered by AI
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-white text-sm sm:text-base max-w-md leading-relaxed">
        Paste your resume in plain text and receive a detailed report on
        strengths, gaps, and improvements.
      </p>

      {/* Divider line */}
      <div className="mt-8 w-16 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />
    </div>
  );
};

export default Hero;

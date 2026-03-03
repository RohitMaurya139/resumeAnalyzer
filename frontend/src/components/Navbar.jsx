import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function redirect() {
    navigate("/");
  }
  function buddy() {
    window.open("https://buddy-ai-frontend.vercel.app", "_blank");
  }
  function helpDesk() {
    window.open("https://helpdesk-ai-gold.vercel.app/", "_blank");
  }
  function enterprise() {
    window.open("https://enterprise-iq-frontend.vercel.app/", "_blank");
  }

  const navLinks = [
    { label: "Buddy AI", action: buddy },
    { label: "HelpDesk AI", action: helpDesk },
    { label: "Enterprise IQ", action: enterprise },
  ];

  return (
    <nav className="w-full bg-slate-950 border-b border-white/5 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button onClick={redirect} className="flex items-center gap-2 group">
         
          <span className="font-bold text-white text-base tracking-tight group-hover:text-indigo-300 transition-colors duration-200">
            AI Resume <span className="text-indigo-400">Analyzer</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="px-4 py-1.5 rounded-lg text-sm text-white font-medium hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Powered by badge */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white font-medium tracking-wide">
              Powered by GROQ
            </span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/40 hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 border-t border-white/5 pt-3 flex flex-col gap-1 px-2">
          {navLinks.map(({ label, action }) => (
            <button
              key={label}
              onClick={() => {
                action();
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/50 font-medium hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              {label}
            </button>
          ))}
          <div className="flex items-center gap-1.5 px-4 py-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/30 font-medium">
              Powered by Gemini
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

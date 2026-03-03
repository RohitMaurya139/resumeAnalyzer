import React from 'react'
import Hero from '../components/Hero'
import Input from '../components/Input'

const Home = () => {
    function portfolio() {
        window.open("https://rm-portfolio-zeta.vercel.app/","_blank");
    }
  return (
    <>
      <div>
        <Hero />
        <Input />

        <div className="w-full bg-slate-950 border-t border-white/5 py-6 flex items-center justify-center">
          <p className="text-xs text-white tracking-widest uppercase font-medium">
            Made with <span className="text-rose-400">❤</span> by{" "}
            <span
              onClick={portfolio}
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-150 underline underline-offset-4 decoration-indigo-500/30 hover:decoration-indigo-400"
            >
              Rohit Maurya
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Home
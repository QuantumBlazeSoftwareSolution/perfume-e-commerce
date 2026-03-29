"use client";

import { useState, useEffect } from "react";

export default function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Random occasional glitch
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 200);
    }, 4000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`relative inline-block ${className}`} 
      onMouseEnter={() => setIsGlitching(true)} 
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className={`relative z-10 ${isGlitching ? "opacity-0" : ""}`}>{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-[-2px] -translate-x-[2px] text-gold z-0 animate-pulse mix-blend-multiply opacity-70">{text}</span>
          <span className="absolute top-0 left-[2px] translate-x-[2px] text-ink-2 z-0 animate-pulse mix-blend-multiply opacity-70" style={{ animationDelay: "50ms" }}>{text}</span>
        </>
      )}
    </div>
  );
}

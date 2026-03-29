"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedNumber from "../ui/AnimatedNumber";

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Animate stats in on scroll
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={containerRef} id="stats" className="w-full bg-[var(--ink)] py-20 lg:py-32 px-6 flex items-center justify-center relative z-20 border-y border-gold/10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-around gap-12 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gold/20">
        
        <div className="stat-item flex flex-col items-center justify-center w-full md:w-1/4 pt-8 md:pt-0">
          <span className="font-display font-medium italic text-5xl md:text-[clamp(3rem,6vw,5.5rem)] text-[var(--gold)] text-transparent bg-clip-text mb-4" style={{ backgroundImage: "var(--gold-gradient)" }}>
            <AnimatedNumber value={240} duration={2.5} />+
          </span>
          <span className="font-body text-xs md:text-[0.8rem] text-white/60 uppercase tracking-[0.2em] text-center mt-2 md:mt-0">
            Unique Fragrances
          </span>
        </div>

        <div className="stat-item flex flex-col items-center justify-center w-full md:w-1/4 pt-8 md:pt-0">
          <span className="font-display font-medium italic text-5xl md:text-[clamp(3rem,6vw,5.5rem)] text-[var(--gold)] text-transparent bg-clip-text mb-4" style={{ backgroundImage: "var(--gold-gradient)" }}>
            <AnimatedNumber value={18} duration={2.5} />
          </span>
          <span className="font-body text-xs md:text-[0.8rem] text-white/60 uppercase tracking-[0.2em] text-center mt-2 md:mt-0">
            Master Perfumers
          </span>
        </div>

        <div className="stat-item flex flex-col items-center justify-center w-full md:w-1/4 pt-8 md:pt-0">
          <span className="font-display font-medium italic text-5xl md:text-[clamp(3rem,6vw,5.5rem)] text-[var(--gold)] text-transparent bg-clip-text mb-4" style={{ backgroundImage: "var(--gold-gradient)" }}>
            <AnimatedNumber value={62} duration={2.5} />
          </span>
          <span className="font-body text-xs md:text-[0.8rem] text-white/60 uppercase tracking-[0.2em] text-center mt-2 md:mt-0">
            Countries Shipped
          </span>
        </div>

        <div className="stat-item flex flex-col items-center justify-center w-full md:w-1/4 pt-8 md:pt-0">
          <span className="font-display font-medium italic text-5xl md:text-[clamp(3rem,6vw,5.5rem)] text-[var(--gold)] text-transparent bg-clip-text mb-4 lg:pr-6" style={{ backgroundImage: "var(--gold-gradient)" }}>
            <AnimatedNumber value={4} duration={1.5} />.9
          </span>
          <span className="font-body text-xs md:text-[0.8rem] text-white/60 uppercase tracking-[0.2em] text-center mt-2 md:mt-0">
            Customer Rating
          </span>
        </div>

      </div>
    </section>
  );
}

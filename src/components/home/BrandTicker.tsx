"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pause animation if not in viewport
      gsap.to(".ticker-track-1", {
        xPercent: -50,
        duration: 35,
        ease: "none",
        repeat: -1,
      });

      gsap.set(".ticker-track-2", { xPercent: -50 });
      gsap.to(".ticker-track-2", {
        xPercent: 0,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.getTweensOf(".ticker-track-1").forEach(t => t.pause());
    gsap.getTweensOf(".ticker-track-2").forEach(t => t.pause());
  };

  const handleMouseLeave = () => {
    gsap.getTweensOf(".ticker-track-1").forEach(t => t.play());
    gsap.getTweensOf(".ticker-track-2").forEach(t => t.play());
  };

  const text1 = "SILLAGE · EAU DE PARFUM · MAISON SCENTARA CEYLON · HAUTE PARFUMERIE · PARIS · NICHE FRAGRANCE · 2025 COLLECTION · ";
  const text2 = "★ BERGAMOT ★ OUD NOIR ★ ROSE ABSOLUE ★ VETIVER ★ AMBERGRIS ★ SANDALWOOD ★ IRIS ★ ";

  return (
    <section 
      id="ticker" 
      ref={containerRef}
      className="w-full bg-[var(--gold)] [background-image:var(--gold-gradient)] py-[14px] overflow-hidden cursor-default select-none border-y border-gold/40 relative z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col gap-2">
        {/* Row 1 */}
        <div className="flex whitespace-nowrap w-[200vw]">
          <div className="ticker-track-1 flex w-full">
            <span className="w-1/2 flex-shrink-0 font-display italic font-light text-white tracking-[0.15em] text-lg lg:text-xl drop-shadow-sm">{text1}{text1}</span>
            <span className="w-1/2 flex-shrink-0 font-display italic font-light text-white tracking-[0.15em] text-lg lg:text-xl drop-shadow-sm">{text1}{text1}</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex whitespace-nowrap w-[200vw]">
          <div className="ticker-track-2 flex w-full">
            <span className="w-1/2 flex-shrink-0 font-display italic font-light text-white/90 tracking-[0.2em] text-sm lg:text-md uppercase">{text2}{text2}{text2}</span>
            <span className="w-1/2 flex-shrink-0 font-display italic font-light text-white/90 tracking-[0.2em] text-sm lg:text-md uppercase">{text2}{text2}{text2}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

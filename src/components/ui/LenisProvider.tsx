"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    // Wire to GSAP ticker
    const rafInfo = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafInfo);
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Refresh ScrollTrigger on window resize/height change
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup lenis on unmount
      gsap.ticker.remove(rafInfo);
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

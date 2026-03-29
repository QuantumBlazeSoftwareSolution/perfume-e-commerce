"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
    const handleResize = () => {
      lenis.resize(); // Inform lenis of new page height
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // RESET SCROLL ON ROUTE CHANGE
    // The previous scroll context was being preserved because the provider won't remount.
    // We explicitly tell lenis to scroll to top immediately on navigation.
    const resetScroll = () => {
      lenis.scrollTo(0, { immediate: true });
      // Force a resize calculation for the new page layout
      // Short delay ensures DOM is settled
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 100);
    };

    resetScroll();

    return () => {
      // Cleanup lenis on unmount
      gsap.ticker.remove(rafInfo);
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
    };
  }, [pathname]); // RE-RUN ON PATHNAME CHANGE

  return <>{children}</>;
}

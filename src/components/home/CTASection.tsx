"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      // Rotating Circles
      gsap.to(".cta-circle-1", { rotate: 360, duration: 45, repeat: -1, ease: "none" });
      gsap.to(".cta-circle-2", { rotate: -360, duration: 60, repeat: -1, ease: "none" });
      gsap.to(".cta-circle-3", { rotate: 360, duration: 80, repeat: -1, ease: "none" });

      // Heading scale scrub
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { scale: 0.95 },
          {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-6 lg:px-16 pt-32 pb-24 z-10">
      {/* Background with geometric pattern & gold gradient */}
      <div className="absolute inset-0 bg-[var(--gold)] [background-image:var(--gold-gradient)] opacity-50 z-0"></div>
      
      {/* CSS Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.10] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 10px 10px" }}></div>

      {/* Floating Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-[0.15]">
        <div className="cta-circle-1 absolute w-[300px] h-[300px] rounded-full border border-ink/80 shadow-[inset_0_0_20px_rgba(20,18,16,0.5)]"></div>
        <div className="cta-circle-2 absolute w-[500px] h-[500px] rounded-full border border-ink/60 shadow-[inset_0_0_20px_rgba(20,18,16,0.3)] border-dashed"></div>
        <div className="cta-circle-3 absolute w-[700px] h-[700px] rounded-full border border-ink/40 shadow-[inset_0_0_20px_rgba(20,18,16,0.1)]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <h2 
          ref={headingRef}
          className="font-display font-bold italic text-[clamp(2.8rem,7vw,7.5rem)] leading-none text-ink mb-8"
        >
          Begin Your<br />
          Olfactory Journey
        </h2>

        <motion.p 
          className="font-light text-ink/80 text-[clamp(1rem,2vw,1.4rem)] max-w-2xl mb-12"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          240 fragrances await. Your signature scent is among them.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <MagneticButton>
            <button className="relative px-10 py-5 rounded-full bg-[var(--gold)] [background-image:var(--gold-gradient)] text-white font-medium tracking-widest text-sm uppercase shadow-gold overflow-hidden group">
              <span className="relative z-10">Shop the Collection</span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
            </button>
          </MagneticButton>

          <MagneticButton>
            <button className="px-10 py-5 rounded-full border border-ink/30 bg-white/20 backdrop-blur-md text-ink font-medium tracking-widest text-sm uppercase hover:bg-white/40 transition-colors">
              Book a Consultation
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

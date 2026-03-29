"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitText from "../ui/SplitText";
import TextReveal from "../ui/TextReveal";
import AnimatedNumber from "../ui/AnimatedNumber";
import MagneticButton from "../ui/MagneticButton";
import { Play } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottleWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Orbs animation
    gsap.to(".orb-1", { x: 30, y: 40, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".orb-2", { x: -40, y: 30, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
    gsap.to(".orb-3", { x: 20, y: -40, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });

    // Idle float for bottle
    if (bottleWrapperRef.current) {
      gsap.to(bottleWrapperRef.current, { y: -12, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }

    // Entrance Animation Timeline
    const tl = gsap.timeline();
    // t=0.8s: bottle fades in + slides up 40px
    tl.fromTo(".hero-bottle", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.8);
    // t=1.3s: note pills
    tl.fromTo(".hero-note-pill", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.2)" }, 1.3);

    // Hide scroll indicator on scroll
    gsap.to(".scroll-indicator", {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "20% top",
        scrub: true,
      }
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bottleWrapperRef.current || !sectionRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    gsap.to(bottleWrapperRef.current, {
      rotateY: (clientX - centerX) * 0.015,
      rotateX: -(clientY - centerY) * 0.010,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!bottleWrapperRef.current) return;
    gsap.to(bottleWrapperRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative w-full min-h-[100svh] flex flex-col md:flex-row items-center overflow-hidden bg-background px-6 lg:px-16 pt-24 pb-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* BACKGROUND: Grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')", backgroundRepeat: "repeat", backgroundSize: "120px 120px" }}></div>

      {/* BACKGROUND: Faint floral watermark at 10% opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full opacity-[0.08]">
          <Image
            src="/images/hero-bg-floral.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* BACKGROUND: Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[80px] opacity-30 select-none" style={{ background: "radial-gradient(circle, var(--gold-light), transparent 70%)" }} />
        <div className="orb-2 absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[80px] opacity-25 select-none" style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }} />
        <div className="orb-3 absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full blur-[80px] opacity-30 select-none" style={{ background: "radial-gradient(circle, var(--gold-dark), transparent 70%)" }} />
      </div>

      {/* LEFT SIDE: Text Content */}
      <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center order-2 md:order-1 pt-12 md:pt-0 pl-0 md:pl-10">
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <hr className="w-8 border-gold" />
          <span className="text-[0.7rem] uppercase tracking-[0.3em] text-gold font-medium">Collection 2025</span>
          <hr className="w-8 border-gold" />
        </motion.div>

        <h1 className="font-display font-bold italic text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] -tracking-wide text-ink mb-6 flex flex-col">
          <SplitText text="The Art of" delay={0.5} />
          <SplitText text="Invisible" delay={0.65} />
          <span className="text-gradient w-fit pr-2">
            <SplitText text="Luxury." delay={0.8} />
          </span>
        </h1>

        <TextReveal delay={1.2}>
          <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-muted font-light max-w-md mb-12">
            Crafted for those who wear silence as their signature.
          </p>
        </TextReveal>

        <div className="flex gap-6 items-center mb-12">
          <div className="flex flex-col">
            <span className="font-display font-semibold italic text-3xl text-gold">
              <AnimatedNumber value={240} duration={3} />+
            </span>
            <span className="text-[0.7rem] uppercase tracking-widest text-muted mt-1">Fragrances</span>
          </div>
          <div className="w-[1px] h-10 bg-gold/30"></div>
          <div className="flex flex-col">
            <span className="font-display font-semibold italic text-3xl text-gold">
              <AnimatedNumber value={18} duration={3} />
            </span>
            <span className="text-[0.7rem] uppercase tracking-widest text-muted mt-1">Master Perfumers</span>
          </div>
          <div className="w-[1px] h-10 bg-gold/30"></div>
          <div className="flex flex-col">
            <span className="font-display font-semibold italic text-3xl text-gold">
              4.9★
            </span>
            <span className="text-[0.7rem] uppercase tracking-widest text-muted mt-1">Average Rating</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <MagneticButton>
            <motion.button 
              className="relative px-9 py-4 rounded-full bg-[var(--gold)] [background-image:var(--gold-gradient)] text-white shadow-gold overflow-hidden group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 font-medium tracking-wide text-sm">Explore Collection</span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
            </motion.button>
          </MagneticButton>

          <MagneticButton>
            <button className="flex items-center gap-3 px-6 py-4 rounded-full border border-gold text-gold hover:bg-gold/5 transition-colors">
              <div className="relative flex items-center justify-center w-6 h-6 rounded-full border border-gold">
                <Play className="w-3 h-3 ml-[2px]" fill="currentColor" />
                <div className="absolute inset-0 rounded-full border border-gold animate-ping opacity-20"></div>
              </div>
              <span className="font-medium tracking-wide text-sm">Watch Film</span>
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* RIGHT SIDE: Real Bottle Image */}
      <div className="relative z-10 w-full md:w-[45%] h-[50dvh] md:h-[80vh] flex items-center justify-center order-1 md:order-2">
        <div ref={bottleWrapperRef} className="relative w-full max-w-[340px] h-[520px] flex items-center justify-center">

          {/* Floating Note Pills */}
          <div className="hero-note-pill absolute top-[15%] left-[-5%] lg:left-[5%] glass px-3 py-1.5 rounded-pill border border-gold/40 text-[0.65rem] text-ink z-20 animate-[floatY_6s_ease-in-out_infinite]">Bergamot</div>
          <div className="hero-note-pill absolute top-[30%] right-[-5%] lg:right-[5%] glass px-3 py-1.5 rounded-pill border border-gold/40 text-[0.65rem] text-ink z-20 animate-[floatY_8s_ease-in-out_infinite_2s]">Oud</div>
          <div className="hero-note-pill absolute top-[60%] left-[-10%] lg:left-[0%] glass px-3 py-1.5 rounded-pill border border-gold/40 text-[0.65rem] text-ink z-20 animate-[floatY_7s_ease-in-out_infinite_1s]">Rose Absolue</div>
          <div className="hero-note-pill absolute top-[75%] right-[0%] lg:right-[10%] glass px-3 py-1.5 rounded-pill border border-gold/40 text-[0.65rem] text-ink z-20 animate-[floatY_9s_ease-in-out_infinite_3s]">Ambergris</div>

          {/* Real Bottle Photo */}
          <div className="hero-bottle relative w-full h-full">
            <Image
              src="/images/bottle-amber.png"
              alt="Scentara Ceylon signature perfume bottle"
              fill
              className="object-contain drop-shadow-[0_40px_80px_rgba(201,169,110,0.25)]"
              priority
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.65rem] tracking-[0.3em] font-medium text-muted uppercase rotate-[-90deg] origin-center mb-6">Scroll</span>
        <div className="w-[1px] h-12 bg-gold/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[30%] bg-gold origin-top animate-[scrollLine_1.5s_infinite_ease-in-out]"></div>
        </div>
      </motion.div>
    </section>
  );
}

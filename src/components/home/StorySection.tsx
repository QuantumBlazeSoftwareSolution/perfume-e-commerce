"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../ui/SplitText";
import { ArrowRight, Star, MousePointer2 } from "lucide-react";

const STACK_IMAGES = [
  { id: "amber", src: "/images/bottle-amber.png", alt: "Signature Ambre Bottle" },
  { id: "noir", src: "/images/bottle-noir.png", alt: "Oud Noir Bottle" },
  { id: "clear", src: "/images/bottle-clear.png", alt: "Pétale de Soie Bottle" },
  { id: "combo", src: "/images/combo-amber.png", alt: "Luxury Packaging Combo" },
];

function InteractiveStack() {
  const [cards, setCards] = useState(STACK_IMAGES);
  
  const moveToEnd = (fromIndex: number) => {
    const newCards = [...cards];
    const item = newCards.splice(fromIndex, 1)[0];
    newCards.push(item);
    setCards(newCards);
  };

  return (
    <div className="relative w-full max-w-[500px] h-[580px] flex items-center justify-center perspective-1000">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const isTop = index === 0;
          return (
            <motion.div
              key={card.id}
              layout
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) {
                  moveToEnd(0);
                }
              }}
              className="absolute w-[280px] sm:w-[320px] aspect-[3/4] cursor-grab active:cursor-grabbing"
              style={{
                zIndex: cards.length - index,
                transformOrigin: "center bottom",
              }}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ 
                scale: 1 - index * 0.06,
                y: index * -18,
                x: index % 2 === 0 ? index * 2 : index * -2,
                rotate: index === 0 ? 0 : (index % 2 === 0 ? 6 : -6),
                opacity: 1,
              }}
              exit={{ 
                x: 500, 
                opacity: 0, 
                scale: 0.8,
                rotate: 20,
                transition: { duration: 0.4 } 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              whileHover={isTop ? { scale: 1.02, rotate: 0 } : {}}
            >
              <div className="w-full h-full bg-[#F0EBE3] p-3 shadow-2xl border border-gold/10 rounded-sm">
                <div className="relative w-full h-[85%] overflow-hidden bg-[#EDE4D8]">
                  <Image 
                    src={card.src} 
                    alt={card.alt} 
                    fill 
                    className="object-cover object-center pointer-events-none" 
                    sizes="320px"
                  />
                </div>
                <div className="h-[15%] flex items-center justify-center">
                  <span className="font-display italic text-ink/40 text-xs tracking-widest uppercase">
                    SCENTARA CEYLON · Collection 2025
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Swipe Hint */}
      <motion.div 
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 text-muted/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <MousePointer2 className="w-4 h-4 animate-bounce" />
        <span className="text-[0.65rem] uppercase tracking-[0.2em] font-medium">Swipe to shuffle</span>
      </motion.div>
    </div>
  );
}

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      // Background parallax for the whole section
      gsap.to(".story-bg-layer", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="story" 
      className="w-full min-h-[100svh] bg-[var(--bg-2)] flex flex-col md:flex-row overflow-hidden relative"
    >
      {/* Visual layer for parallax */}
      <div className="story-bg-layer absolute inset-0 opacity-[0.03] pointer-events-none">
        <Image src="/images/hero-bg-floral.png" alt="" fill className="object-cover" />
      </div>

      {/* LEFT SIDE: Editorial Text */}
      <div className="w-full md:w-[45%] flex pt-24 pb-16 md:py-32 px-6 lg:pl-20 relative z-10">
        
        {/* Vertical Eyebrow */}
        <motion.div 
          className="hidden md:flex flex-col items-center mr-10 h-full"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <div className="w-[1px] h-32 bg-gold/30 mb-6"></div>
          <span 
            className="text-muted text-[0.65rem] uppercase tracking-[0.3em] font-light whitespace-nowrap rotate-180" 
            style={{ writingMode: "vertical-rl" }}
          >
            MAISON SCENTARA CEYLON · EST. 2019 · PARIS
          </span>
        </motion.div>

        {/* Content Body */}
        <div className="flex flex-col justify-center max-w-lg">
          <h2 className="font-display font-bold italic text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] text-ink mb-10">
            <SplitText text="Where chemistry" triggerOnScroll />{" "}
            <SplitText text="becomes poetry." delay={0.3} triggerOnScroll />
          </h2>

          <div className="space-y-6 text-muted font-light text-[0.95rem] leading-relaxed mb-12">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Born in a small Parisian atelier, Scentara Ceylon was founded on a singular philosophy: silence is the ultimate luxury. In a world of overwhelming noise, our fragrances speak in whispers, leaving a trail of intrigue long after you&apos;ve gone.
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              We source the rarest botanicals from Grasse, Madagascar, and Mysore, extracting their essence through centuries-old enfleurage techniques.
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Every bottle takes six months to formulate. Every drop is a memory suspended in gold.
            </motion.p>
          </div>

          <motion.a 
            href="/about"
            className="flex items-center text-ink font-medium tracking-widest uppercase text-sm group w-fit"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            Our Story
            <span className="w-8 ml-3 flex overflow-hidden">
              <span className="block w-full h-[1px] bg-ink transform translate-x-0 group-hover:translate-x-1 transition-transform group-hover:bg-gold"></span>
              <ArrowRight className="w-4 h-4 -mt-[7px] -ml-[5px] text-ink group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </span>
          </motion.a>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Photo Stack */}
      <div className="w-full md:w-[55%] relative flex items-center justify-center min-h-[70vh] md:min-h-full py-16 md:py-0">
        <div className="relative w-full max-w-[600px] h-full flex items-center justify-center">
          
          <InteractiveStack />

          {/* Floating Glass Card - preserverd from old version but adjusted positioning */}
          <motion.div 
            className="absolute bottom-[5%] md:bottom-[15%] left-0 md:left-[-10%] lg:left-0 w-[220px] glass p-5 rounded-xl z-50 shadow-lift flex flex-col gap-2 border border-white/50"
            animate={{ y: [-8, 8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex gap-1 mb-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-gold fill-gold" />)}
            </div>
            <p className="font-display italic font-semibold text-lg text-ink m-0 pt-1">
              240+ Fragrances
            </p>
            <p className="text-xs text-muted font-medium mb-0">Free Worldwide Shipping</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

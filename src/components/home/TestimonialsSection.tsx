"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "A masterpiece of modern perfumery. The sillage is intoxicating without ever being overwhelming. It has become my absolute signature.",
    author: "Elena R.",
  },
  {
    id: 2,
    quote: "I've collected niche fragrances for decades, yet nothing quite compares to the depth and evolution of these scents on the skin.",
    author: "Marcus T.",
  },
  {
    id: 3,
    quote: "Wearing Scentara Ceylon feels like an invisible armor of elegance. The compliments are endless, but the personal joy is what remains.",
    author: "Sophie L.",
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Subtle float animation for the active card wrapper
    const ctx = gsap.context(() => {
      gsap.to(".testimonial-wrapper", {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="w-full py-24 md:py-32 px-6 lg:px-16 bg-[var(--bg)] overflow-hidden flex flex-col items-center">
      <h2 className="font-display font-medium italic text-4xl md:text-5xl text-ink mb-16 text-center">
        Worn by Connoisseurs
      </h2>

      <div className="relative w-full max-w-4xl h-[420px] md:h-[350px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 flex items-center justify-center testimonial-wrapper"
          >
            <div className="glass rounded-[32px] p-10 md:p-16 w-full md:w-[85%] flex flex-col items-center text-center shadow-soft border border-white/60 relative">
              
              {/* Giant Quote Mark */}
              <span className="absolute -top-4 md:-top-8 left-6 md:left-12 font-display font-medium text-[6rem] md:text-[8rem] leading-none text-[var(--gold-light)] opacity-40 select-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-2 mb-8 z-10">
                {[1,2,3,4,5].map((i, index) => (
                  <motion.div
                    key={`${currentIndex}-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  >
                    <Star className="w-5 h-5 text-[var(--gold)] fill-[var(--gold)]" />
                  </motion.div>
                ))}
              </div>

              <p className="font-display italic font-light text-[1.2rem] md:text-[1.8rem] text-ink leading-snug mb-8 z-10 relative">
                {testimonials[currentIndex].quote}
              </p>

              <div className="flex items-center gap-3 z-10">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)]"></span>
                <span className="font-body font-medium text-xs md:text-sm tracking-widest text-[var(--gold)] uppercase">
                  {testimonials[currentIndex].author}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Dots Nav */}
      <div className="flex gap-4 mt-12 z-20">
        {testimonials.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className="group py-3 px-1.5 focus:outline-none cursor-pointer"
          >
            <div className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-10 bg-[var(--gold)]' : 'w-2 bg-[var(--gold)]/30 group-hover:bg-[var(--gold)]/60'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

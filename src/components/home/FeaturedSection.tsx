"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../ui/TextReveal";
import { Heart } from "lucide-react";

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleUnderlineRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      name: "Lumière Dorée",
      family: "Oriental Floral",
      notes: ["Amber", "Jasmine", "Vanilla"],
      price: "$280",
      image: "/images/bottle-amber.png",
      isFeatured: true,
    },
    {
      id: 2,
      name: "Oud Noir Absolu",
      family: "Woody Spicy",
      notes: ["Agarwood", "Black Pepper", "Leather"],
      price: "$320",
      image: "/images/bottle-noir.png",
    },
    {
      id: 3,
      name: "Pétale de Soie",
      family: "Floral",
      notes: ["Rose", "Peony", "Musk"],
      price: "$250",
      oldPrice: "$290",
      image: "/images/bottle-clear.png",
    },
    {
      id: 4,
      name: "Éclat d'Agrumes",
      family: "Citrus Fresh",
      notes: ["Bergamot", "Neroli", "Vetiver"],
      price: "$210",
      image: "/images/bottle-amber.png",
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Reveal underline on scroll
    if (titleUnderlineRef.current) {
      gsap.fromTo(
        titleUnderlineRef.current,
        { scaleX: 0 },
        { 
          scaleX: 1, 
          ease: "power3.out", 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    }

    // Stagger cards entrance
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.featured-card');
      gsap.fromTo(cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="featured" className="w-full py-24 md:py-32 px-6 lg:px-16 bg-[var(--bg)] relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display italic text-[clamp(2.5rem,5vw,4rem)] text-ink mb-4 relative inline-block">
          Signatures of Distinction
          <div ref={titleUnderlineRef} className="absolute -bottom-2 left-0 w-full h-[2px] bg-gold origin-left"></div>
        </h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted font-light text-lg mt-6"
        >
          Each fragrance — a world unto itself.
        </motion.p>
      </div>

      <div ref={cardsRef} className="max-w-7xl mx-auto flex overflow-x-auto md:grid md:grid-cols-4 gap-6 pb-8 snap-x snap-mandatory">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -8, boxShadow: "var(--shadow-lift)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`featured-card relative flex-shrink-0 w-[85vw] sm:w-[320px] md:w-auto h-[500px] glass rounded-card overflow-hidden transition-shadow duration-300 snap-center group ${product.isFeatured ? "md:col-span-2" : "md:col-span-1"}`}
          >
            {/* Image Area */}
            <div className="relative h-[60%] min-h-[300px] w-full overflow-hidden bg-[var(--bg-2)]">
              {/* Slide track: bottle → combo on hover */}
              <div className="absolute inset-0 flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-1/2">
                {/* Panel 1: Bottle */}
                <div className="relative w-1/2 h-full flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* Panel 2: Bottle + Box */}
                <div className="relative w-1/2 h-full flex-shrink-0">
                  <Image
                    src="/images/combo-amber.png"
                    alt={`${product.name} with box`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-pill text-[0.6rem] font-medium tracking-widest uppercase text-ink/80 border border-white/40 bg-white/30 backdrop-blur-md whitespace-nowrap">
                    With Packaging
                  </div>
                </div>
              </div>

              {/* Slide indicator dots */}
              <div className="absolute bottom-3 right-3 flex gap-1.5 z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80 transition-all duration-500 group-hover:opacity-30"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 transition-all duration-500 group-hover:opacity-100 group-hover:bg-white/80"></div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 glass px-3 py-1 rounded-pill text-[0.65rem] font-medium tracking-widest uppercase text-ink/80 border border-white/40">
                {product.family}
              </div>
              
              <button 
                className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center border border-white/40 text-[var(--ink)]/70 hover:text-gold transition-colors active:scale-95 z-20"
                onClick={(e) => {
                  const el = e.currentTarget.querySelector('svg');
                  gsap.fromTo(el, { scale: 0.5 }, { scale: 1.2, fill: "currentColor", duration: 0.4, ease: "back.out(2)", yoyo: true, repeat: 1 });
                  setTimeout(() => { if(el) el.style.fill = "currentColor" }, 800)
                }}
              >
                <Heart className="w-4 h-4 pointer-events-none" />
              </button>
            </div>

            {/* Card Body */}
            <div className="relative h-[40%] p-6 flex flex-col justify-between bg-white/40 z-10">
              <div>
                <h3 className="font-display italic font-semibold text-2xl text-ink mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold-light"></span>
                  <span className="w-2 h-2 rounded-full bg-gold"></span>
                  <span className="w-2 h-2 rounded-full bg-gold-dark"></span>
                  <p className="text-[0.75rem] text-muted font-light ml-1 pt-0.5">
                    {product.notes.join(" • ")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-end justify-between pb-2">
                <div className="flex flex-col">
                  {product.oldPrice && (
                    <span className="text-muted/60 line-through text-sm">{product.oldPrice}</span>
                  )}
                  <span className="font-body font-medium text-ink text-lg">{product.price}</span>
                </div>
              </div>

              {/* Add to Cart Slider - Note: Using tailwind arbitrary group-hover doesn't work well with complex nested translates sometimes, so we'll use motion */}
              <div className="absolute bottom-0 left-0 w-full bg-[var(--gold)] [background-image:var(--gold-gradient)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                <button 
                  className="w-full h-14 text-white font-medium text-sm tracking-widest uppercase rounded-b-card"
                  onClick={(e) => {
                    const target = e.currentTarget;
                    gsap.fromTo(target, 
                      { scale: 0.95 },
                      { scale: 1, duration: 0.3, ease: "back.out(2)" }
                    );
                    const originalText = target.textContent;
                    target.textContent = "Added to Cart";
                    setTimeout(() => target.textContent = originalText, 2000);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

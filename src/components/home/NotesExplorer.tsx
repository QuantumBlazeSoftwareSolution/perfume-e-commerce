"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import Particles from "../ui/Particles";

const notes = [
  "Floral", "Fresh", "Woody", "Citrus", 
  "Musky", "Oriental", "Spicy", "Gourmand"
];

// Map each note category to a bottle image
const NOTE_IMAGES: Record<string, string> = {
  Floral: "/images/bottle-clear.png",
  Fresh: "/images/bottle-clear.png",
  Woody: "/images/bottle-noir.png",
  Citrus: "/images/bottle-amber.png",
  Musky: "/images/bottle-clear.png",
  Oriental: "/images/bottle-amber.png",
  Spicy: "/images/bottle-noir.png",
  Gourmand: "/images/bottle-amber.png",
};

const allProducts = [
  { id: 1, name: "Rose Absolue", note: "Floral", price: "$240" },
  { id: 2, name: "Pétale de Soie", note: "Floral", price: "$250" },
  { id: 3, name: "Oceanic Fresh", note: "Fresh", price: "$200" },
  { id: 4, name: "Éclat d'Agrumes", note: "Fresh", price: "$210" },
  { id: 5, name: "Oud Noir", note: "Woody", price: "$320" },
  { id: 6, name: "Cedar Supreme", note: "Woody", price: "$270" },
  { id: 7, name: "Citrus Riviera", note: "Citrus", price: "$180" },
  { id: 8, name: "White Musk", note: "Musky", price: "$190" },
  { id: 9, name: "Sandalwood Oriental", note: "Oriental", price: "$310" },
  { id: 10, name: "Amber Spice", note: "Spicy", price: "$260" },
  { id: 11, name: "Vanilla Gourmand", note: "Gourmand", price: "$210" },
];

export default function NotesExplorer() {
  const [activeNote, setActiveNote] = useState<string>("Floral");

  const filteredProducts = allProducts.filter(p => p.note === activeNote);

  return (
    <section id="notes" className="relative w-full py-24 md:py-32 px-6 lg:px-16 bg-white overflow-hidden z-10">
      <Particles className="opacity-40" quantity={40} />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-display font-bold italic text-[clamp(2.5rem,5vw,4rem)] text-ink mb-12 text-center whitespace-nowrap">
          Find Your Signature
        </h2>

        {/* Note Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20 max-w-4xl">
          {notes.map(note => {
            const isActive = activeNote === note;
            return (
              <MagneticButton key={note}>
                <button
                  onClick={() => setActiveNote(note)}
                  className={`px-5 py-2.5 md:px-6 md:py-3 rounded-pill font-body font-medium text-xs md:text-sm transition-all duration-300 border ${
                    isActive 
                      ? "bg-[var(--gold)] [background-image:var(--gold-gradient)] text-white border-transparent shadow-[0_0_20px_rgba(201,169,110,0.4)] md:scale-105" 
                      : "bg-[var(--glass)] backdrop-blur-md text-[var(--gold)] border-gold/30 hover:bg-gold/5"
                  }`}
                >
                  {note}
                </button>
              </MagneticButton>
            );
          })}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="glass rounded-card overflow-hidden flex flex-col group cursor-pointer border border-gold/10 hover:shadow-soft"
              >
                <div className="h-60 w-full relative overflow-hidden bg-[var(--bg-2)]">
                  {/* Slide track */}
                  <div className="absolute inset-0 flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-1/2">
                    {/* Panel 1: Bottle */}
                    <div className="relative w-1/2 h-full flex-shrink-0">
                      <Image
                        src={NOTE_IMAGES[product.note] ?? "/images/bottle-clear.png"}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    {/* Panel 2: Bottle + Box */}
                    <div className="relative w-1/2 h-full flex-shrink-0">
                      <Image
                        src="/images/combo-amber.png"
                        alt={`${product.name} with box`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-pill text-[0.6rem] font-medium tracking-widest uppercase text-ink/80 border border-white/40 bg-white/30 backdrop-blur-md whitespace-nowrap">
                        With Packaging
                      </div>
                    </div>
                  </div>
                  {/* Slide dots */}
                  <div className="absolute bottom-3 right-3 flex gap-1.5 z-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80 transition-all duration-500 group-hover:opacity-30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30 transition-all duration-500 group-hover:opacity-100 group-hover:bg-white/80"></div>
                  </div>
                </div>
                <div className="p-6 bg-white/60">
                  <h3 className="font-display italic font-semibold text-2xl text-ink mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-muted text-sm tracking-widest uppercase text-[0.65rem]">{product.note}</span>
                    <span className="font-medium text-ink">{product.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

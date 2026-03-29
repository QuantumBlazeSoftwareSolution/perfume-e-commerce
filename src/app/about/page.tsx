"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import { ArrowRight } from "lucide-react";

const VALUES = [
  {
    title: "Rarity",
    body: "We source fewer than 12 raw materials per formula. Each molecule is chosen for its rarity, longevity, and emotional resonance.",
  },
  {
    title: "Patience",
    body: "Every bottle is macerated for a minimum of six months before filtration. You cannot rush a great fragrance.",
  },
  {
    title: "Silence",
    body: "We do not believe in bold announcements. Our fragrances speak in whispers that linger long after you leave the room.",
  },
];

const PERFUMERS = [
  { name: "Isabelle Laurent", title: "Head Perfumer · Paris", image: "/images/bottle-amber.png" },
  { name: "Karim El Masri", title: "Oud Specialist · Dubai", image: "/images/bottle-noir.png" },
  { name: "Yuki Tanaka", title: "Floral Architect · Tokyo", image: "/images/bottle-clear.png" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const img2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const img3Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <main ref={containerRef} className="w-full bg-[var(--bg)] pt-32 pb-40">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 mb-32 relative overflow-hidden">
        {/* Faint floral bg */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <Image src="/images/hero-bg-floral.png" alt="" fill className="object-cover object-center" priority />
        </div>

        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <hr className="w-8 border-gold" />
          <span className="text-[0.7rem] uppercase tracking-[0.3em] text-gold font-medium">Maison Aurum · Est. 2019</span>
          <hr className="w-8 border-gold" />
        </motion.div>

        <h1 className="font-display italic text-[clamp(3rem,8vw,7rem)] text-ink max-w-4xl mx-auto leading-[0.95] mb-10">
          <SplitText text="Silence is the" triggerOnScroll />
          <br />
          <span className="text-gradient">
            <SplitText text="ultimate luxury." delay={0.3} triggerOnScroll />
          </span>
        </h1>

        <motion.p
          className="text-muted font-light max-w-lg mx-auto leading-relaxed text-[1.05rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Founded in a small Parisian atelier in 2019, Maison Aurum was born out of a rebellion against noise. In a world saturated with loud fragrances, we chose to speak in whispers.
        </motion.p>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gold/30"
          initial={{ height: 0 }}
          animate={{ height: 96 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </section>

      {/* ── Cinematic Parallax Collage ────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-6 relative min-h-[120vh] md:min-h-[150vh] mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative h-full">

          {/* Block 1 — amber bottle */}
          <motion.div
            style={{ y: img1Y }}
            className="md:col-start-1 md:col-end-6 aspect-[4/5] relative overflow-hidden group border border-ink/5 shadow-lg"
          >
            <Image
              src="/images/bottle-amber.png"
              alt="Chapter I – Raw Materials"
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.6rem] tracking-[0.3em] font-medium text-white/60 uppercase mb-1">Chapter I</p>
              <p className="text-white font-display italic text-xl">The Raw Materials</p>
            </div>
          </motion.div>

          {/* Block 2 — floral flat-lay */}
          <motion.div
            style={{ y: img2Y }}
            className="md:col-start-7 md:col-end-13 aspect-square relative overflow-hidden mt-20 md:mt-40 group border border-ink/5 shadow-xl"
          >
            <Image
              src="/images/hero-bg-floral.png"
              alt="Botanical ingredients from Grasse"
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display italic text-white text-2xl mix-blend-normal">Grasse, France</p>
              <p className="text-white/60 text-xs tracking-widest uppercase mt-1">The birthplace of perfumery</p>
            </div>
          </motion.div>

          {/* Block 3 — combo shot */}
          <motion.div
            style={{ y: img3Y }}
            className="md:col-start-4 md:col-end-9 aspect-[3/4] relative overflow-hidden mt-20 md:mt-32 z-10 shadow-2xl border border-ink/10"
          >
            <Image
              src="/images/combo-amber.png"
              alt="Chapter II – The Maceration"
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.6rem] tracking-[0.3em] font-medium text-white/60 uppercase mb-1">Chapter II</p>
              <p className="text-white font-display italic text-xl">The Maceration</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Values ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-gold">Our Principles</span>
            <h2 className="font-display italic text-[clamp(2.5rem,5vw,4rem)] text-ink mt-4">Three Pillars of the Maison</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col"
            >
              <span className="font-display italic text-5xl text-gold/20 mb-4 leading-none">0{i + 1}</span>
              <h3 className="font-display italic text-2xl text-ink mb-4">{v.title}</h3>
              <p className="text-muted font-light leading-relaxed text-sm">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Perfumers ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] uppercase tracking-[0.3em] text-gold">The Creators</span>
          <h2 className="font-display italic text-[clamp(2.5rem,5vw,4rem)] text-ink mt-4">Master Perfumers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PERFUMERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-[var(--bg-2)]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              <h3 className="font-display italic text-xl text-ink">{p.name}</h3>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">{p.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Philosophy Quote ─────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 text-center space-y-12 mb-32">
        <h2 className="font-display italic text-4xl text-ink mb-10">Our Philosophy</h2>
        <p className="text-muted font-light leading-relaxed text-lg">
          We source the rarest botanicals from Grasse, Madagascar, and Mysore, extracting their essence through centuries-old enfleurage techniques combined with modern molecular precision.
        </p>
        <p className="text-muted font-light leading-relaxed text-lg">
          We do not believe in mass production. Our atelier produces limited batches every six months. Each bottle is a memory suspended in gold, formulated to respond intimately to the unique chemistry of your skin.
        </p>
        <div className="pt-10 flex justify-center">
          <div className="w-16 h-[1px] bg-gold"></div>
        </div>
        <p className="font-display italic text-2xl text-ink pt-10">
          &ldquo;A fragrance should not announce your arrival. It should prolong your departure.&rdquo;
        </p>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-ink text-white py-20 px-10 text-center">
          {/* Background image */}
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/combo-amber.png" alt="" fill className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-ink/60 to-ink/90" />

          <div className="relative z-10">
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-gold">Discover Aurum</span>
            <h2 className="font-display italic text-[clamp(2rem,5vw,4rem)] mt-4 mb-6">Find Your Signature</h2>
            <p className="text-white/60 font-light max-w-md mx-auto mb-10">
              Explore over 240 unique fragrances crafted by master perfumers from around the world.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] [background-image:var(--gold-gradient)] text-white font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Shop the Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
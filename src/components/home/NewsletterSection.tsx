"use client";

import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import gsap from "gsap";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      const btn = document.querySelector(".newsletter-btn");
      if (btn) {
        gsap.fromTo(btn, { scale: 1 }, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" });
      }

      // Confetti burst
      const container = document.querySelector(".newsletter-container");
      if (container) {
        for (let i =0; i<12; i++) {
          const confetti = document.createElement("div");
          confetti.classList.add("absolute", "w-2", "h-2", "rounded-full", "bg-[var(--gold)]", "z-50");
          confetti.style.left = "50%";
          confetti.style.top = "50%";
          container.appendChild(confetti);

          gsap.to(confetti, {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: 0,
            scale: Math.random() * 2,
            duration: 1 + Math.random(),
            ease: "power3.out",
            onComplete: () => confetti.remove()
          });
        }
      }

      setEmail("");
    }, 1000);
  };

  return (
    <section id="newsletter" className="w-full py-24 md:py-32 px-6 bg-[var(--bg-2)] flex flex-col items-center justify-center relative overflow-hidden z-20">
      <div className="newsletter-container relative z-10 flex flex-col items-center text-center max-w-[680px] w-full glass rounded-[32px] p-10 md:p-14 border border-white/60 shadow-soft">
        
        <h2 className="font-display font-medium italic text-4xl md:text-5xl text-ink mb-4">
          The Inner Circle
        </h2>
        
        <p className="font-light text-muted text-[0.95rem] md:text-[1.05rem] leading-relaxed mb-10">
          First access to new collections. Exclusive offers. Olfactory stories.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-stretch gap-4 mb-10 relative">
          <div className="relative flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={submitted || isSubmitting}
              className="w-full h-[60px] px-6 rounded-full bg-white/60 border border-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 focus:border-[var(--gold)]/50 backdrop-blur-sm text-ink placeholder-muted transition-all disabled:opacity-50"
            />
          </div>

          <MagneticButton className="sm:w-auto w-full flex-shrink-0">
            <button
              type="submit"
              disabled={submitted || isSubmitting}
              className="newsletter-btn group relative w-full sm:w-[140px] h-[60px] rounded-full bg-[var(--gold)] [background-image:var(--gold-gradient)] text-white font-medium tracking-widest uppercase text-sm shadow-[var(--shadow-gold)] flex items-center justify-center overflow-hidden transition-all disabled:opacity-80"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:not-disabled:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 disabled:hidden"></div>
              
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : submitted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  "Join"
                )}
              </span>
            </button>
          </MagneticButton>
        </form>

        <p className="text-[0.65rem] text-muted/80 uppercase tracking-widest max-w-[280px] text-center mx-auto mb-8">
          By joining, you agree to our Privacy Policy
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {["Free Samples", "No Spam", "Cancel Anytime"].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="text-[0.7rem] uppercase tracking-wider text-muted font-medium pt-[1px]">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

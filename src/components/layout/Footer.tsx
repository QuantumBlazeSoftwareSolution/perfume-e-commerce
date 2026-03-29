import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-ink text-bg-2 pt-24 pb-10 px-6 lg:px-16 border-t border-gold/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Col */}
          <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <h2 className="font-display italic font-medium text-3xl tracking-widest text-[var(--gold)] [background-image:var(--gold-gradient)] text-transparent bg-clip-text">
                AURUM
              </h2>
            </Link>
            <p className="text-white/60 font-light text-sm leading-relaxed mb-8 max-w-sm">
              Silence is the ultimate luxury. Crafted in Paris, sourced globally. 
              Our fragrances speak in whispers, leaving a trail of intrigue long after you&apos;ve gone.
            </p>
            <div className="flex items-center gap-5 text-white/50">
              <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Quick Col */}
          <div className="flex flex-col">
            <h4 className="font-body text-xs tracking-[0.2em] text-white/40 uppercase mb-6">Explore</h4>
            <ul className="space-y-4">
              {["Shop All", "Bestsellers", "New Arrivals", "Discovery Sets", "Gift Cards"].map((link) => (
                <li key={link}>
                  <Link href="/shop" className="text-white/80 hover:text-gold text-sm transition-colors font-light tracking-wide">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Brand Col */}
          <div className="flex flex-col">
            <h4 className="font-body text-xs tracking-[0.2em] text-white/40 uppercase mb-6">Maison Aurum</h4>
            <ul className="space-y-4">
              {["Our Story", "The Ingredients", "Boutiques", "Careers", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link href={link === "Our Story" ? "/about" : "#"} className="text-white/80 hover:text-gold text-sm transition-colors font-light tracking-wide">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="flex flex-col">
            <h4 className="font-body text-xs tracking-[0.2em] text-white/40 uppercase mb-6">The Inner Circle</h4>
            <p className="text-white/60 font-light text-sm mb-6 leading-relaxed">
              Subscribe to receive exclusive access to private sales and limited editions.
            </p>
            <form className="flex border-b border-white/20 pb-2 group focus-within:border-gold transition-colors">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-white/40 w-full"
                required
              />
              <button type="submit" className="text-white/50 group-focus-within:text-gold transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-[0.7rem] text-white/40 uppercase tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} Maison Aurum. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

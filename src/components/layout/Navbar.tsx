"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ShoppingBag, User, Heart,
  Flower2, Wind, Leaf, Citrus, Droplets,
  Sun, Flame, Cookie, ChevronDown, ArrowRight,
} from "lucide-react";
import { useCartStore } from "../../store/cartStore";

/* ─── Mega-menu data ──────────────────────────────────────────── */
const SHOP_MENU = {
  categories: [
    { label: "Eau de Parfum", href: "/shop?concentration=EDP", icon: Droplets, desc: "Long-lasting, rich sillage" },
    { label: "Parfum", href: "/shop?concentration=Parfum", icon: Flame, desc: "Pure extrait concentration" },
    { label: "Eau de Toilette", href: "/shop?concentration=EDT", icon: Wind, desc: "Fresh, everyday elegance" },
    { label: "Gift Sets", href: "/shop?tags=gift", icon: Cookie, desc: "Curated luxury sets" },
  ],
  scents: [
    { label: "Floral", href: "/shop?scent=Floral", icon: Flower2 },
    { label: "Woody", href: "/shop?scent=Woody", icon: Leaf },
    { label: "Citrus", href: "/shop?scent=Citrus", icon: Citrus },
    { label: "Oriental", href: "/shop?scent=Oriental", icon: Sun },
    { label: "Fresh", href: "/shop?scent=Fresh", icon: Wind },
    { label: "Spicy", href: "/shop?scent=Spicy", icon: Flame },
  ],
  featured: {
    label: "New Arrivals",
    description: "Our latest collection — bottled emotion.",
    href: "/shop?tags=new",
    image: "/images/bottle-amber.png",
    badge: "New Season",
  },
};

const COLLECTIONS_MENU = {
  collections: [
    { label: "La Nuit Obscure", href: "/shop?collection=la-nuit", desc: "Dark, hypnotic, sensual" },
    { label: "Jardin de Grasse", href: "/shop?collection=grasse", desc: "Mediterranean floral garden" },
    { label: "Orient Express", href: "/shop?collection=orient", desc: "Silk road spices & resins" },
    { label: "Blanc Immaculé", href: "/shop?collection=blanc", desc: "Pure, clean white florals" },
  ],
  highlights: [
    { label: "Bestsellers", href: "/shop?tags=bestseller" },
    { label: "Limited Edition", href: "/shop?tags=limited" },
    { label: "Sale", href: "/shop?sale=true" },
    { label: "Men", href: "/shop?gender=Masculine" },
    { label: "Women", href: "/shop?gender=Feminine" },
    { label: "Unisex", href: "/shop?gender=Unisex" },
  ],
  featured: {
    label: "Signature Collection",
    description: "Twelve olfactory worlds — one maison.",
    href: "/shop",
    image: "/images/combo-amber.png",
    badge: "2025",
  },
};

/* ─── Mega Menu Panel ─────────────────────────────────────────── */
const panelVariants = {
  hidden: { opacity: 0, y: -8, pointerEvents: "none" as const },
  visible: { opacity: 1, y: 0, pointerEvents: "auto" as const },
};

function ShopMegaMenu() {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[860px] max-w-[96vw] bg-white/95 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12)] overflow-hidden z-50"
    >
      <div className="grid grid-cols-[1fr_1fr_280px]">
        {/* Column 1 — Concentrations */}
        <div className="p-7 border-r border-gold/10">
          <p className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-5">By Concentration</p>
          <div className="flex flex-col gap-1">
            {SHOP_MENU.categories.map((item) => (
              <Link key={item.label} href={item.href}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gold/5 transition-colors group"
              >
                <span className="mt-0.5 w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <item.icon className="w-4 h-4 text-gold" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink group-hover:text-gold transition-colors">{item.label}</span>
                  <span className="block text-xs text-muted mt-0.5">{item.desc}</span>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/shop" className="mt-5 flex items-center gap-2 text-xs font-medium text-gold tracking-widest uppercase group">
            View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Column 2 — Scent Families */}
        <div className="p-7 border-r border-gold/10">
          <p className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-5">By Scent Family</p>
          <div className="grid grid-cols-2 gap-1">
            {SHOP_MENU.scents.map((item) => (
              <Link key={item.label} href={item.href}
                className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gold/5 transition-colors group"
              >
                <item.icon className="w-4 h-4 text-gold/70 group-hover:text-gold transition-colors" />
                <span className="text-sm text-ink/80 group-hover:text-ink transition-colors">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-gold/10">
            <p className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-3">Quick Picks</p>
            <div className="flex flex-wrap gap-2">
              {["Bestseller", "New", "Under $200", "Gift Set"].map(tag => (
                <Link key={tag} href={`/shop?tags=${tag.toLowerCase()}`}
                  className="px-3 py-1 text-xs border border-gold/30 rounded-full text-ink/70 hover:bg-gold hover:text-white hover:border-gold transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3 — Featured */}
        <div className="p-6 bg-[#FAF7F3] flex flex-col">
          <p className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-5">Featured</p>
          <Link href={SHOP_MENU.featured.href} className="group flex-1 flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE4D8] mb-4">
              <Image
                src={SHOP_MENU.featured.image}
                alt={SHOP_MENU.featured.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="280px"
              />
              <span className="absolute top-3 left-3 bg-ink text-white text-[0.55rem] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full">
                {SHOP_MENU.featured.badge}
              </span>
            </div>
            <p className="font-display italic text-lg text-ink group-hover:text-gold transition-colors">{SHOP_MENU.featured.label}</p>
            <p className="text-xs text-muted mt-1">{SHOP_MENU.featured.description}</p>
            <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-gold tracking-wide group-hover:gap-2.5 transition-all">
              Explore <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function CollectionsMegaMenu() {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[780px] max-w-[96vw] bg-white/95 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12)] overflow-hidden z-50"
    >
      <div className="grid grid-cols-[1fr_160px_260px]">
        {/* Column 1 — Named Collections */}
        <div className="p-7 border-r border-gold/10">
          <p className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-5">Curated Collections</p>
          <div className="flex flex-col gap-1">
            {COLLECTIONS_MENU.collections.map((item) => (
              <Link key={item.label} href={item.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gold/5 transition-colors group"
              >
                <span>
                  <span className="block text-sm font-medium text-ink group-hover:text-gold transition-colors font-display italic">{item.label}</span>
                  <span className="block text-xs text-muted mt-0.5">{item.desc}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="p-7 border-r border-gold/10">
          <p className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-5">Explore</p>
          <div className="flex flex-col gap-1">
            {COLLECTIONS_MENU.highlights.map((item) => (
              <Link key={item.label} href={item.href}
                className="text-sm text-ink/80 hover:text-gold transition-colors py-2 px-3 rounded-lg hover:bg-gold/5 flex items-center"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 — Featured */}
        <div className="p-6 bg-[#FAF7F3] flex flex-col">
          <p className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-5">2025 Collection</p>
          <Link href={COLLECTIONS_MENU.featured.href} className="group flex-1 flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE4D8] mb-4">
              <Image
                src={COLLECTIONS_MENU.featured.image}
                alt={COLLECTIONS_MENU.featured.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="260px"
              />
              <span className="absolute top-3 left-3 bg-gold text-white text-[0.55rem] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full">
                {COLLECTIONS_MENU.featured.badge}
              </span>
            </div>
            <p className="font-display italic text-lg text-ink group-hover:text-gold transition-colors">{COLLECTIONS_MENU.featured.label}</p>
            <p className="text-xs text-muted mt-1">{COLLECTIONS_MENU.featured.description}</p>
            <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-gold tracking-wide group-hover:gap-2.5 transition-all">
              View All <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>

      {/* Footer strip */}
      <div className="px-7 py-4 bg-[#F5F0EA] border-t border-gold/10 flex items-center justify-between">
        <p className="text-xs text-muted">Discover <span className="text-ink font-medium">240+</span> unique fragrances from master perfumers worldwide</p>
        <Link href="/shop" className="text-xs font-medium text-gold tracking-widest uppercase flex items-center gap-1.5 hover:gap-3 transition-all">
          Shop All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main Navbar ─────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"shop" | "collections" | null>(null);
  const pathname = usePathname();
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [cartCount, setCartCount] = useState(0);
  const storeCartCount = useCartStore((state) => state.getCartCount());
  useEffect(() => { setCartCount(storeCartCount); }, [storeCartCount]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); setActiveMenu(null); }, [pathname]);

  const openMenu = (menu: "shop" | "collections") => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(menu);
  };

  const closeMenu = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const keepOpen = () => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-4 glass border-b border-gold/10 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-ink p-1 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav (Left) */}
          <nav className="hidden md:flex items-center gap-8 w-1/3 relative">
            {/* Home */}
            <Link
              href="/"
              className={`text-sm uppercase tracking-[0.15em] transition-colors relative group font-medium ${
                pathname === "/" ? "text-gold" : "text-ink hover:text-gold"
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>

            {/* SHOP — mega-menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("shop")}
              onMouseLeave={closeMenu}
            >
              <button
                className={`flex items-center gap-1 text-sm uppercase tracking-[0.15em] transition-colors font-medium ${
                  activeMenu === "shop" || pathname.startsWith("/shop") ? "text-gold" : "text-ink hover:text-gold"
                }`}
              >
                Shop
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "shop" ? "rotate-180" : ""}`} />
              </button>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300 ${activeMenu === "shop" || pathname.startsWith("/shop") ? "w-full" : "w-0"}`} />

              <AnimatePresence>
                {activeMenu === "shop" && (
                  <div onMouseEnter={keepOpen} onMouseLeave={closeMenu}>
                    <ShopMegaMenu />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* COLLECTIONS — mega-menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("collections")}
              onMouseLeave={closeMenu}
            >
              <button
                className={`flex items-center gap-1 text-sm uppercase tracking-[0.15em] transition-colors font-medium ${
                  activeMenu === "collections" ? "text-gold" : "text-ink hover:text-gold"
                }`}
              >
                Collections
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "collections" ? "rotate-180" : ""}`} />
              </button>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300 ${activeMenu === "collections" ? "w-full" : "w-0"}`} />

              <AnimatePresence>
                {activeMenu === "collections" && (
                  <div onMouseEnter={keepOpen} onMouseLeave={closeMenu}>
                    <CollectionsMegaMenu />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <Link
              href="/about"
              className={`text-sm uppercase tracking-[0.15em] transition-colors relative group font-medium ${
                pathname === "/about" ? "text-gold" : "text-ink hover:text-gold"
              }`}
            >
              About
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300 ${pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          </nav>

          {/* Logo (Center) */}
          <Link href="/" className="flex-1 md:flex-none text-center z-50 relative pointer-events-auto">
            <h1 className="font-display italic font-medium text-3xl tracking-widest [background-image:var(--gold-gradient)] text-transparent bg-clip-text">
              SCENTARA CEYLON
            </h1>
          </Link>

          {/* Utilities (Right) */}
          <div className="flex items-center justify-end gap-5 w-1/3 z-50 relative">
            <Link href="/login" className="hidden sm:block text-ink hover:text-gold transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button className="hidden sm:block text-ink hover:text-gold transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative text-ink hover:text-gold transition-colors block">
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-white text-[9px] font-bold flex items-center justify-center leading-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[var(--bg)] flex flex-col pt-28 px-8 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "Collections", href: "/shop" },
                { label: "New Arrivals", href: "/shop?tags=new" },
                { label: "Bestsellers", href: "/shop?tags=bestseller" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-display italic text-3xl tracking-wide py-3 border-b border-gold/10 ${
                    pathname === link.href ? "text-gold" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pb-12 flex gap-6 border-t border-gold/20 pt-8">
              <Link href="/login" className="flex items-center gap-3 text-sm tracking-widest uppercase text-muted">
                <User className="w-4 h-4" /> Account
              </Link>
              <button className="flex items-center gap-3 text-sm tracking-widest uppercase text-muted">
                <Heart className="w-4 h-4" /> Wishlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop dimmer when mega menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}

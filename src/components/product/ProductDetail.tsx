"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { ChevronDown, Plus, Minus, Check, Heart, ShieldCheck, Truck, Package } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [showBox, setShowBox] = useState(false);

  const addItem = useCartStore(state => state.addItem);
  const { toggleLike, isLiked } = useWishlistStore();
  const liked = isLiked(product.id);

  // 3D rotation states
  const bottleRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bottleRef.current) return;
    const rect = bottleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateYVal = ((x - centerX) / centerX) * 15; // max 15deg
    const rotateXVal = -((y - centerY) / centerY) * 15; // max 15deg

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const priceMultiplier = selectedSize === "100ml" ? 1.8 : selectedSize === "50ml" ? 1 : 0.6;
  const currentPrice = Math.round((product.salePrice ?? product.price) * priceMultiplier);
  const originalPrice = product.salePrice ? Math.round(product.price * priceMultiplier) : null;

  return (
    <div className="w-full min-h-screen bg-[var(--bg-2)] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* LEFT: Product Image Viewer */}
        <div className="relative w-full h-[60vh] lg:h-[80vh] flex flex-col items-center justify-center sticky top-24 gap-4">
          
          {/* Image Toggle */}
          <div className="flex items-center gap-2 z-10">
            <button
              onClick={() => setShowBox(false)}
              className={`px-4 py-1.5 text-xs uppercase tracking-widest border transition-all rounded-full ${
                !showBox ? "bg-ink text-white border-ink" : "border-ink/20 text-muted hover:border-gold/50"
              }`}
            >
              Bottle
            </button>
            <button
              onClick={() => setShowBox(true)}
              className={`px-4 py-1.5 text-xs uppercase tracking-widest border transition-all rounded-full flex items-center gap-2 ${
                showBox ? "bg-ink text-white border-ink" : "border-ink/20 text-muted hover:border-gold/50"
              }`}
            >
              <Package className="w-3 h-3" /> Box
            </button>
          </div>

          <div 
            ref={bottleRef}
            className="relative w-full flex-1 max-w-[420px] flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gold/5 blur-[80px] rounded-full mix-blend-multiply"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={showBox ? "box" : "bottle"}
                initial={{ opacity: 0, scale: 0.95, x: showBox ? 40 : -40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: showBox ? -40 : 40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  animate={{ rotateX, rotateY }}
                  transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-[70%] h-[80%]"
                >
                  <Image
                    src={showBox ? product.boxImage : product.image}
                    alt={showBox ? `${product.name} packaging` : product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 60vw, 35vw"
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Floating note pills */}
            <motion.div className="absolute top-[15%] -left-[5%] glass px-3 py-1.5 rounded-pill text-[0.65rem] border border-white/40 tracking-widest uppercase pointer-events-none" animate={{ y: [-10, 10] }} transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}>{product.topNotes[0]}</motion.div>
            <motion.div className="absolute bottom-[25%] -right-[5%] glass px-3 py-1.5 rounded-pill text-[0.65rem] border border-white/40 tracking-widest uppercase pointer-events-none" animate={{ y: [10, -10] }} transition={{ repeat: Infinity, duration: 5, repeatType: "reverse", ease: "easeInOut" }}>{product.baseNotes[0]}</motion.div>
          </div>
        </div>

        {/* RIGHT: Product Details Info */}
        <div className="flex flex-col pt-10 lg:pt-20">
          
          <div className="mb-6 flex items-center justify-between">
            <span className="text-muted text-xs tracking-[0.2em] uppercase">{product.scentFamily.join(" • ")}</span>
            
            <div className="flex items-center gap-2 text-gold">
              <span className="font-medium text-sm">{product.rating}</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
              </div>
              <span className="text-muted text-xs ml-2">({product.reviewCount})</span>
            </div>
          </div>

          <h1 className="font-display italic text-5xl md:text-6xl text-ink leading-none mb-6">
            {product.name}
          </h1>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-3xl font-body font-medium text-ink">${currentPrice}</span>
            {originalPrice && (
              <span className="text-xl text-muted line-through mb-0.5">${originalPrice}</span>
            )}
            <span className="text-xs text-muted mb-1.5 ml-2 uppercase tracking-wide">Taxes included</span>
          </div>

          <p className="text-ink/80 font-light leading-relaxed mb-10 text-[0.95rem]">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-ink">Size Format</span>
              <span className="text-xs text-muted">A {selectedSize} bottle lasts ~6 months</span>
            </div>
            <div className="flex gap-3">
              {product.sizeOptions.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-3 text-sm font-medium tracking-wide border transition-all ${
                    selectedSize === size 
                      ? "border-ink bg-ink text-white" 
                      : "border-ink/20 text-ink/80 hover:border-gold/50 bg-white/40"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Controls */}
          <div className="flex items-center gap-4 mb-10">
            {/* Quantity Stepper */}
            <div className="flex items-center h-14 border border-ink/20 bg-white/40 rounded-sm">
              <button 
                className="w-12 h-full flex items-center justify-center text-ink/70 hover:text-gold"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium text-ink">{quantity}</span>
              <button 
                className="w-12 h-full flex items-center justify-center text-ink/70 hover:text-gold"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 h-14 relative flex items-center justify-center transition-all bg-[var(--gold)] [background-image:var(--gold-gradient)] text-white font-medium text-sm tracking-widest uppercase overflow-hidden group ${added ? "opacity-90" : "shadow-gold hover:opacity-90"}`}
            >
              {added ? (
                <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Added</span>
              ) : (
                <>
                  <span className="relative z-10 flex items-center gap-2">Add to Cart - ${currentPrice * quantity}</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
                </>
              )}
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => toggleLike(product.id)}
              className="w-14 h-14 border border-ink/20 bg-white/40 rounded-sm flex items-center justify-center hover:border-gold/50 transition-colors"
            >
              <Heart className={`w-5 h-5 transition-colors ${liked ? "fill-gold text-gold" : "text-ink/70"}`} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-12 py-6 border-y border-ink/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <span className="text-xs text-ink/80 tracking-wide">Authenticity Guaranteed</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gold" />
              <span className="text-xs text-ink/80 tracking-wide">Free Global Shipping</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="flex flex-col border-b border-ink/10">
            <TabHeader id="description" title="The Story" active={activeTab} setActive={setActiveTab} />
            <AnimatePresence>
              {activeTab === "description" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pb-6 text-sm text-muted font-light leading-relaxed">
                    {product.description} This extraordinary composition represents over six months of formulation and maceration, utilizing only the rarest absolutes available in independent perfumery.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <TabHeader id="notes" title="Olfactory Pyramid" active={activeTab} setActive={setActiveTab} />
            <AnimatePresence>
              {activeTab === "notes" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pb-6 flex flex-col gap-4">
                    <div><span className="text-xs uppercase tracking-widest font-medium text-ink block mb-0.5">Top Notes</span><span className="text-sm font-light text-muted">{product.topNotes.join(" • ")}</span></div>
                    <div><span className="text-xs uppercase tracking-widest font-medium text-ink block mb-0.5">Heart Notes</span><span className="text-sm font-light text-muted">{product.heartNotes.join(" • ")}</span></div>
                    <div><span className="text-xs uppercase tracking-widest font-medium text-ink block mb-0.5">Base Notes</span><span className="text-sm font-light text-muted">{product.baseNotes.join(" • ")}</span></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <TabHeader id="shipping" title="Delivery & Returns" active={activeTab} setActive={setActiveTab} />
            <AnimatePresence>
              {activeTab === "shipping" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pb-6 text-sm text-muted font-light leading-relaxed">
                    Complimentary Express Shipping on all orders. Returns are accepted within 30 days of receipt, provided the seal remains unbroken. We include a 2ml sample of your purchased fragrance with every order so you can test the scent before opening the full-size bottle.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

function TabHeader({ id, title, active, setActive }: { id: string, title: string, active: string, setActive: (id: string) => void }) {
  return (
    <button 
      onClick={() => setActive(active === id ? "" : id)}
      className="flex items-center justify-between py-5 border-t border-ink/10 first:border-0 group"
    >
      <span className="font-display italic text-lg text-ink group-hover:text-gold transition-colors">{title}</span>
      <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-300 ${active === id ? "rotate-180" : ""}`} />
    </button>
  );
}

function StarIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}

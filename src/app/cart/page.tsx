"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export default function CartInterface() {
  // Fix hydration mismatch by only rendering after mount
  const [mounted, setMounted] = useState(false);
  
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const shipping = subtotal > 300 ? 0 : 25;
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#FFFFFF]"></div>; // Fast skeleton
  }

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF] pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display italic text-5xl md:text-6xl text-ink mb-2">Your Cart</h1>
        <p className="font-body text-muted mb-12">
          {items.length === 0 ? "Your cart is currently empty." : `${items.length} item(s) reserved for you.`}
        </p>

        {items.length === 0 ? (
          <div className="w-full bg-white/40 border border-ink/10 rounded-2xl py-24 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[var(--gold)] [background-image:var(--gold-gradient)] opacity-20 mb-6"></div>
            <h2 className="font-display italic text-2xl text-ink mb-4">Nothing to see here</h2>
            <Link 
              href="/shop"
              className="px-8 py-4 bg-ink text-white font-medium text-xs tracking-widest uppercase rounded-sm hover:bg-ink/80 transition-colors"
            >
              Discover Fragrances
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Items List */}
            <div className="w-full lg:w-[65%] flex flex-col gap-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-6 p-4 glass rounded-xl bg-white/50 border border-gold/10 relative group"
                  >
                    {/* Item Image */}
                    <Link href={`/product/${item.product.id}`} className="w-full sm:w-28 h-28 sm:h-auto rounded-lg overflow-hidden relative border border-black/5 block flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="112px"
                      />
                    </Link>

                    {/* Item Info */}
                    <div className="flex-grow flex flex-col pt-1">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-display italic font-semibold text-2xl text-ink hover:text-gold transition-colors">{item.product.name}</h3>
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs uppercase tracking-widest text-muted mb-auto">{item.size} • {item.product.concentration}</p>
                      
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-6 gap-4">
                        {/* Quantity */}
                        <div className="flex items-center h-10 border border-ink/20 bg-white rounded-sm">
                          <button 
                            className="w-10 h-full flex items-center justify-center text-ink/70 hover:text-gold"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-medium text-sm text-ink">{item.quantity}</span>
                          <button 
                            className="w-10 h-full flex items-center justify-center text-ink/70 hover:text-gold"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <div className="font-body font-medium text-ink text-lg">
                          ${(Math.round((item.product.salePrice ?? item.product.price) * (item.size === "100ml" ? 1.8 : item.size === "50ml" ? 1 : 0.6))) * item.quantity}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Summary Panel */}
            <div className="w-full lg:w-[35%] bg-white/60 backdrop-blur-md rounded-2xl border border-gold/20 p-8 sticky top-32 shadow-xl shadow-gold/5">
              <h2 className="font-display italic text-3xl text-ink mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 text-sm text-ink/80 mb-6 border-b border-ink/10 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(0)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-medium text-ink">Total</span>
                <span className="text-3xl font-display font-semibold text-gold">${total.toFixed(0)}</span>
              </div>

              {/* Promo Code */}
              <div className="relative mb-8">
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  className="w-full border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-gold transition-colors pr-10"
                />
                <Tag className="w-4 h-4 text-muted absolute right-2 top-1/2 -translate-y-1/2" />
              </div>

              <button className="w-full flex items-center justify-between px-6 py-4 bg-ink text-white rounded-sm hover:bg-ink/90 transition-colors group">
                <span className="font-medium tracking-widest text-xs uppercase">Secure Checkout</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted">
                <ShieldCheck className="w-4 h-4" /> 256-bit encrypted checkout
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}

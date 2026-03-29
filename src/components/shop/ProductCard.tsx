"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleLike, isLiked } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const liked = isLiked(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizeOptions[0], 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex flex-col glass rounded-card overflow-hidden transition-shadow duration-300 hover:shadow-lift bg-white"
    >
      {/* Upper Area: Sliding Image Panel */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">

        {/* === SLIDE TRACK ===
            Two images side-by-side in a 200%-wide container.
            On hover it slides left by 50% to reveal the combo image. */}
        <div className="absolute inset-0 flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-1/2">

          {/* LEFT PANEL — Solo bottle */}
          <div className="relative w-1/2 h-full flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* RIGHT PANEL — Bottle + Box combo */}
          <div className="relative w-1/2 h-full flex-shrink-0">
            <Image
              src={product.comboImage}
              alt={`${product.name} with box`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {/* "With Packaging" label */}
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

        {/* Labels & Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="glass px-2.5 py-1 rounded-pill text-[0.6rem] font-medium tracking-widest uppercase text-ink/80 border border-white/40 bg-white/30 backdrop-blur-md">
            {product.concentration}
          </span>
          {product.salePrice && (
            <span className="bg-ink text-white px-2.5 py-1 rounded-pill text-[0.6rem] font-medium tracking-widest uppercase">
              Sale
            </span>
          )}
        </div>

        {/* Heart Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleLike(product.id);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center border border-white/40 transition-colors active:scale-95 z-20 bg-white/20 hover:bg-white/40"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? "fill-gold text-gold" : "text-ink/70"}`} />
        </button>
      </div>

      {/* Lower Area: Content */}
      <div className="p-5 flex flex-col flex-grow relative bg-white/60 backdrop-blur-sm border-t border-white/20">
        <div className="flex-grow">
          <Link href={`/product/${product.id}`} className="absolute inset-0 z-0">
            <span className="sr-only">View {product.name}</span>
          </Link>

          <p className="text-muted text-[0.65rem] tracking-[0.2em] uppercase font-light mb-1">
            {product.scentFamily[0]}
          </p>
          <h3 className="font-display italic font-semibold text-2xl text-ink leading-tight mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-light"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark"></span>
            <p className="text-[0.65rem] text-muted font-light ml-1 truncate">
              {product.topNotes[0]} • {product.heartNotes[0]}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            {product.salePrice ? (
              <>
                <span className="text-muted/50 line-through text-xs">${product.price}</span>
                <span className="font-body font-medium text-ink text-lg">${product.salePrice}</span>
              </>
            ) : (
              <span className="font-body font-medium text-ink text-lg">${product.price}</span>
            )}
          </div>
        </div>

        {/* Hover Quick Add */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
          <button
            onClick={handleAddToCart}
            className="w-full h-12 bg-ink text-white font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

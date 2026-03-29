"use client";

import { useMemo, useState } from "react";
import { useFilterStore } from "@/store/filterStore";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGrid() {
  const store = useFilterStore();
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search Query
      if (store.searchQuery && !product.name.toLowerCase().includes(store.searchQuery.toLowerCase())) {
        return false;
      }
      
      // 2. Family Match (OR logic within families)
      if (store.activeFamilies.length > 0) {
        if (!store.activeFamilies.some(f => product.scentFamily.includes(f))) {
          return false;
        }
      }

      // 3. Concentration Match
      if (store.activeConcentrations.length > 0) {
        if (!store.activeConcentrations.includes(product.concentration)) {
          return false;
        }
      }

      // 4. Gender Match
      if (store.activeGenders.length > 0) {
        if (!store.activeGenders.includes(product.gender)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (store.sortBy === "price-asc") {
        const aPrice = a.salePrice ?? a.price;
        const bPrice = b.salePrice ?? b.price;
        return aPrice - bPrice;
      }
      if (store.sortBy === "price-desc") {
        const aPrice = a.salePrice ?? a.price;
        const bPrice = b.salePrice ?? b.price;
        return bPrice - aPrice;
      }
      if (store.sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0; // "featured" leaves original array order
    });
  }, [
    store.searchQuery, 
    store.activeFamilies, 
    store.activeConcentrations, 
    store.activeGenders, 
    store.sortBy
  ]);

  return (
    <div className="flex-grow w-full">
      {/* Top Bar for Search & Showing Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gold/20 gap-4">
        <p className="font-body text-sm text-muted">
          Showing <span className="text-ink font-medium">{filteredProducts.length}</span> fragrances
        </p>

        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search notes or names..."
            className="w-full bg-white/40 border border-ink/10 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-gold/60 focus:bg-white transition-all"
            value={store.searchQuery}
            onChange={(e) => store.setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center glass rounded-xl">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-gold" />
          </div>
          <h3 className="font-display italic text-3xl text-ink mb-3">No fragrances found</h3>
          <p className="text-muted text-sm max-w-sm mb-6">
            We couldn't find any products matching those exact criteria. Try removing some filters.
          </p>
          <button 
            onClick={() => store.resetFilters()}
            className="px-6 py-2 bg-ink text-white font-medium text-xs tracking-widest uppercase rounded-sm hover:bg-ink/80 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

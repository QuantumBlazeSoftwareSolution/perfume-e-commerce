"use client";

import { useFilterStore } from "@/store/filterStore";
import { ChevronDown } from "lucide-react";

export default function SortDropdown() {
  const sortBy = useFilterStore((state) => state.sortBy);
  const setSortBy = useFilterStore((state) => state.setSortBy);

  return (
    <div className="relative group z-30">
      <button className="flex items-center gap-2 text-sm text-ink/80 border border-ink/10 bg-white/40 px-4 py-2 rounded-full hover:border-gold/50 transition-colors">
        Sort: <span className="font-medium text-ink capitalize">
          {sortBy === "price-asc" ? "Price, Low to High" : 
           sortBy === "price-desc" ? "Price, High to Low" : 
           sortBy === "rating" ? "Highest Rated" : "Featured"}
        </span>
        <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
      </button>

      <div className="absolute top-full right-0 mt-2 w-48 glass rounded-lg shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top overflow-hidden">
        <ul className="flex flex-col py-1">
          {["featured", "price-asc", "price-desc", "rating"].map((option) => (
            <li key={option}>
              <button 
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gold/10 transition-colors ${
                  sortBy === option ? "text-gold font-medium" : "text-ink/80"
                }`}
                onClick={() => setSortBy(option as any)}
              >
                {option === "price-asc" ? "Price, Low to High" : 
                 option === "price-desc" ? "Price, High to Low" : 
                 option === "rating" ? "Highest Rated" : "Featured"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

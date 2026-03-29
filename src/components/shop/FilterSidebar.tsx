"use client";

import { useFilterStore } from "@/store/filterStore";
import { ScentFamily, Concentration, Gender } from "@/data/products";
import { Check, X, SlidersHorizontal } from "lucide-react";

const families: ScentFamily[] = ["Floral", "Woody", "Citrus", "Musky", "Oriental", "Fresh", "Spicy", "Gourmand", "Earthy", "Leather", "Powdery", "Fruity", "Green", "Animalic"];
const concentrations: Concentration[] = ["EDP", "EDT", "Parfum"];
const genders: Gender[] = ["Unisex", "Masculine", "Feminine"];

export default function FilterSidebar({ isMobileOpen, closeMobile }: { isMobileOpen?: boolean; closeMobile?: () => void }) {
  const store = useFilterStore();

  const handleClear = () => {
    store.resetFilters();
  };

  const Content = (
    <div className="flex flex-col h-full bg-white md:bg-transparent">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gold/20 pt-6 md:pt-0 pl-6 pr-6 md:px-0">
        <h2 className="font-display italic text-2xl text-ink flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gold" /> Filters
        </h2>
        
        {/* Mobile close button */}
        {closeMobile && (
          <button onClick={closeMobile} className="md:hidden p-2 text-ink">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto px-6 md:px-0 space-y-10 pb-20 md:pb-0">
        
        {/* Concentration Filter */}
        <div>
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">Concentration</h3>
          <div className="flex flex-col gap-3">
            {concentrations.map(conc => (
              <label key={conc} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={store.activeConcentrations.includes(conc)}
                  onChange={() => store.toggleConcentration(conc)}
                />
                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                  store.activeConcentrations.includes(conc) ? "bg-gold border-gold" : "border-ink/20 group-hover:border-gold/50 bg-white/50"
                }`}>
                  {store.activeConcentrations.includes(conc) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm tracking-wide ${store.activeConcentrations.includes(conc) ? "text-ink font-medium" : "text-muted"}`}>
                  {conc}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Olfactory Family Filter */}
        <div>
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">Olfactory Family</h3>
          <div className="flex flex-col gap-3">
            {families.map(fam => (
              <label key={fam} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={store.activeFamilies.includes(fam)}
                  onChange={() => store.toggleFamily(fam)}
                />
                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                  store.activeFamilies.includes(fam) ? "bg-gold border-gold" : "border-ink/20 group-hover:border-gold/50 bg-white/50"
                }`}>
                  {store.activeFamilies.includes(fam) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm tracking-wide ${store.activeFamilies.includes(fam) ? "text-ink font-medium" : "text-muted"}`}>
                  {fam}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div>
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">Gender</h3>
          <div className="flex flex-col gap-3">
            {genders.map(g => (
              <label key={g} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={store.activeGenders.includes(g)}
                  onChange={() => store.toggleGender(g)}
                />
                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                  store.activeGenders.includes(g) ? "bg-gold border-gold" : "border-ink/20 group-hover:border-gold/50 bg-white/50"
                }`}>
                  {store.activeGenders.includes(g) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm tracking-wide ${store.activeGenders.includes(g) ? "text-ink font-medium" : "text-muted"}`}>
                  {g}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gold/20 px-6 md:px-0 sticky bottom-0 bg-white md:bg-transparent pb-6 md:pb-0 z-10 w-full">
        <button 
          onClick={handleClear}
          className="w-full py-3 border border-ink/20 text-ink text-xs font-medium tracking-widest uppercase hover:bg-ink hover:text-white transition-colors rounded-sm"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky) */}
      <aside className="hidden md:block w-64 flex-shrink-0 sticky top-32 h-[calc(100vh-160px)] z-10 pr-6">
        {Content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={closeMobile}></div>
          <div className="absolute top-0 right-0 w-[85vw] max-w-[320px] h-full bg-white shadow-2xl transform transition-transform duration-300">
            {Content}
          </div>
        </div>
      )}
    </>
  );
}

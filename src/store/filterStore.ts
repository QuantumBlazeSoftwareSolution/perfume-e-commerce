import { create } from 'zustand';
import { Concentration, Gender, ScentFamily } from '../data/products';

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

interface FilterState {
  searchQuery: string;
  activeFamilies: ScentFamily[];
  activeConcentrations: Concentration[];
  activeGenders: Gender[];
  priceRange: [number, number]; // [min, max]
  sortBy: SortOption;
  
  // Actions
  setSearchQuery: (query: string) => void;
  toggleFamily: (family: ScentFamily) => void;
  toggleConcentration: (concentration: Concentration) => void;
  toggleGender: (gender: Gender) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

const initialState = {
  searchQuery: "",
  activeFamilies: [] as ScentFamily[],
  activeConcentrations: [] as Concentration[],
  activeGenders: [] as Gender[],
  priceRange: [0, 500] as [number, number],
  sortBy: "featured" as SortOption,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  toggleFamily: (family) => set((state) => {
    const active = state.activeFamilies.includes(family)
      ? state.activeFamilies.filter(f => f !== family)
      : [...state.activeFamilies, family];
    return { activeFamilies: active };
  }),
  
  toggleConcentration: (concentration) => set((state) => {
    const active = state.activeConcentrations.includes(concentration)
      ? state.activeConcentrations.filter(c => c !== concentration)
      : [...state.activeConcentrations, concentration];
    return { activeConcentrations: active };
  }),
  
  toggleGender: (gender) => set((state) => {
    const active = state.activeGenders.includes(gender)
      ? state.activeGenders.filter(g => g !== gender)
      : [...state.activeGenders, gender];
    return { activeGenders: active };
  }),
  
  setPriceRange: (range) => set({ priceRange: range }),
  
  setSortBy: (sort) => set({ sortBy: sort }),
  
  resetFilters: () => set(initialState),
}));

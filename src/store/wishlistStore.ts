import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  likedProductIds: string[];
  toggleLike: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      likedProductIds: [],
      
      toggleLike: (productId: string) => {
        set((state) => {
          const exists = state.likedProductIds.includes(productId);
          if (exists) {
            return { likedProductIds: state.likedProductIds.filter(id => id !== productId) };
          } else {
            return { likedProductIds: [...state.likedProductIds, productId] };
          }
        });
      },
      
      isLiked: (productId: string) => {
        return get().likedProductIds.includes(productId);
      },
      
      clearWishlist: () => set({ likedProductIds: [] }),
    }),
    {
      name: 'aurum-wishlist-storage',
    }
  )
);

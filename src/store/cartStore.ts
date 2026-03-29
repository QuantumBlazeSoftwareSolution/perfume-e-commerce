import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, SizeOption } from '../data/products';

export interface CartItem {
  id: string; // unique cart item id (product.id + size)
  product: Product;
  size: SizeOption;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: SizeOption, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size, quantity = 1) => {
        set((state) => {
          const expectedId = `${product.id}-${size}`;
          const existingItemIndex = state.items.findIndex(item => item.id === expectedId);
          
          if (existingItemIndex >= 0) {
            // Update quantity if item already exists with same size
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }
          
          // Add new item
          return { 
            items: [...state.items, { id: expectedId, product, size, quantity }] 
          };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.salePrice ?? item.product.price;
          // Simple size multiplier logic for mock purposes (larger sizes cost more)
          const multiplier = item.size === "100ml" ? 1.8 : item.size === "50ml" ? 1 : 0.6;
          return total + (price * multiplier * item.quantity);
        }, 0);
      },
      
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'aurum-cart-storage',
    }
  )
);

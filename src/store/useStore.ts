import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShoppingListItem, ProductWithPrices, StoreName, OptimizedList, StoreGroup } from '../types';
import { getEffectivePrice } from '../data/products';

interface AppState {
  // Shopping List
  shoppingList: ShoppingListItem[];
  addToList: (product: ProductWithPrices, quantity?: number) => void;
  removeFromList: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleChecked: (id: string) => void;
  clearList: () => void;

  // Optimized list calculation
  getOptimizedList: () => OptimizedList;

  // Fridge items (for recipe matching)
  fridgeItems: string[];
  setFridgeItems: (items: string[]) => void;
  addFridgeItem: (item: string) => void;
  removeFridgeItem: (item: string) => void;
  clearFridge: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      shoppingList: [],

      addToList: (product, quantity = 1) => {
        const { shoppingList } = get();
        const existing = shoppingList.find(item => item.product.id === product.id);
        if (existing) {
          set({
            shoppingList: shoppingList.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            shoppingList: [
              ...shoppingList,
              {
                id: product.id,
                product,
                quantity,
                checked: false,
              },
            ],
          });
        }
      },

      removeFromList: (id) => {
        set({ shoppingList: get().shoppingList.filter(item => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromList(id);
          return;
        }
        set({
          shoppingList: get().shoppingList.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      toggleChecked: (id) => {
        set({
          shoppingList: get().shoppingList.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        });
      },

      clearList: () => set({ shoppingList: [] }),

      getOptimizedList: () => {
        const { shoppingList } = get();
        const storeGroups: Record<string, ShoppingListItem[]> = {};
        let totalCost = 0;
        let worstCaseCost = 0;

        for (const item of shoppingList) {
          let cheapestStore: StoreName = 'Pak\'nSave';
          let cheapestPrice = Infinity;
          let mostExpensivePrice = 0;

          for (const sp of item.product.prices) {
            const effectivePrice = getEffectivePrice(sp);
            if (effectivePrice < cheapestPrice) {
              cheapestPrice = effectivePrice;
              cheapestStore = sp.store;
            }
            if (sp.price > mostExpensivePrice) {
              mostExpensivePrice = sp.price;
            }
          }

          if (!storeGroups[cheapestStore]) {
            storeGroups[cheapestStore] = [];
          }
          storeGroups[cheapestStore].push(item);
          totalCost += cheapestPrice * item.quantity;
          worstCaseCost += mostExpensivePrice * item.quantity;
        }

        const groups: StoreGroup[] = Object.entries(storeGroups).map(([store, items]) => {
          const storeTotal = items.reduce((sum, item) => {
            const sp = item.product.prices.find(p => p.store === store);
            const price = sp ? getEffectivePrice(sp) : 0;
            return sum + price * item.quantity;
          }, 0);

          return {
            store: store as StoreName,
            items,
            total: storeTotal,
          };
        });

        return {
          groups,
          totalCost,
          totalSavings: worstCaseCost - totalCost,
          worstCaseCost,
        };
      },

      // Fridge
      fridgeItems: [],
      setFridgeItems: (items) => set({ fridgeItems: items }),
      addFridgeItem: (item) => {
        const { fridgeItems } = get();
        if (!fridgeItems.includes(item)) {
          set({ fridgeItems: [...fridgeItems, item] });
        }
      },
      removeFridgeItem: (item) => {
        set({ fridgeItems: get().fridgeItems.filter(i => i !== item) });
      },
      clearFridge: () => set({ fridgeItems: [] }),
    }),
    {
      name: 'pricecompare-storage',
    }
  )
);

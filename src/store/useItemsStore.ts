import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Item } from "@prisma/client";

interface ItemState {
  items: Pick<Item, "id" | "name" | "quantity" | "checked" | "notes">[];
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  toggleItem: (itemId: string) => void;
  updateItem: (itemId: string, name: string, quantity: number) => void;
  deleteAllItems: () => void;
};

export const useItemsStore = create<ItemState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => ({ items: [...state.items, newItem] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      toggleItem: (id) =>
        set((state) => ({ items: state.items.map(i => i.id === id ? { ...i, checked: !i.checked } : i) })),
      updateItem: (id, name, quantity) =>
        set((state) => ({ items: state.items.map(i => i.id === id ? { ...i, name, quantity } : i) })),
      deleteAllItems: () => set({ items: [] }),
    }),
    {
      name: 'my-items',
    }
  )
);

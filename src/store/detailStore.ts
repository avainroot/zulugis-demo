import type { TElement } from "@/types";
import { create } from "zustand";

interface IDetailStore {
  detail: TElement[];
  open: boolean;
  pending: boolean;
  setOpen: (open: boolean) => void;
  setPending: (pending: boolean) => void;
  showDetail: () => void;
  closeDetail: () => void;
  setDetail: (detail: TElement[]) => void;
}

export const useDetailStore = create<IDetailStore>((set) => ({
  detail: [],
  open: false,
  pending: false,
  setOpen: (open) => set({ open }),
  setPending: (pending) => set({ pending }),
  showDetail: () => set({ open: true, pending: true }),
  closeDetail: () => set({ open: false }),
  setDetail: (detail) => set({ detail }),
}));

import { create } from "zustand";

interface NavigateStoreState {
  isScrolled: number;
  setIsScrolled: (isScrolled: number) => void;
}

const useNavigateStore = create<NavigateStoreState>((set) => ({
  isScrolled: 0,
  setIsScrolled: (isScrolled: number) => set({ isScrolled }),
}));

export default useNavigateStore;

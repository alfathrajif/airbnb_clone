import { create } from "zustand";

interface NavbarStoreState {
  isScrolled: number;
  setIsScrolled: (isScrolled: number) => void;
}

const useNavbarStore = create<NavbarStoreState>((set) => ({
  isScrolled: 0,
  setIsScrolled: (isScrolled: number) => set({ isScrolled }),
}));

export default useNavbarStore;

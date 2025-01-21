import { create } from "zustand";

interface NavbarStoreState {
  isScrolled: number;
  setIsScrolled: (isScrolled: number) => void;
  isDropSearch: boolean;
  setIsDropSearch: (isDropSearch: boolean) => void;
  hover: string;
  setHover: (hover: string) => void;
  click: string;
  setClick: (click: string) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const useNavbarStore = create<NavbarStoreState>((set) => ({
  isScrolled: 0,
  setIsScrolled: (isScrolled: number) => set({ isScrolled }),
  isDropSearch: false,
  setIsDropSearch: (isDropSearch: boolean) => set({ isDropSearch }),
  hover: "",
  setHover: (hover: string) => set({ hover }),
  click: "",
  setClick: (click: string) => set({ click }),
  activeTab: "stays",
  setActiveTab: (activeTab: string) => set({ activeTab }),
}));

export default useNavbarStore;

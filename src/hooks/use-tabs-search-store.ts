import { create } from "zustand";

interface SearchTabsStoreState {
  isHovered: number | null;
  setIsHovered: (isHovered: number | null) => void;
  isClicked: number | null;
  setIsClicked: (isClicked: number | null) => void;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
  hasDropdown: boolean;
  setHasDropdown: (hasDropdown: boolean) => void;
  handleActiveDropdown: (index: number) => void;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  closeDropdown: () => void;
}

const useSearchTabsStore = create<SearchTabsStoreState>((set, get) => ({
  isHovered: 0,
  setIsHovered: (isHovered) => set({ isHovered }),
  isClicked: 0,
  setIsClicked: (isClicked) => set({ isClicked }),
  hasDropdown: false,
  setHasDropdown: (hasDropdown) => set({ hasDropdown }),
  isSearch: false,
  setIsSearch: (isSearch) => set({ isSearch }),
  handleActiveDropdown: (index) => {
    const { isClicked, setIsClicked, setHasDropdown } = get();

    if (isClicked !== 1) {
      setIsClicked(isClicked === index ? null : index);
    } else {
      setIsClicked(index);
    }
    setHasDropdown(true);
  },
  handleMouseEnter: (index) => set({ isHovered: index }),
  handleMouseLeave: () => set({ isHovered: null }),
  closeDropdown: () =>
    set({
      isClicked: null,
      hasDropdown: false,
      isHovered: null,
    }),
}));

export default useSearchTabsStore;

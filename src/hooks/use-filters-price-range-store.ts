import { create } from "zustand";

interface FiltersPriceRangeStoreState {
  // slider
  sliderMin: number;
  setSliderMin: (minPrice: number) => void;
  sliderMax: number;
  setSliderMax: (maxPrice: number) => void;
  // entry
  printMinPrice: number;
  setPrintMinPrice: (minPrice: number) => void;
  printMaxPrice: number;
  setPrintMaxPrice: (maxPrice: number) => void;
  // values
  sliderMinValue: number;
  setSliderMinValue: (value: number) => void;
  sliderMaxValue: number;
  setSliderMaxValue: (value: number) => void;
}

const useFiltersPriceRangeStore = create<FiltersPriceRangeStoreState>(
  (set) => ({
    // slider
    sliderMin: 0,
    setSliderMin: (minPrice) => set({ sliderMin: minPrice }),
    sliderMax: 0,
    setSliderMax: (maxPrice) => set({ sliderMax: maxPrice }),
    // entry
    printMinPrice: 0,
    setPrintMinPrice: (minPrice) =>
      set({ printMinPrice: minPrice, sliderMinValue: minPrice }),
    printMaxPrice: 0,
    setPrintMaxPrice: (maxPrice) =>
      set({ printMaxPrice: maxPrice, sliderMaxValue: maxPrice }),
    // values
    sliderMinValue: 0,
    setSliderMinValue: (value) =>
      set((state) => {
        if (value <= state.sliderMaxValue) {
          return { sliderMinValue: value };
        }
        return state;
      }),
    sliderMaxValue: 0,
    setSliderMaxValue: (value) =>
      set((state) => {
        if (value >= state.sliderMinValue) {
          return { sliderMaxValue: value };
        }
        return state;
      }),
  })
);

export default useFiltersPriceRangeStore;

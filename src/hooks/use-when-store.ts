import { create } from "zustand";

interface WhenStoreState {
  selectedDates: string[];
  setSelectedDates: (selectedDates: string[]) => void;
  selectedMonths: string;
  setSelectedMonths: (selectedMonths: string) => void;
}

export const useWhenStore = create<WhenStoreState>((set) => ({
  selectedDates: [],
  setSelectedDates: (selectedDates: string[]) => set({ selectedDates }),
  selectedMonths: "",
  setSelectedMonths: (selectedMonths: string) => set({ selectedMonths }),
}));

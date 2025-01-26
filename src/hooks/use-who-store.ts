import { create } from "zustand";

interface WhoStoreState {
  guest: number;
  setGuest: (guest: number) => void;
  adults: number;
  setAdults: (adults: number) => void;
  children: number;
  setChildren: (children: number) => void;
  infants: number;
  setInfants: (infants: number) => void;
  pets: number;
  setPets: (pets: number) => void;
}

const useWhoStore = create<WhoStoreState>((set) => ({
  guest: 0,
  setGuest: (guest) => set({ guest }),
  adults: 0,
  setAdults: (adults) => set({ adults }),
  children: 0,
  setChildren: (children) => set({ children }),
  infants: 0,
  setInfants: (infants) => set({ infants }),
  pets: 0,
  setPets: (pets) => set({ pets }),
}));

export default useWhoStore;

import { create } from "zustand";

interface ModalState {
    searchIcon: string;
    clickedIcon: string | null;
    openModal: boolean;
    openSuccessDialog: boolean;
    setSearchIcon: (icon: string) => void;
    setClickedIcon: (icon: string | null) => void;
    setOpenModal: (open: boolean) => void;
    setOpenSuccessDialog: (open: boolean) => void;
}
  
export const useModalStore = create<ModalState>((set) => ({
    searchIcon: 'car',
    clickedIcon: null,
    openModal: false,
    openSuccessDialog: false,
    setSearchIcon: (icon: string) => set({ searchIcon: icon }),
    setClickedIcon: (icon: string | null) => set({ clickedIcon: icon }),
    setOpenModal: (open: boolean) => set({ openModal: open }),
    setOpenSuccessDialog: (open: boolean) => set({ openSuccessDialog: open }),
}));
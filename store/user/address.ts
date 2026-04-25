import { create } from "zustand";
import { Address } from "../../types/user/deliveryAddress";

interface AddressStore {
  addresses: Address[];
  selectedAddress: Address | null;

  setAddresses: (data: Address[]) => void;
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;

  setSelectedAddress: (address: Address | null) => void;
  clearAddresses: () => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  addresses: [],
  selectedAddress: null,

  setAddresses: (data) => set({ addresses: data }),

  addAddress: (address) =>
    set((state) => ({ addresses: [address, ...state.addresses] })),

  updateAddress: (updatedAddress) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      ),
      // keep selectedAddress in sync if it was the updated one
      selectedAddress:
        state.selectedAddress?.id === updatedAddress.id
          ? updatedAddress
          : state.selectedAddress,
    })),

  deleteAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((addr) => addr.id !== id),
      // clear selectedAddress if the deleted one was selected
      selectedAddress:
        state.selectedAddress?.id === id ? null : state.selectedAddress,
    })),

  setSelectedAddress: (address) => set({ selectedAddress: address }),

  clearAddresses: () => set({ addresses: [], selectedAddress: null }),
}));
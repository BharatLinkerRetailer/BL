import firestore from "@react-native-firebase/firestore";
import { useAddressStore } from "../../store/user/address";
import { Address } from "../../types/user/deliveryAddress";

export type AddressInput = Omit<Address, "id" | "createdAt" | "updatedAt">;

const MAX_ADDRESSES = 5;

// ─── Helpers ───────────────────────────────────────────

const addressesRef = (userId: string) =>
  firestore().collection("users").doc(userId).collection("addresses");

const addressDocRef = (userId: string, addressId: string) =>
  firestore()
    .collection("users")
    .doc(userId)
    .collection("addresses")
    .doc(addressId);

// ─── Get all addresses ─────────────────────────────────

export const getAddresses = async (userId: string): Promise<Address[]> => {
  const snap = await addressesRef(userId).get();

  const addresses = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(addresses);
  return addresses as Address[];
};

// ─── Add address ───────────────────────────────────────

export const addAddress = async (
  userId: string,
  input: AddressInput
): Promise<Address> => {
  console.log("Adding address for:", userId);

  const snap = await addressesRef(userId).get();

  if (snap.size >= MAX_ADDRESSES) {
    throw new Error(`Max ${MAX_ADDRESSES} addresses allowed`);
  }

  const newAddress = {
    ...input,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  // ✅ Remove undefined fields
  const cleanData = Object.fromEntries(
    Object.entries(newAddress).filter(([_, v]) => v !== undefined)
  );

  try {
    const newRef = await addressesRef(userId).add(cleanData);

    const finalAddress = {
      id: newRef.id,
      ...cleanData,
    } as Address;

    console.log("Saved ✅ Address added:", newRef.id);

    // 🔥 UPDATE ZUSTAND
    useAddressStore.getState().addAddress(finalAddress);
    return finalAddress;
  } catch (err) {
    console.log("Error ❌", err);
    throw err;
  }
};

// ─── Update address ────────────────────────────────────

export const updateAddress = async (
  userId: string,
  addressId: string,
  updates: Partial<AddressInput>
): Promise<void> => {
  const ref = addressDocRef(userId, addressId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw new Error("Address not found");
  }

  await ref.update({
    ...updates,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });

  console.log("Address updated:", addressId);
};

// ─── Delete address ────────────────────────────────────

export const deleteAddress = async (
  userId: string,
  addressId: string
): Promise<void> => {
  const ref = addressDocRef(userId, addressId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw new Error("Address not found");
  }

  await ref.delete();

  console.log("Address deleted:", addressId);
};
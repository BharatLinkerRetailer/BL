import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { UserData } from "../../types/user/user";

const toUserData = (data: FirebaseFirestoreTypes.DocumentData): UserData =>
  data as UserData;

export const syncUserWithFirestore = async (
  firebaseUser: FirebaseAuthTypes.User | null
): Promise<UserData | null> => {
  if (!firebaseUser) return null;

  const userRef = firestore().collection("users").doc(firebaseUser.uid);
  const userSnap = await userRef.get();

  console.log("User-sync with firebase");

  if (userSnap.exists()) {  // ✅ called as function
    console.log("✅ User exists → update last login");

    const updates = {
      lastLogin: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    await userRef.update(updates);

    return toUserData({ ...userSnap.data(), ...updates });
  } else {
    const newUser: UserData = {
      firebaseUid: firebaseUser.uid,
      phoneNumber: firebaseUser.phoneNumber ?? "",
      email: firebaseUser.email ?? "",

      name: "",
      profilePictureUrl: "",
      preferredLanguage: "en",

      role: "user",
      isActive: true,
      isBanned: false,

      emailVerified: firebaseUser.emailVerified,
      phoneVerified: !!firebaseUser.phoneNumber,
      emailMarketingOptIn: false,
      notificationEnabled: true,

      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
      lastLogin: firestore.FieldValue.serverTimestamp(),

      deletedAt: null,
    };

    await userRef.set(newUser);
    return newUser;
  }
};

export const updateUserInfo = async (
  firebaseUser: FirebaseAuthTypes.User | null,
  newName: string,
  newEmail: string
): Promise<UserData | null> => {
  if (!firebaseUser) return null;

  const userRef = firestore().collection("users").doc(firebaseUser.uid);

  await userRef.update({
    name: newName,
    email: newEmail,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });

  const updatedDoc = await userRef.get();

  if (!updatedDoc.exists()) return null;  // ✅ called as function
  return updatedDoc.data() as UserData;
};
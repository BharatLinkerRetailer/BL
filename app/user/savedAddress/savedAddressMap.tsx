import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SavedAddressMapScreenPage from "../../../components/user/savedAddress/map/savedAddressMapScreenPage";

export default function User() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <SavedAddressMapScreenPage />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

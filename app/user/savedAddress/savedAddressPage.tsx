import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import IndexSavedAddressScreen from "../../../components/user/savedAddress/index/IndexSavedAddress";

export default function User() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <IndexSavedAddressScreen/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

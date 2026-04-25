import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import IndexFormScreen from "../../../components/user/savedAddress/form/indexFormScreen";

export default function User() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <IndexFormScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

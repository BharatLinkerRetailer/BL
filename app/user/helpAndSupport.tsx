
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HelpAndSupport from "../../components/user/helpAndSupport/index"

export default function HelpAndSupportPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <HelpAndSupport/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

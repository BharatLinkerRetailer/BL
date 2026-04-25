
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {UserHome} from "../../components/user/index/home"

export default function User() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <UserHome/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

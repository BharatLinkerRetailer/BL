
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {ProfileScreen} from "../../components/user/profile/index"

export default function User() {
 

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <ProfileScreen/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

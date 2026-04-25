import { Tabs } from "expo-router";
import ShopTabBar from "../../components/(shop)/shopTabbar";

export default function Layout() {
  return (
    <>
      <Tabs
      
        screenOptions={{ headerShown: false }}
        tabBar={() => <ShopTabBar />}
      >
        <Tabs.Screen name="info/index" />
        <Tabs.Screen name="product/index" />
        <Tabs.Screen name="post/index" />
      </Tabs>
    </>
  );
}

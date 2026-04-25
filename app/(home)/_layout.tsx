import { Tabs } from "expo-router";
import HomeTabBar from "../../components/(home)/homeTabbar";

export default function Layout() {
  return (
    <>
      <Tabs
      
        screenOptions={{ headerShown: false }}
        tabBar={() => <HomeTabBar />}
      >
        <Tabs.Screen name="home/index" />
        <Tabs.Screen name="shop/index" />
        <Tabs.Screen name="category/index" />
        <Tabs.Screen name="shorts/index" />
      </Tabs>
    </>
  );
}

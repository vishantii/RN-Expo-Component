import { TabBar } from "@/components";
import { Tabs } from "expo-router";
import Routes from "../constant/routes";

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name={Routes.Tabs.Home} options={{ title: "Home" }} />
      <Tabs.Screen name={Routes.Tabs.User} options={{ title: "User" }} />
      <Tabs.Screen name={Routes.Tabs.Profile} options={{ title: "Profile" }} />
    </Tabs>
  );
}

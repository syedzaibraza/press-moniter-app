import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/CustomDrawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f9fafb",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerStyle: {
            backgroundColor: "#f9fafb",
            width: 250,
            marginBottom: 30,
          },
        }}
      >
        <Drawer.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name="services"
          options={{
            title: "Services",
          }}
        />
        <Drawer.Screen
          name="changePassword"
          options={{
            title: "Change Password",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

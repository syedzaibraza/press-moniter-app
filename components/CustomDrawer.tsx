import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, usePathname } from "expo-router";
import { useNavigationState } from "@react-navigation/native";

export default function CustomDrawerContent(props: any) {
  const [settingsOpen, setSettingsOpen] = useState(false); // State to manage dropdown
  const [services, setServices] = useState(false); // State to manage dropdown

  const currentRoute = usePathname();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="items-center">
        <Image
          source={require("../assets/images/logo.png")} // Replace with your image path
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
      </View>
      <View className="gap-3">
        <TouchableOpacity
          className={`flex-row items-center px-5 py-3 ${
            currentRoute === "/dashboard"
              ? "bg-blue-200 border-blue-500"
              : "bg-transparent border-transparent"
          } rounded-lg`}
          onPress={() => props.navigation.navigate("dashboard")}
        >
          <MaterialIcons
            name="dashboard-customize"
            size={24}
            color={currentRoute === "/dashboard" ? "#2563eb" : "#000"}
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
            }}
            className={`${
              currentRoute === "/dashboard" ? "text-blue-600" : "text-black"
            }`}
          >
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center px-5 py-2.5"
          onPress={() => setServices(!services)}
        >
          <MaterialIcons
            name="miscellaneous-services"
            size={24}
            color="black"
          />
          <Text style={{ marginLeft: 20, fontSize: 16 }}>Services</Text>
          <Ionicons
            name={services ? "chevron-up" : "chevron-down"}
            size={20}
            color="black"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        {services && (
          <TouchableOpacity
            style={{ paddingLeft: 40 }}
            className={`${
              currentRoute === "/services"
                ? "bg-blue-200 border-blue-500 rounded-lg"
                : "#000"
            }`}
            onPress={() => props.navigation.navigate("services")}
          >
            <DrawerItem
              labelStyle={{
                color: currentRoute === "/services" ? "#2563eb" : "#000",
              }}
              label="My Services"
              onPress={() => props.navigation.navigate("services")}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="flex-row items-center px-5 py-2.5"
          onPress={() => setSettingsOpen(!settingsOpen)}
        >
          <Ionicons name="settings" size={24} color="black" />
          <Text style={{ marginLeft: 20, fontSize: 16 }}>Settings</Text>
          <Ionicons
            name={settingsOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="black"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        {settingsOpen && (
          <View>
            <TouchableOpacity
              style={{ paddingLeft: 40 }}
              className={`${
                currentRoute === "/changePassword"
                  ? "bg-blue-200 border-blue-500 rounded-lg"
                  : "#000"
              }`}
              onPress={() => props.navigation.navigate("changePassword")}
            >
              <DrawerItem
                labelStyle={{
                  color:
                    currentRoute === "/changePassword" ? "#2563eb" : "#000",
                }}
                label="Change Password"
                onPress={() => props.navigation.navigate("changePassword")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: 40 }}
              className={`${
                currentRoute === "/profile"
                  ? "bg-blue-200 border-blue-500 rounded-lg"
                  : "#000"
              }`}
              onPress={() => props.navigation.navigate("profile")}
            >
              <DrawerItem
                labelStyle={{
                  color: currentRoute === "/profile" ? "#2563eb" : "#000",
                }}
                label="Profile"
                onPress={() => props.navigation.navigate("profile")}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View className="mt-auto border-t  border-gray-300">
        <TouchableOpacity
          className="flex-row items-center px-5 py-3"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="black" />
          <Text className="ml-5 text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

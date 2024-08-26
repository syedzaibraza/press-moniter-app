import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { getServices, Service } from "@/services/settingService";
import { Image } from "expo-image";
// @ts-ignore
import pdf from "@/assets/images/pd.png";
// @ts-ignore
import tv from "@/assets/images/mm.png";
// @ts-ignore
import pd from "@/assets/images/nm.png";

const Dashboard = () => {
  const [services, setServices] = useState<Service[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getServicesData = async () => {
      setLoading(true);
      try {
        const { data } = await getServices();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service data:", error);
      } finally {
        setLoading(false);
      }
    };
    getServicesData();
  }, []);
  if (loading)
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
        }}
      >
        {services?.map((item) => (
          <TouchableOpacity
            onPress={() => router.push(`/${item.type}/${item.identifier}`)}
            key={item.identifier}
            className="flex-row w-full items-center p-3 border border-gray-300 rounded-xl mb-4 bg-white"
          >
            <Image
              source={
                item.type === "pdf"
                  ? pdf
                  : item.type === "tv"
                  ? tv
                  : item.type === "pd" || item.type === "mm"
                  ? pd
                  : null
              }
              className="h-12 w-12 rounded-lg"
              resizeMode="contain"
            />
            <View className="ml-4 flex-1 justify-center">
              <Text className="text-lg font-semibold text-gray-900">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

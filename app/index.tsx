import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="justify-center w-full min-h-[85vh] px-4 my-6">
        <Text
          onPress={() => router.push("/login")}
          className="text-red-500 text-xl"
        >
          Login Page
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

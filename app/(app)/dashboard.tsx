import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

const Dashboard = () => {
  return (
    <View>
      <Text
        onPress={() => {
          router.push("/sign-in");
        }}
      >
        {" "}
        Dashboard
      </Text>
    </View>
  );
};

export default Dashboard;

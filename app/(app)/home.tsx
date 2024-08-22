import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

const Home = () => {
  return (
    <View>
      <Text
        onPress={() => {
          router.push("/sign-in");
        }}
      >
        {" "}
        Home
      </Text>
    </View>
  );
};

export default Home;

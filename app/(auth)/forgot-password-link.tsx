import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
// @ts-ignore: Unreachable code error
import logo from "@/assets/images/logo.png";
import { Link } from "expo-router";

const ForgetPasswordLink = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="justify-center w-full min-h-[85vh] px-4 my-6">
          <Image
            className="w-full h-20 mb-[20%]"
            contentFit="contain"
            source={logo}
          />
          <Text className="text-center text-lg mb-4">
            If the account exists, a mail has been sent with a link to reset
            your password.
          </Text>
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-600 font-regular">
              Back to sign in?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-semibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPasswordLink;

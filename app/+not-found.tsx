import Button from "@/components/Button";
import { Link, Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View className="container h-full justify-center">
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="items-center">
        <Text className="text-lg mb-3">This screen doesn't exist.</Text>
        <Button
          title="Back to Home Screen"
          containerStyles="p-4"
          handlePress={() => router.push("/")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

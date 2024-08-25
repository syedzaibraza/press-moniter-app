import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndexPage() {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      setSession((await AsyncStorage.getItem("token")) ?? null);
      setIsReady(true);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (session) {
        router.replace("/dashboard");
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [isReady]);

  return null;
}

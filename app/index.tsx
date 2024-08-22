import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function IndexPage() {
  const [isReady, setIsReady] = useState(false);
  const session = ""; // Replace with your actual session check

  useEffect(() => {
    const initialize = async () => {
      setIsReady(true);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (session) {
        router.replace("/(app)/home");
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [isReady]);

  return null;
}

import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getSingleServie } from "@/services/settingService";
// @ts-ignore
import computer from "@/assets/images/computer.png";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getFormatedDate } from "@/utils/getFormatedDate";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
type ImageErrorState = Record<string, boolean>;

const DetailPage = () => {
  const { params } = useRoute();
  const { type, identifier } = params as any;
  const [pdService, setPdService] = useState<any | null>(null);
  const [imageError, setImageError] = useState<ImageErrorState>({});
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any | null>(null);

  const handleDateChange = (event: any, date: Date | undefined) => {
    const formatedDate = getFormatedDate(date);
    setSelectedDate(formatedDate);
  };

  useEffect(() => {
    const getServicesData = async () => {
      setLoading(true);
      try {
        const checkIsDate = selectedDate ? selectedDate : "";
        const { data }: any = await getSingleServie(identifier, checkIsDate);
        setPdService(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      } finally {
        setLoading(false);
      }
    };
    getServicesData();
  }, [params, selectedDate]);
  console.log("selectedDate", selectedDate);

  if (loading)
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="mb-4 w-full items-start">
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate instanceof Date ? selectedDate : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        </View>

        <View className="w-full flex-row items-center p-4 bg-[#C80202] rounded-lg mb-4">
          <Image
            source={computer}
            className="w-14 h-14 rounded-lg bg-white"
            resizeMode="contain"
          />
          <View className="ml-4">
            <Text className="text-xl font-semibold text-white">
              {pdService?.name}
            </Text>
            <Text className="text-base text-white">
              {pdService?.date_display}
            </Text>
          </View>
        </View>

        <View>
          {pdService?.items?.map((item: any, index: number) => (
            <View
              key={index}
              className="w-full items-center p-2 border-gray-300 border rounded-lg mb-4"
            >
              <Image
                source={item?.image}
                className="w-full h-48 rounded-lg bg-white"
                resizeMode="contain"
                onError={() => {
                  setImageError({
                    ...imageError,
                    [item?.image]: true,
                  });
                }}
              />
              <View className="mt-2">
                <Link
                  href={item?.url}
                  className="text-xl font-semibold text-black"
                >
                  {item?.headline}
                </Link>
                <Text className="text-base text-black">{item?.abstract}</Text>
              </View>
              <View className="w-full flex-row-reverse items-center justify-between mb-4">
                {/* Publisher Logo */}
                <Image
                  source={item?.publisher?.logo}
                  className="w-20 h-20 rounded-full"
                  resizeMode="contain"
                  alt={item?.publisher?.name}
                />

                {/* Author and Icon */}
                <View className="flex-row items-center mt-2">
                  <FontAwesome name="user" size={20} color="black" />
                  <Text className="ml-2 text-base">{item?.author}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailPage;

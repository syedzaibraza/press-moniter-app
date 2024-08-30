import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getFormatedDate } from "@/utils/getFormatedDate";
import DateTimePicker from "@react-native-community/datetimepicker";
//@ts-ignore
import computer from "@/assets/images/computer.png";
//@ts-ignore
import tv from "@/assets/images/tv.png";
//@ts-ignore
import newspaper from "@/assets/images/newspaper.png";
import { getSingleServie } from "@/services/settingService";
import { Image } from "expo-image";
import PdType from "@/components/Pd";
import TvType from "@/components/Tv";
import PdfType from "@/components/Pdf";
import MmType from "@/components/Mm";

type ImageErrorState = Record<string, boolean>;

const PdPage = () => {
  const { params } = useRoute();
  const { type, identifier } = params as { type: string; identifier: string };
  const [loading, setLoading] = useState(false);
  const [pdService, setPdService] = useState<any | null>(null);
  const [imageError, setImageError] = useState<ImageErrorState>({});
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  console.log(identifier, type);

  const handleDateChange = (event: any, date: any) => {
    if (date) {
      const formattedDate = getFormatedDate(date);
      setSelectedDate(formattedDate);
    }
  };

  const handleImageError = (identifier_id: any) => {
    setImageError((prevState) => ({
      ...prevState,
      [identifier_id]: true,
    }));
  };
  useEffect(() => {
    if ((params as { type: string })?.type === type) {
      setSelectedDate(null);
    }
  }, [params]);

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
  console.log(type, pdService);

  if (loading)
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#C80202" />
      </SafeAreaView>
    );
  console.log("PPPP", Platform.OS);

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-4 w-full items-start">
        {Platform.OS === "ios" && (
          <DateTimePicker
            value={pdService?.date ? new Date(pdService.date) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
      <View className="w-full flex-row items-center p-4 bg-[#C80202] rounded-lg mb-4">
        <Image
          source={
            type === "pd"
              ? computer
              : type === "pdf"
              ? newspaper
              : type === "tv"
              ? tv
              : null
          }
          className="w-14 h-14 rounded-lg bg-white"
          resizeMode="contain"
        />
        <View className="ml-4 items-center">
          <Text className="text-xl text-center font-semibold text-white">
            {pdService?.name}
          </Text>
          <Text className="text-base text-white">
            {pdService?.date_display}
          </Text>
        </View>
      </View>

      {type === "pd" ? (
        <PdType
          pdService={pdService}
          handleImageError={handleImageError}
          imageError={imageError}
        />
      ) : type === "pdf" ? (
        <PdfType />
      ) : type === "tv" ? (
        <TvType />
      ) : type === "mm" ? (
        <MmType />
      ) : null}
    </ScrollView>
  );
};

export default PdPage;

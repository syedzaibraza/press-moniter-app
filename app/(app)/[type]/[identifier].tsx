import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getFormatedDate } from "@/utils/getFormatedDate";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import RangeModal from "@/components/RangeModal";
import { set } from "react-hook-form";

type ImageErrorState = Record<string, boolean>;

const DetailPage = () => {
  const { params } = useRoute();
  const { type, identifier } = params as { type: string; identifier: string };
  const [loading, setLoading] = useState(false);
  const [Service, setService] = useState<any | null>(null);
  const [imageError, setImageError] = useState<ImageErrorState>({});
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [fmt, setFmt] = useState("print");
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [checkedNews, setCheckedNews] = useState<any | null>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rangeInput, setRangeInput] = useState("");
  const childRef = useRef();

  const handleParentSubmit = () => {
    if (childRef.current) {
      // @ts-ignore
      childRef.current.submit();
    }
  };

  const handleDateChange = (event: any, date: any) => {
    if (event.type === "set" && date) {
      const formattedDate = getFormatedDate(date);
      setSelectedDate(formattedDate);
    }
    setShowDate(false);
  };

  const handleImageError = (identifier_id: any) => {
    setImageError((prevState) => ({
      ...prevState,
      [identifier_id]: true,
    }));
  };

  useEffect(() => {
    getServicesData();
  }, [identifier, selectedDate]);

  const getServicesData = async () => {
    setLoading(true);
    try {
      const checkIsDate = selectedDate ? selectedDate : "";
      const { data }: any = await getSingleServie(identifier, checkIsDate);
      setService(data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#C80202" />
      </SafeAreaView>
    );
  }
  const nav = [
    {
      icon: <MaterialIcons name="tv" size={24} color="black" />,
      label: "Version for Online Reading",
      method: function () {
        setFmt("online");
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      },
    },
    {
      icon: <Foundation name="print" size={24} color="black" />,
      label: "Printable Version",
      method: function () {
        setFmt("print");
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      },
    },
    {
      icon: <Octicons name="download" size={24} color="black" />,
      label: "Download All",
      method: function () {
        setCheckedItems(new Array(Service?.items?.length).fill(true));
        const allIdentifiers = Service?.items?.map(
          (item: any) => item.identifier
        );
        setCheckedNews((pre: any) => [...pre, ...allIdentifiers]);
        setTimeout(() => {
          handleParentSubmit();
        }, 100);
      },
    },
    {
      icon: <MaterialIcons name="downloading" size={24} color="black" />,
      label: "Download Range",
      method: () => {
        setIsModalVisible(true);
      },
    },
    {
      icon: <Ionicons name="toggle-sharp" size={24} color="black" />,
      label: "Toggle All",
      method: function () {
        setCheckedItems((prev) => prev.map((item) => !item));
        const allIdentifiers = Service?.items?.map(
          (item: any) => item.identifier
        );
        setCheckedNews((pre: any) => [...pre, ...allIdentifiers]);
      },
    },
    {
      icon: <Feather name="x-circle" size={24} color="black" />,
      label: "Clear All",
      method: function () {
        setCheckedItems(new Array(Service?.items?.length).fill(false));
        setCheckedNews([]);
      },
    },
    {
      icon: <FontAwesome5 name="check-square" size={24} color="black" />,
      label: "Check All",
      method: function () {
        setCheckedItems(new Array(Service?.items?.length).fill(true));
        const allIdentifiers = Service?.items?.map(
          (item: any) => item.identifier
        );
        setCheckedNews((pre: any) => [...pre, ...allIdentifiers]);
      },
    },
  ];
  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-4 w-full gap-3 items-start justify-start">
        <View>
          {type === "pdf" && (
            <View className="flex-wrap flex-row items-center w-full">
              <View className="flex-row flex-wrap gap-2">
                {nav.map((item, index) => (
                  <View key={index} className="flex-row items-center">
                    <TouchableOpacity
                      onPress={item?.method}
                      className="flex-row items-center gap-3"
                    >
                      {item.icon}
                      <Text className="text-lg">{item.label}</Text>
                    </TouchableOpacity>
                    {index < 6 && (
                      <View className="w-[2px] h-6 bg-gray-400 mx-2" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {Platform.OS === "android" ? (
          <View className="bg-gray-300 rounded-lg p-2">
            <TouchableOpacity
              className="flex-row  items-center gap-2"
              onPress={() => setShowDate(true)}
            >
              <AntDesign name="calendar" size={24} />
              <Text className="text-base ">
                {Service?.date ? getFormatedDate(Service.date) : null}
              </Text>
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                value={Service?.date ? new Date(Service.date) : new Date()}
                mode="date"
                display="calendar"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>
        ) : (
          <DateTimePicker
            value={Service?.date ? new Date(Service.date) : new Date()}
            mode="date"
            display="default"
            className="w-screen m-0"
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
        <View className="flex-1 items-center">
          <Text className="text-xl text-center font-semibold text-white">
            {Service?.name}
          </Text>
          <Text className="text-base text-white">{Service?.date_display}</Text>
        </View>
      </View>

      {type === "pd" ? (
        <PdType
          pdService={Service}
          handleImageError={handleImageError}
          imageError={imageError}
        />
      ) : type === "pdf" ? (
        <PdfType
          ref={childRef}
          pdfService={Service}
          handleImageError={handleImageError}
          imageError={imageError}
          selectedDate={selectedDate}
          id={identifier}
          fmt={fmt}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          checkedNews={checkedNews}
          setCheckedNews={setCheckedNews}
        />
      ) : type === "tv" ? (
        <View>
          <Text>TV</Text>
          <TvType
            tvService={Service}
            handleImageError={handleImageError}
            imageError={imageError}
          />
        </View>
      ) : type === "mm" ? (
        <MmType />
      ) : null}
      <RangeModal
        rangeInput={rangeInput}
        setRangeInput={setRangeInput}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={() => {
          const msg =
            "Invalid Input. Should be given as start-end of clip numbers";
          if (!rangeInput) return;

          const r = rangeInput.split("-");
          if (r.length !== 2) {
            alert(msg);
            return;
          }

          let start = parseInt(r[0]);
          let finish = parseInt(r[1]);
          if (
            isNaN(start) ||
            isNaN(finish) ||
            start < 1 ||
            finish < 1 ||
            start > finish ||
            finish > Service?.items?.length
          ) {
            alert(msg);
            return;
          }
          start -= 1;
          finish -= 1;

          const newCheckedItems = new Array(Service.items.length).fill(false);
          for (let i = start; i <= finish; i++) {
            newCheckedItems[i] = true;
          }
          setCheckedItems(newCheckedItems);
          const checkedNewsIdentifiers = Service?.items
            ?.filter((_: any, index: any) => newCheckedItems[index])
            .map((item: any) => item.identifier);
          setCheckedNews((pre: any) => [...pre, ...checkedNewsIdentifiers]);
          setTimeout(() => {
            handleParentSubmit();
            setIsModalVisible(false);
          }, 100);
        }}
      />
    </ScrollView>
  );
};

export default DetailPage;

import {
  getSingleServieWithMultipalPdf,
  getSingleServieWithSinglePdf,
} from "@/services/settingService";
import { getFormatedDate } from "@/utils/getFormatedDate";
import Checkbox from "expo-checkbox";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Image } from "expo-image";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Button from "./Button";

type PdfTypeProps = {
  pdfService: any;
  imageError: any;
  handleImageError: any;
  selectedDate: any;
  id: string;
  fmt: string;
  checkedItems: boolean[];
  setCheckedItems: any;
  setCheckedNews: any;
  checkedNews: any;
  ref: any;
};
const PdfType: React.FC<PdfTypeProps> = forwardRef(
  (
    {
      pdfService,
      imageError,
      handleImageError,
      selectedDate,
      id,
      fmt,
      checkedItems,
      setCheckedItems,
      setCheckedNews,
      checkedNews,
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    let globalIndex = 1;
    let globalIndexChecked = 0;

    const handleCheckItem = (index: number, iden: string) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
      setCheckedNews((prevChecked: string[]) => {
        if (prevChecked.includes(iden)) {
          return prevChecked.filter((item) => item !== iden);
        } else {
          return [...prevChecked, iden];
        }
      });
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    const handleSubmit = async () => {
      console.log("submitting");
      setLoading(true);
      if (checkedNews.length === 0) {
        alert("Please select at least one news clip to download");
        setLoading(false);
        return;
      }
      try {
        const date = selectedDate
          ? getFormatedDate(selectedDate)
          : pdfService?.date;
        const { data }: any =
          checkedNews.length == 1
            ? await getSingleServieWithSinglePdf(id, checkedNews, date, fmt)
            : await getSingleServieWithMultipalPdf(id, checkedNews, date, fmt);
        WebBrowser.openBrowserAsync(data?.location);
        setCheckedNews([]);
        setCheckedItems([]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    const handleSinglePdf = async (iden: string) => {
      try {
        const date = selectedDate
          ? getFormatedDate(selectedDate)
          : pdfService?.data?.date;
        const { data }: any = await getSingleServieWithSinglePdf(
          id,
          iden,
          date,
          fmt
        );
        WebBrowser.openBrowserAsync(data?.location);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    return (
      <View className="w-full mx-auto mb-16">
        <View>
          <View
            className={`${
              pdfService?.articleSection ? "p-4" : "p-0"
            } text-sm border-b`}
          >
            {pdfService?.articleSection?.map((category: any, index: any) => (
              <TouchableOpacity key={category.identifier}>
                <Text className="mr-2 text-red-600 underline">
                  {category.name} ({category.numberOfItems}),
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="p-4">
            <ScrollView className="scroll-smooth">
              {pdfService?.articleSection ? (
                pdfService?.articleSection?.map(
                  (section: any, sectionIndex: any) => {
                    const relatedArticle = pdfService?.items?.filter(
                      (article: any) =>
                        article.articleSection.name === section.name
                    );
                    return (
                      <View key={section.identifier} className={`py-4 px-3`}>
                        <Text
                          id={section.identifier}
                          className="text-2xl font-bold text-red-700"
                        >
                          {section.name}
                        </Text>
                        <View className="grid grid-cols-2">
                          {relatedArticle.map((item: any, idx: any) => (
                            <View key={item.identifier} className="mb-4">
                              <View className="flex-row items-center space-x-3">
                                <Text className="text-xs font-bold">
                                  {globalIndex++}. {item.source}
                                </Text>
                                {item.publisher.logo ? (
                                  <>
                                    <Image
                                      source={{ uri: item.publisher.logo }}
                                      alt={item.publisher.name}
                                      onError={() =>
                                        handleImageError(item.identifier)
                                      }
                                      className="w-24 h-10"
                                      resizeMode="contain"
                                    />
                                    {imageError[item.identifier] && (
                                      <Text className="text-sm">
                                        {item.publisher.name}
                                      </Text>
                                    )}
                                  </>
                                ) : (
                                  <Text>{item.publisher.name}</Text>
                                )}
                              </View>
                              <View className="flex-row items-center">
                                <Checkbox
                                  value={checkedItems[globalIndexChecked++]}
                                  onValueChange={() =>
                                    handleCheckItem(idx, item?.identifier)
                                  }
                                  className="mr-2"
                                  color={
                                    checkedItems[globalIndexChecked++]
                                      ? "#C80202"
                                      : undefined
                                  }
                                />
                                <TouchableOpacity
                                  onPress={() =>
                                    handleSinglePdf(item?.identifier)
                                  }
                                >
                                  <Text className="text-red-500 flex-grow flex-1 text-lg underline">
                                    {item.headline}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View className="text-xs flex-row space-x-2 mt-2">
                                {item.publisher.address && (
                                  <View className="flex-row gap-2 items-center">
                                    <FontAwesome5
                                      name="map-marker-alt"
                                      size={16}
                                      color="black"
                                    />
                                    {/* <MapPinIcon className="size-3 me-1 fill-black" /> */}
                                    <Text className="text-base">
                                      {item.publisher.address}
                                    </Text>
                                  </View>
                                )}
                                {item.publisher.pageno && (
                                  <View className="flex-row gap-2 items-center">
                                    <Ionicons
                                      name="newspaper-sharp"
                                      size={16}
                                      color="black"
                                    />
                                    {/* <NewspaperIcon className="size-3 mx-2 fill-black" /> */}
                                    <Text className="text-base">
                                      {item.publisher.pageno}
                                    </Text>
                                  </View>
                                )}
                                {item.author && (
                                  <View className="flex-row gap-2 items-center">
                                    <FontAwesome
                                      name="user"
                                      size={16}
                                      color="black"
                                    />
                                    {/* <UserIcon className="size-3 mx-2 fill-black" /> */}
                                    <Text className="text-base">
                                      {item.author}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  }
                )
              ) : (
                <View className="grid grid-cols-2">
                  {pdfService?.items?.length > 0 &&
                    pdfService?.items?.map((item: any, index: any) => (
                      <View key={item.id} className="mb-4">
                        <View className="flex-row items-center space-x-3">
                          <Text className="text-base font-bold">
                            {globalIndex++}. {item.source}
                          </Text>
                          {item.publisher.logo ? (
                            <>
                              <Image
                                source={item.publisher.logo}
                                alt={item.publisher.name}
                                onError={() =>
                                  handleImageError(item.identifier)
                                }
                                className="w-24 h-10"
                                resizeMode="contain"
                              />
                              {imageError[item.identifier] && (
                                <Text className="text-sm">
                                  {item.publisher.name}
                                </Text>
                              )}
                            </>
                          ) : (
                            <Text>{item.publisher.name}</Text>
                          )}
                        </View>
                        <View className="flex-row items-center gap-2 ">
                          <Checkbox
                            value={checkedItems[index]}
                            onValueChange={() =>
                              handleCheckItem(index, item?.identifier)
                            }
                            color={checkedItems[index] ? "#C80202" : undefined}
                          />
                          <TouchableOpacity
                            className="flex-1"
                            onPress={() => handleSinglePdf(item?.identifier)}
                          >
                            <Text className="text-red-500 text-start text-lg underline">
                              {item.headline}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View className="text-xs flex-row space-x-2 mt-2">
                          {item.publisher.address && (
                            <View className="flex-row gap-2 items-center">
                              <FontAwesome5
                                name="map-marker-alt"
                                size={16}
                                color="black"
                              />
                              <Text className="text-base">
                                {item.publisher.address}
                              </Text>
                            </View>
                          )}
                          {item.publisher.pageno && (
                            <View className="flex-row gap-2 items-center">
                              <Ionicons
                                name="newspaper-sharp"
                                size={16}
                                color="black"
                              />
                              <Text className="text-base">
                                {item.publisher.pageno}
                              </Text>
                            </View>
                          )}
                          {item.author && (
                            <View className="flex-row gap-2 items-center">
                              <FontAwesome
                                name="user"
                                size={16}
                                color="black"
                              />
                              <Text className="text-base">{item.author}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}
                </View>
              )}
            </ScrollView>
            <View>
              <Button
                title="Submit"
                handlePress={handleSubmit}
                isLoading={loading}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
);

export default PdfType;

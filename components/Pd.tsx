import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

type ImageErrorState = Record<string, boolean>;

interface PdTypeProps {
  pdService: any;
  handleImageError: (identifier: any) => void;
  imageError: ImageErrorState;
}

const PdType: React.FC<PdTypeProps> = ({
  pdService,
  handleImageError,
  imageError,
}) => {
  const handleOpenLink = async (url: string | any) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <View>
      {pdService?.articleSection && (
        <View className="border-b p-4">
          {pdService?.articleSection?.map((category: any, index: any) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                /* Open link */
              }}
            >
              <Text className="mr-2 text-red-600 underline">
                {category.name} ({category.numberOfItems}),
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View>
        {pdService?.articleSection ? (
          pdService.articleSection.map((section: any) => {
            const relatedArticle = pdService?.items?.filter(
              (article: any) => article.articleSection.name === section.name
            );
            return (
              <View key={section.identifier} className="mb-4">
                <Text className="text-2xl font-bold text-red-700 mb-4">
                  {section.name}
                </Text>
                <View className="space-y-4">
                  {relatedArticle.length > 0 &&
                    relatedArticle.map((item: any) => (
                      <View
                        key={item.identifier}
                        className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
                      >
                        <Image
                          source={item?.image}
                          className="w-full h-48 rounded-lg mb-4"
                          resizeMode="contain"
                        />
                        <View>
                          {item.publisher.logo ? (
                            <Image
                              source={item.publisher.logo}
                              onError={() => handleImageError(item.identifier)}
                              className="w-30 h-10 mb-2"
                              resizeMode="contain"
                              style={
                                imageError[item.identifier]
                                  ? { display: "none" }
                                  : {}
                              }
                            />
                          ) : (
                            <Text>{item.publisher.name}</Text>
                          )}
                          <TouchableOpacity
                            onPress={() =>
                              handleOpenLink(item?.url || item?.share_url)
                            }
                          >
                            <Text className="text-sm font-bold mt-2 text-gray-900 underline">
                              {item?.headline}
                            </Text>
                          </TouchableOpacity>
                          <Text className="text-sm mt-2 text-gray-900">
                            {item.abstract}
                          </Text>
                          {item.author && (
                            <View className="flex-row items-center mt-2">
                              <FontAwesome
                                name="user"
                                size={20}
                                color="black"
                              />
                              <Text className="text-xs text-gray-900 ml-2">
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
          })
        ) : (
          <View className="my-2">
            {pdService?.items?.length > 0 &&
              pdService?.items?.map((item: any) => (
                <View
                  key={item.identifier}
                  className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm mb-4"
                >
                  <Image
                    source={item?.image}
                    className="w-full h-48 rounded-lg mb-4"
                    resizeMode="cover"
                  />
                  <View>
                    {item.publisher.logo ? (
                      <Image
                        source={item.publisher.logo}
                        onError={() => handleImageError(item.identifier)}
                        className="w-40 h-10 mb-2"
                        resizeMode="contain"
                        style={
                          imageError[item.identifier] ? { display: "none" } : {}
                        }
                      />
                    ) : (
                      <Text>{item.publisher.name}</Text>
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        handleOpenLink(item?.url || item?.share_url)
                      }
                    >
                      <Text className="text-sm font-bold mt-2 text-gray-900 underline">
                        {item?.headline}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-sm mt-2 text-gray-900">
                      {item.abstract}
                    </Text>
                    {item.author && (
                      <View className="flex-row items-center mt-2">
                        <FontAwesome name="user" size={20} color="black" />
                        <Text className="text-xs text-gray-900 ml-2">
                          {item.author}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default PdType;

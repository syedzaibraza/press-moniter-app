import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { Video } from "expo-av";

type ImageErrorState = Record<string, boolean>;
interface TvTypeProps {
  tvService: any;
  handleImageError: (identifier: any) => void;
  imageError: ImageErrorState;
}

const TvType: React.FC<TvTypeProps> = ({
  tvService,
  handleImageError,
  imageError,
}) => {
  return (
    <View>
      {tvService?.articleSection && (
        <View className="border-b pb-4">
          {tvService?.articleSection?.map((category: any, index: any) => (
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
      <ScrollView className="p-2" scrollEventThrottle={16}>
        {tvService?.articleSection?.length > 0 ? (
          tvService?.articleSection?.map((section: any) => {
            const relatedArticle = tvService?.items?.filter(
              (article: any) => article.articleSection.name === section.name
            );
            return (
              <View key={section.identifier}>
                <Text
                  id={section.identifier}
                  className="text-2xl font-bold text-red-700 my-4"
                >
                  {section.name}
                </Text>
                {relatedArticle.length > 0 &&
                  relatedArticle.map((item: any, index: number) => {
                    return (
                      <View
                        key={item.identifier}
                        className="rounded-lg my-2 bg-white p-3"
                      >
                        <Video
                          isLooping
                          useNativeControls
                          className="w-full h-44 rounded-lg"
                          source={{ uri: item.url }}
                          //@ts-ignore
                          resizeMode="contain"
                        />
                        {item.publisher.logo ? (
                          <View>
                            <Image
                              className="w-20 max-w-fit h-10 mb-2"
                              resizeMode="contain"
                              source={item.publisher.logo}
                              alt={item.publisher.name}
                              onError={() => handleImageError(item.identifier)}
                              style={
                                imageError[item.identifier]
                                  ? { display: "none" }
                                  : {}
                              }
                            />
                            {imageError[item.identifier] && (
                              <Text className="text-sm">
                                {item.publisher.name}
                              </Text>
                            )}
                          </View>
                        ) : (
                          <Text>{item.publisher.name}</Text>
                        )}
                        <Text className="mt-2">{item.headline}</Text>
                      </View>
                    );
                  })}
              </View>
            );
          })
        ) : (
          <View>
            {tvService?.items?.length > 0 &&
              tvService?.items?.map((item: any, index: number) => {
                return (
                  <View
                    key={item.identifier}
                    className="rounded-lg my-2 bg-white p-3"
                  >
                    <Video
                      isLooping
                      useNativeControls
                      className="w-full h-44 rounded-lg"
                      source={{ uri: item.url }}
                      //@ts-ignore
                      resizeMode="contain"
                    />
                    {item.publisher.logo ? (
                      <View>
                        <Image
                          className="w-20 h-10 mb-2"
                          resizeMode="contain"
                          source={item.publisher.logo}
                          alt={item.publisher.name}
                          onError={() => handleImageError(item.identifier)}
                          style={
                            imageError[item.identifier]
                              ? { display: "none" }
                              : {}
                          }
                        />
                        {imageError[item.identifier] && (
                          <Text className="text-sm">{item.publisher.name}</Text>
                        )}
                      </View>
                    ) : (
                      <Text>{item.publisher.name}</Text>
                    )}
                    <Text className="mt-2 text-base">{item.headline}</Text>
                  </View>
                );
              })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TvType;

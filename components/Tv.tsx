import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";

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
  const [viewableIndex, setViewableIndex] = useState(null);

  // const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
  //   if (viewableItems.length > 0) {
  //     const index = viewableItems[0].index;
  //     setViewableIndex(index);
  //   }
  // }).current;

  // const viewabilityConfig = {
  //   itemVisiblePercentThreshold: 50, // 50% of the item should be visible
  // };

  // useEffect(() => {
  //   if (viewableIndex !== null) {
  //   }
  // }, [viewableIndex]);
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
                    const player = useVideoPlayer(item.url, (player) => {
                      player.loop = false;
                      if (index === viewableIndex) {
                        player.play();
                      } else {
                        player.pause();
                      }
                    });

                    return (
                      <View
                        key={item.identifier}
                        className="rounded-lg my-2 bg-white p-3"
                      >
                        <VideoView
                          className="w-full h-44 rounded-lg"
                          player={player}
                          allowsFullscreen
                          allowsPictureInPicture
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
                const player = useVideoPlayer(item.url, (player) => {
                  player.loop = false;
                  if (index === viewableIndex) {
                    player.play();
                  } else {
                    player.pause();
                  }
                });

                return (
                  <View
                    key={item.identifier}
                    className="rounded-lg my-2 bg-white p-3"
                  >
                    <VideoView
                      className="w-full h-44 rounded-lg"
                      player={player}
                      allowsFullscreen
                      allowsPictureInPicture
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

import { Image } from "expo-image";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
// @ts-ignore
import eye from "@/assets/icons/eye.svg";
// @ts-ignore
import eyeHide from "@/assets/icons/eyeHide.svg";

const FormField = ({
  title,
  type,
  value,
  placeholder,
  handleChangeText,
  onBlur,
  autoCapitalize = "none",
  otherStyles,
  showPassword,
  handleShowPassword,
  loading = false,
  ...props
}: any) => {
  console.log("FormField", {
    title,
    value,
  });
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-medium">{title}</Text>

      <View
        className={`  ${
          loading ? "bg-gray-200 border-gray-300 rounded-2xl" : "border-black"
        }w-full h-16 px-4 bg-black-100 rounded-2xl border-2 focus:border-blue-400 flex flex-row items-center`}
      >
        <TextInput
          editable={!loading}
          className={`flex-1 text-black font-semibold text-base
          ${loading && "text-gray-500"}
          `}
          value={value}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          onBlur={onBlur}
          secureTextEntry={type === "password" && !showPassword ? true : false}
          keyboardType={type === "number" ? "numeric" : "default"}
          {...props}
        />

        {type === "password" && (
          <TouchableOpacity onPress={handleShowPassword}>
            <Image
              source={!showPassword ? eye : eyeHide}
              className="w-6 h-6"
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

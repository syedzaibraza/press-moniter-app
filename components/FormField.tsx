import { Image } from "expo-image";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
// @ts-ignore
import eye from "@/assets/icons/eye.svg";
// @ts-ignore
import eyeHide from "@/assets/icons/eyeHide.svg";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  onBlur,
  autoCapitalize = "none",
  otherStyles,
  ...props
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-blue-400 flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-semibold text-base"
          value={value}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          onBlur={onBlur}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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

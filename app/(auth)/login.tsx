import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Image } from "expo-image";
// @ts-ignore: Unreachable code error
import logo from "@/assets/images/logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const initialValues = {
    login: "",
    password: "",
  };

  const validationSchema = Yup.object({
    login: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any, { setSubmitting }: any) => {
      setError("");
      try {
        console.log("values", values);
        //   @ts-ignore: Unreachable code error
        router.push("/home");
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred during login");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="justify-center w-full min-h-[85vh] px-4 my-6">
          <Image
            className="w-full h-20 mb-6"
            contentFit="contain"
            source={logo}
          />
          <View className="mb-4">
            <FormField
              title="Email Address"
              placeholder="Enter your email address"
              value={formik.values.login}
              handleChangeText={formik.handleChange("login")}
              onBlur={formik.handleBlur("login")}
            />
            {formik.touched.login && formik.errors.login ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.login}
              </Text>
            ) : null}
          </View>
          <View className="mb-4">
            <FormField
              title="Password"
              placeholder="Enter your password"
              value={formik.values.password}
              handleChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.password}
              </Text>
            ) : null}
          </View>
          <View className="flex justify-end mb-3 flex-row gap-2">
            <Text className="text-lg text-black font-regular">
              Forgot password
            </Text>
          </View>
          <Button
            title="Submit"
            handlePress={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          />
          {error && <Text className="text-red-500 mt-4">{error}</Text>}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-600 font-regular">
              Don't have an account?
            </Text>
            <Link
              href="/signup"
              className="text-lg font-semibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Link, router } from "expo-router";
import * as Yup from "yup";
import { useFormik } from "formik";
// @ts-ignore: Unreachable code error
import logo from "@/assets/images/logo.png";
import { ForgotPassword } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const initialValues = {
    login: "",
    password: "",
  };

  const validationSchema = Yup.object({
    login: Yup.string().email("Invalid email format").required("Required"),
  });

  const userForgotPassword = async (values: any, setSubmitting: any) => {
    try {
      const data: any = await ForgotPassword(values.login);

      if (data?.data) {
        await AsyncStorage.setItem("password-reset", data?.data);
        router.push("/forgot-password-link");
      } else {
        setError("No data returned from the password reset request.");
      }
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "An unexpected error occurred during the password reset process."
        );
      }
    } finally {
      if (setSubmitting) setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any, { setSubmitting }: any) => {
      try {
        const { login } = values;
        await userForgotPassword({ login }, setSubmitting);
      } catch (err: any) {
        alert(err.message);
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
            className="w-full h-20 mb-[20%]"
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

          <Button
            title="Forget Password"
            handlePress={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-600 font-regular">
              Remembered your password?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-semibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

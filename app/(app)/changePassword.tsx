import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
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
import { login } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changePassword } from "@/services/profileService";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    old_password: Yup.string().required("Old password is required"),
    new_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      )
      .required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), ""], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any, { setSubmitting }: any) => {
      let data;
      try {
        data = await changePassword(values);
        alert("Password changed successfully");
      } catch (err: any) {
        alert(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="justify-start w-full min-h-[85vh] px-4 my-6">
          <View className="mb-3">
            <FormField
              type="password"
              title="Old Password"
              placeholder="Enter your old password"
              value={formik.values.old_password}
              showPassword={!showOldPassword}
              handleShowPassword={() => setShowOldPassword(!showOldPassword)}
              handleChangeText={formik.handleChange("old_password")}
              onBlur={formik.handleBlur("old_password")}
            />
            {formik.touched.old_password && formik.errors.old_password ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.old_password}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="New Password"
              type="password"
              placeholder="Enter your new password"
              value={formik.values.new_password}
              showPassword={!showNewPassword}
              handleShowPassword={() => setShowNewPassword(!showNewPassword)}
              handleChangeText={formik.handleChange("new_password")}
              onBlur={formik.handleBlur("new_password")}
            />
            {formik.touched.new_password && formik.errors.new_password ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.new_password}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              value={formik.values.confirm_password}
              showPassword={!showConfirmPassword}
              handleShowPassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              handleChangeText={formik.handleChange("confirm_password")}
              onBlur={formik.handleBlur("confirm_password")}
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.confirm_password}
              </Text>
            ) : null}
          </View>
          <Button
            title="Change Password"
            handlePress={formik.handleSubmit}
            isLoading={formik.isSubmitting}
            containerStyles="mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

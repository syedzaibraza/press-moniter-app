import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useRouter } from "expo-router";
import { signup } from "@/services/authService";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Image } from "expo-image";
// @ts-ignore: Unreachable code error
import logo from "@/assets/images/logo.png";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const router = useRouter();

  const initialValues = {
    name: "",
    login: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    login: Yup.string().email("Invalid email format").required("Required"),
    name: Yup.string().required("Required"),
    password: Yup.string()
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
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await signup(values);
        alert("Signup successful");
        router.push("/sign-in");
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
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center">
          <View className="rounded-lg shadow-md w-full">
            <Image
              className="w-full h-20 mb-6 mt-6"
              contentFit="contain"
              source={logo}
            />
            <View>
              <View className="mb-4">
                <FormField
                  title="Email Address *"
                  placeholder="abcd@abcd.com"
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
                  title="Full Name *"
                  placeholder="First Name"
                  value={formik.values.name}
                  handleChangeText={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <Text className="text-red-500 text-sm px-2 mt-1">
                    {formik.errors.name}
                  </Text>
                ) : null}
              </View>
              <View className="mb-4">
                <FormField
                  title="Password *"
                  type="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  handleChangeText={formik.handleChange("password")}
                  showPassword={!showPassword}
                  handleShowPassword={() => setShowPassword(!showPassword)}
                  onBlur={formik.handleBlur("password")}
                />

                {formik.touched.password && formik.errors.password ? (
                  <Text className="text-red-500 text-sm px-2 mt-1">
                    {formik.errors.password}
                  </Text>
                ) : null}
              </View>
              <View className="mb-4">
                <FormField
                  title="Confirm Password *"
                  type="password"
                  placeholder="Enter your password"
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
                title="Sign Up"
                handlePress={formik.handleSubmit}
                isLoading={formik.isSubmitting}
              />
              <View className="flex justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-600 font-regular">
                  Already have an account?
                </Text>
                <Link
                  href="/sign-in"
                  className="text-lg font-semibold text-secondary"
                >
                  Sign In
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

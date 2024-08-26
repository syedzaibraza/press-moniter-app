import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getProfileData, updateProfile } from "@/services/profileService";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { set } from "react-hook-form";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  // const [True, setTrue] = useState(flase);
  const initialValues = {
    name: "",
    country_code: "",
    state_code: "",
    mobile: "",
    address_line1: "",
    address_line2: "",
    post_code: "",
    taxId: "",
    website: "",
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const { data }: any = await getProfileData();
        formik.setValues({
          name: data.name || "",
          country_code: data.country_code || "",
          state_code: data.state_code || "",
          mobile: data.mobile || "",
          address_line1: data.address_line1 || "",
          address_line2: data.address_line2 || "",
          post_code: data.post_code || "",
          taxId: data.taxId || "",
          website: data.website || "",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching profile data:", error);
        alert("Failed to fetch profile data");
      }
    };
    fetchProfileData();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country_code: Yup.string().required("Country is required"),
    state_code: Yup.string().required("State is required"),
    mobile: Yup.string()
      .matches(/^[789]\d{9}$/, "Invalid phone number")
      .required("Mobile Number is required"),
    address_line1: Yup.string().optional(),
    address_line2: Yup.string().optional(),
    post_code: Yup.string().optional(),
    taxId: Yup.string().optional(),
    website: Yup.string().optional(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any, { setSubmitting }: any) => {
      let data;
      try {
        data = await updateProfile(values);
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
      <ScrollView>
        <View className="justify-start w-full min-h-[85vh] px-4 my-6">
          <Text className="text-xl font-bold mb-3">Mandatory Fields</Text>
          <View className="mb-3">
            <FormField
              title="Name *"
              placeholder="Enter your name"
              value={formik.values.name}
              handleChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              loading={loading}
            />
            {formik.touched.name && formik.errors.name ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.name}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="Country *"
              placeholder="Enter your Country"
              value={formik.values.country_code}
              handleChangeText={formik.handleChange("country_code")}
              onBlur={formik.handleBlur("country_code")}
              loading={loading}
            />
            {formik.touched.name && formik.errors.name ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.name}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="State *"
              placeholder="Enter your State"
              value={formik.values.state_code.toString()}
              handleChangeText={formik.handleChange("state_code")}
              onBlur={formik.handleBlur("state_code")}
              loading={loading}
            />
            {formik.touched.state_code && formik.errors.state_code ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.state_code}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="Mobile *"
              placeholder="Enter your Mobile"
              type="number"
              value={formik.values.mobile.toString()}
              handleChangeText={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
              loading={loading}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.mobile}
              </Text>
            ) : null}
          </View>
          <Text className="text-xl font-bold mb-3">Optional Fields</Text>

          <View className="mb-3">
            <FormField
              title="Address Line 1"
              placeholder="Enter your Address Line 1"
              value={formik.values.address_line1}
              handleChangeText={formik.handleChange("address_line1")}
              onBlur={formik.handleBlur("address_line1")}
              loading={loading}
            />
            {formik.touched.address_line1 && formik.errors.address_line1 ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.address_line1}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="Address Line 2"
              placeholder="Enter your Address Line 2"
              value={formik.values.address_line2}
              handleChangeText={formik.handleChange("address_line2")}
              onBlur={formik.handleBlur("address_line2")}
              loading={loading}
            />
            {formik.touched.address_line2 && formik.errors.address_line2 ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.address_line2}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="Post Code"
              type="number"
              placeholder="Enter your Post Code"
              value={formik.values.post_code.toString()}
              handleChangeText={formik.handleChange("post_code")}
              onBlur={formik.handleBlur("post_code")}
              loading={loading}
            />
            {formik.touched.post_code && formik.errors.post_code ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.post_code}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="Tax ID"
              placeholder="Enter your Tax ID"
              value={formik.values.taxId}
              handleChangeText={formik.handleChange("taxId")}
              onBlur={formik.handleBlur("taxId")}
              loading={loading}
            />
            {formik.touched.taxId && formik.errors.taxId ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.taxId}
              </Text>
            ) : null}
          </View>
          <View className="mb-3">
            <FormField
              title="Website"
              placeholder="Enter your Website"
              value={formik.values.website}
              handleChangeText={formik.handleChange("website")}
              onBlur={formik.handleBlur("website")}
              loading={loading}
            />
            {formik.touched.website && formik.errors.website ? (
              <Text className="text-red-500 text-sm px-2 mt-1">
                {formik.errors.website}
              </Text>
            ) : null}
          </View>

          <Button
            title="Update Profile"
            handlePress={formik.handleSubmit}
            isLoading={formik.isSubmitting}
            containerStyles="mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

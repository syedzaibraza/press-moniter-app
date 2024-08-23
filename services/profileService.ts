import { apiCall } from "@/utils/axiosInstance";

export interface FormValues {
  name: string;
  country_code: string;
  state_code: string;
  mobile: string;
  address_line1: string;
  address_line2: string;
  post_code: string;
  taxId: string;
  website: string;
}
export interface PasswordFormValues {
  old_password: string;
  password: string;
  confirm_password: string;
}

export const getProfileData = async (): Promise<FormValues> => {
  return await apiCall("/sec/profile", {
    method: "GET",
    apiKey: "true",
  });
};

export const updateProfile = async (values: FormValues): Promise<void> => {
  return await apiCall("/sec/profile", {
    method: "POST",
    body: values,
    apiKey: "true",
  });
};

export const changePassword = async (
  values: PasswordFormValues
): Promise<void> => {
  return await apiCall("/sec/changepassword", {
    method: "POST",
    body: values,
    apiKey: "true",
  });
};

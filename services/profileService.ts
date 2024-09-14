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

export interface CountryState {
  label: string;
  value: string;
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

export const getCountriesData = async (selected: string, lang: string) => {
  const url = `https://pubapi.bespokeapps.com/ws-base/countriesSelect?selected=${selected}&lang=${lang}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    const regex =
      /<option(?:\s+selected(?:=['"][^'"]*['"])?)?\s+value=['"]([^'"]+)['"]>([^<]+)<\/option>/g;
    const countryArray = [];
    let match;

    while ((match = regex.exec(data?.content)) !== null) {
      countryArray.push({
        value: match[1],
        label: match[2].trim(),
      });
    }

    return countryArray;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const getStatesData = async (
  selected: string,
  stateCode: any,
  lang: any
) => {
  const url = `https://pubapi.bespokeapps.com/ws-base/statesSelect?code=${selected}&selected=${stateCode}&lang=${lang}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    const regex =
      /<option(?:\s+selected(?:=['"][^'"]*['"])?)?\s+value=['"]([^'"]+)['"]>([^<]+)<\/option>/g;
    const statesArray = [];
    let match;

    while ((match = regex.exec(data?.content)) !== null) {
      statesArray.push({
        value: match[1],
        label: match[2].trim(),
      });
    }

    return statesArray;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

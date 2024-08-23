import AsyncStorage from "@react-native-async-storage/async-storage";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  apiKey?: string;
  body?: any;
}

const BASE_URL = "https://api.pressmonitor.com/v1";

interface ApiResponse<T> {
  data: {
    data: T | null;
    errors: string[];
    error: string[];
    meta: any;
  };
  errors: string[];
  error: string[];
  meta: any;
}

export const apiCall = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const { method = "GET", body, apiKey } = options;

  // Replace localStorage with AsyncStorage
  const token = apiKey
    ? { "x-api-key": await AsyncStorage.getItem("token") }
    : null;

  const url = `${BASE_URL}${endpoint}`;

  const cName = "mapp.pressmonitor.co.in";

  // Replace localStorage with AsyncStorage
  const deviceId =
    (await AsyncStorage.getItem("deviceId")) || "default-device-id";

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    deviceid: deviceId,
    cname: cName,
  };

  const requestOptions: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...(token || {}) } as HeadersInit,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (
      responseData.errors?.length > 0 ||
      responseData?.data?.errors?.length > 0
    ) {
      const errorMessage =
        responseData?.errors[0] || responseData?.data?.errors[0];
      throw new Error(errorMessage);
    }

    if (responseData?.data?.data === null) {
      throw new Error("No data returned from the API");
    }
    // @ts-ignore
    return responseData;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

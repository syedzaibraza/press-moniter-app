import { apiCall } from "@/utils/axiosInstance";

export interface Service {
  identifier: string;
  name: string;
  type: string;
}
export interface ServicesResponse {
  data: Service[];
  errors: any[];
  error: any[];
  meta: {
    db: {
      calc: {
        start: number;
        num: number;
        host: string;
      };
    };
  };
}

export const getServices = () => {
  return apiCall<ServicesResponse>("/pm/services", {
    method: "GET",
    apiKey: "true",
  });
};
export const getSingleServie = (identifier: string, date?: string) => {
  return apiCall(`/pm/services/${identifier}?date=${date}`, {
    method: "GET",
    apiKey: "true",
  });
};
export const getSingleServieWithMultipalPdf = (
  orderID: string,
  clip_ids: any,
  date: string,
  fmt: string
) => {
  return apiCall(`/pm/pmclips?date=${date}&order_id=${orderID}&fmt=${fmt}`, {
    method: "POST",
    apiKey: "true",
    body: { clip_ids },
  });
};

export const getSingleServieWithSinglePdf = (
  orderID: string,
  clip_ids: any,
  date: string,
  fmt: string
) => {
  return apiCall(
    `/pm/pmclips?date=${date}&order_id=${orderID}&clip_ids=${clip_ids}&pdf_format=${fmt}`,
    {
      method: "GET",
      apiKey: "true",
    }
  );
};
export const getTranslations = () => {
  const sec_host =
    window.location.hostname === "mapp.pressmonitor.co.in" ||
    window.location.hostname === "mapp.pressmonitor.fr"
      ? window.location.hostname
      : "app.pressmonitor.co.in";
  console.log("sec_host", sec_host);
  return apiCall(`/sec/hosts/${sec_host}`, {
    method: "GET",
  });
};

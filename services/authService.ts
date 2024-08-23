import { apiCall } from "@/utils/axiosInstance";

export interface LoginPayload {
  login: string;
  password: string;
}
export interface LoginResponse {
  data: {
    name: string;
    login: string;
    picture: string;
    gender: string;
    ent_name: string;
    ent_mobile: number;
    cname: string;
    "x-api-key": string;
    web_url: string;
  };
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
export interface SignUpForm {
  name: string;
  login: string;
  password: string;
  confirm_password: string;
}
export const login = (login: string, password: string) => {
  const data: LoginPayload = { login, password };
  return apiCall<LoginResponse>("/sec/login", {
    method: "POST",
    body: data,
  });
};

export const signup = (payload: SignUpForm) => {
  return apiCall<LoginResponse>("/sec/signup", {
    method: "POST",
    body: payload,
  });
};
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

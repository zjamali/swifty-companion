import {
  ApiError,
  OAuthTokenResponse,
  ProfileType,
  SearchUserType,
  User,
} from "@/constants/types";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(async function (config) {
  const token = SecureStore.getItem("token");
  if (token) {
    const { access_token, expires_in, refresh_token }: OAuthTokenResponse =
      JSON.parse(token);

    if (expires_in < new Date().getTime()) {
      console.log("get new access token using refresh token");
      const token = await refreshToken(refresh_token);
      await SecureStore.setItemAsync(
        "token",
        JSON.stringify({
          ...token,
          expires_in: new Date().getTime() + token.expires_in * 1000,
        })
      );
      config.headers.Authorization = `Bearer ${token.access_token}`;
    } else {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  } else {
    SecureStore.deleteItemAsync("token");
    router.replace("/");
  }
  return config;
});

axiosInstance.interceptors.response.use(
  async function (response) {
    const url: string = response.request["_url"];
    if (url.includes("v2/users?search[login]=")) {
      response.data = transformDataforSearchQuery(response.data);
    }
    if (url.includes("/v2/users/")) {
      response.data = transformDataforProfile(response.data);
    }
    return response;
  },

  function (error: AxiosError) {
    const status = error.response ? error.response.status : null;
    const data: ApiError = error.response?.data
      ? (error.response.data as ApiError)
      : {
          error: "Something went wrong",
          message: "Please check your connection",
        };
    if (status === 401) {
      router.push({
        pathname: "/modal",
        params: {
          error: `${data.error} \n ${data.message}`,
        },
      });
      setTimeout(() => {
        SecureStore.deleteItemAsync("token");
        router.replace("/");
      }, 3000);
    } else {
      router.push({
        pathname: "/modal",
        params: {
          error: `${data.error} \n ${data.message}`,
        },
      });
    }
    return Promise.reject(error);
  }
);

export async function refreshToken(
  refreshToken: string
): Promise<OAuthTokenResponse> {
  const refreshTokenBody: any = {
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };
  try {
    const response = await axios.post(
      apiUrl + "/oauth/token",
      refreshTokenBody,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  } catch (error) {
    SecureStore.deleteItemAsync("token");
    router.replace("/");
    return Promise.reject(error);
  }
}

function transformDataforSearchQuery(data: User[]): SearchUserType[] {
  return data.map((user: User) => {
    return {
      id: user.id,
      fullName: user.usual_full_name ? user.usual_full_name : "",
      login: user.login ? user.login : "",
      image: user.image.versions.small ? user.image.versions.small : undefined,
    };
  });
}

function transformDataforProfile(data: User): ProfileType {
  return {
    id: data.id ? data.id : 0,
    image: data.image.versions.small ? data.image.versions.small : undefined,
    fullName: data.usual_full_name ? data.usual_full_name : "",
    login: data.login ? data.login : "",
    wallet: data.wallet ? data.wallet : 0,
    correction_point: data.correction_point ? data.correction_point : 0,
    city: data.campus[0].city ? data.campus[0].city : "",
    cursusList: data.cursus_users ? data.cursus_users : [],
    projects: data.projects_users ? data.projects_users : [],
  };
}

export default axiosInstance;

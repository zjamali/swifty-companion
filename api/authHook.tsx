import { OAuthTokenResponse } from "@/constants/types";
import { useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";
import { router } from "expo-router";
import axios from "./api-client";

export default function useAuth() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const apiClientId = process.env.EXPO_PUBLIC_API_CLIENT;
  const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;
  const redirectUrl = process.env.EXPO_PUBLIC_REDIRECT_URL;

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: apiClientId!,
      redirectUri: redirectUrl!,
    },
    {
      authorizationEndpoint: `${apiUrl}/oauth/authorize`,
    }
  );

  async function exchangeAccessToken(code: string) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", apiClientId!);
    params.append("client_secret", apiSecret!);
    params.append("code", code);
    params.append("redirect_uri", redirectUrl!);

    const oAuthTokenResponse: OAuthTokenResponse = await axios(
      `${apiUrl}/oauth/token?` + params.toString(),
      {
        method: "POST",
      }
    )
      .then(async (response) => {
        return await response.data;
      })
      .catch(() => {
        router.push({
          pathname: "/modal",
          params: {
            error: "Something went wrong \n access token error",
          },
        });
      });
    return {
      ...oAuthTokenResponse,
      expires_in: new Date().getTime() + oAuthTokenResponse.expires_in * 1000,
    };
  }

  useEffect(() => {
    if (response && response.type === "success") {
      (async () => {
        const result = await exchangeAccessToken(response?.params?.code);
        console.log("result : ", result);
        await SecureStore.setItemAsync("token", JSON.stringify(result));
        Updates.reloadAsync();
      })();
    } else if (response && response.type === "error") {
      setTimeout(() => {
        router.push({
          pathname: "/modal",
          params: {
            error: response.error?.description
              ? response.error?.description
              : "Something went wrong \n try again later",
          },
        });
      }, 2000);
    }
  }, [response]);

  return [promptAsync];
}

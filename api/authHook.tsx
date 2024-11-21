import { OAuthTokenResponse } from "@/constants/types";
import {
  AuthRequestPromptOptions,
  AuthSessionResult,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import axios from "./api-client";
import { AuthContext } from "@/store/context";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiClientId = process.env.EXPO_PUBLIC_API_CLIENT;
const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;
const redirectUrl = process.env.EXPO_PUBLIC_REDIRECT_URL;

export default function useAuth(): [
  (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>,
  AuthSessionResult | null
] {
  const [{ setIsAuthenticated }] = useContext(AuthContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: apiClientId!,
      redirectUri: redirectUrl!,
    },
    {
      authorizationEndpoint: `${apiUrl}/oauth/authorize`,
    }
  );

  useEffect(() => {
    if (response && response.type === "success") {
      (async () => {
        const result = await exchangeAccessToken(response?.params?.code);
        if (result) {
          await SecureStore.setItemAsync("token", JSON.stringify(result));
          setIsAuthenticated(true);
          router.push("/search");
        }
      })();
    } else if (response && response.type === "error") {
      setTimeout(() => {
        router.push({
          pathname: "/modal",
          params: {
            error: response.error?.description
              ? response.error?.description
              : "Something went wrong \n try again later",
            canBedismiss: "yes",
          },
        });
      }, 2000);
    }
  }, [response]);

  return [promptAsync, response];
}

export async function exchangeAccessToken(code: string) {
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
    .catch((error) => {
      const status = error.response ? error.response.status : null;
      const data: any = error.response?.data;
      setTimeout(() => {
        router.push({
          pathname: "/modal",
          params: {
            error: data?.description
              ? data.description
              : "Something went wrong \n try again later",
            canBedismiss: "yes",
          },
        });
        return null;
      }, 2000);
    });
  if (oAuthTokenResponse) {
    return {
      ...oAuthTokenResponse,
      expires_in: new Date().getTime() + oAuthTokenResponse.expires_in * 1000,
    };
  }
}

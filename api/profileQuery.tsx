import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FetchOptionsType, OAuthTokenResponse, User } from "@/constants/types";
import { router } from "expo-router";

export default function profileQuery(id: string): any {
  const [isLoading, setLoading] = useState(false);
  const token = SecureStore.getItem("token");
  let accessToken: String = "";
  const [profile, setProfile] = useState<User | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  if (token) {
    const { access_token }: OAuthTokenResponse = JSON.parse(token);
    accessToken = access_token;
  }

  async function getPofile(id: String) {
    setLoading(true);
    const request: FetchOptionsType = {};
    request.headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(`${apiUrl}/v2/users/${id}`, request);
      if (response.ok) {
        const user: User = await response.json();
        setProfile(user);
      } else {
        const error = await response.json();
        router.push({
          pathname: "/modal",
          params: { error: error?.message },
        });
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPofile(id);
  }, [id]);

  return [isLoading, profile];
}

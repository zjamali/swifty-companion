import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { FetchOptionsType, OAuthTokenResponse, User } from "@/constants/types";
import * as Updates from "expo-updates";

export default function searchQuery(): any {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<[User]>();

  const token = SecureStore.getItem("token");
  let accessToken: string = "";

  if (token) {
    const { access_token }: OAuthTokenResponse = JSON.parse(token);
    accessToken = access_token;
  } else {
    Updates.reloadAsync();
  }

  async function searchQuery(login: string) {
    setLoading(true);
    const request: FetchOptionsType = {};
    request.headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(
        `${apiUrl}/v2/users?search[login]=${login}`,
        request
      );
      const users: [User] = await response.json();
      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return [searchQuery, isLoading, users, setUsers];
}

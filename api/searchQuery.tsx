import { useState } from "react";
import { SearchUserType, User } from "@/constants/types";
import axiosInstance from "./api-client";

export default function searchQuery(): any {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<[SearchUserType] | null>();

  async function searchQuery(login: string) {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/v2/users?search[login]=${login}`
      );

      const users: [SearchUserType] = response.data;
      setUsers(users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setUsers(null);
    }
  }
  return [searchQuery, isLoading, users, setUsers];
}

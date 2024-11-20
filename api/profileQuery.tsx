import { useEffect, useState } from "react";
import axiosInstance from "./api-client";
import { ProfileType, User } from "@/constants/types";

export default function profileQuery(
  id: string
): [
  boolean,
  ProfileType | null,
  React.Dispatch<React.SetStateAction<ProfileType | null>>
] {
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  async function getPofile(id: String) {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/v2/users/${id}`);
      setProfile(response?.data);
      setLoading(false);
    } catch (error) {
      setProfile(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPofile(id);
  }, [id]);

  return [isLoading, profile, setProfile];
}

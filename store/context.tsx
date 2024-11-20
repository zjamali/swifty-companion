import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { OAuthTokenResponse } from "@/constants/types";
import { refreshToken } from "@/api/api-client";

export const AuthContext = createContext<{ isAuthenticated: boolean }>({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storage = await SecureStore.getItem("token");
      console.log("storage : ", storage);
      if (storage) {
        const token: OAuthTokenResponse = JSON.parse(storage);
        const { refresh_token } = token;
        if (token.expires_in > new Date().getTime()) {
          setIsAuthenticated(true);
        } else {
          const token = await refreshToken(refresh_token);
          await SecureStore.setItemAsync(
            "token",
            JSON.stringify({
              ...token,
              expires_in: new Date().getTime() + token.expires_in * 1000,
            })
          );
          setIsAuthenticated(true);
        }
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

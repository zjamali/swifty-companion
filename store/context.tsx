import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { OAuthTokenResponse } from "@/constants/types";

export const AuthContext = createContext<{ isAuthenticated: boolean }>({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storage = await SecureStore.getItem("token");
      if (storage) {
        const token: OAuthTokenResponse = JSON.parse(storage);
        if (token.expires_in > new Date().getTime()) {
          setIsAuthenticated(true);
        } else {
          await SecureStore.deleteItemAsync("token");
          setIsAuthenticated(false);
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

import { router, Stack, useGlobalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import "react-native-reanimated";
import { AuthContext, AuthProvider } from "@/store/context";
import { Colors } from "@/constants/Colors";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

SplashScreen.preventAutoHideAsync();

function isEnvExist(): boolean {
  const env = [
    process.env.EXPO_PUBLIC_API_URL,
    process.env.EXPO_PUBLIC_API_CLIENT,
    process.env.EXPO_PUBLIC_API_SECRET,
    process.env.EXPO_PUBLIC_REDIRECT_URL,
  ];
  if (env.includes(undefined)) {
    router.push({
      pathname: "/modal",
      params: {
        error:
          "Error loading environment.\nThe application will not function properly.",
      },
    });
    return false;
  }
  return true;
}

const MyApp = () => {
  const [{ isAuthenticated }] = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && isEnvExist()) {
      router.replace({
        pathname: "/search",
      });
    }
    setTimeout(() => {
      setAppIsReady(true);
    }, 1000);
  }, [isAuthenticated]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile/[id]"
        options={{
          headerTitle: "Profile",
          headerBackTitle: "Search",
          headerTransparent: true,
          headerTitleStyle: {
            color: Colors.text,
          },
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "transparentModal",
          headerShown: false,
          fullScreenGestureEnabled: false,
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <MyApp />
    </AuthProvider>
  );
}

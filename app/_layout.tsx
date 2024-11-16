import { router, Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";
import { AuthContext, AuthProvider } from "@/store/context";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

const MyApp = () => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace({
        pathname: "/search",
      });
    }
  }, [isAuthenticated]);

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
          presentation: "modal",
          headerTitle: "Error",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <MyApp />
    </AuthProvider>
  );
}

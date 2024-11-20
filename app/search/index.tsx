import {
  View,
  Text,
  ViewStyle,
  ImageStyle,
  Image,
  Pressable,
  TextStyle,
  ActivityIndicator,
  Button,
} from "react-native";
import backgorundImage from "@/assets/images/default-cover-image.jpg";
import defaultProfileImage from "@/assets/images/default.png";
import * as SecureStore from "expo-secure-store";
import { Colors } from "@/constants/Colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SearchUserType } from "@/constants/types";
import searchHook from "@/api/searchQuery";
import React from "react";
import { StatusBar } from "expo-status-bar";

function SearchBar({
  search,
  isLoading,
  onChangeText,
  searchByLogin,
}: {
  search: string;
  isLoading: boolean;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  searchByLogin: any;
}) {
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <TextInput
        placeholder="Search for profile"
        style={{
          fontSize: 20,
          marginLeft: 10,
          width: "100%",
          backgroundColor: Colors.text,
          height: 40,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 5,
          position: "relative",
        }}
        autoCapitalize="none"
        value={search}
        onChangeText={onChangeText}
        keyboardType="ascii-capable"
        autoCorrect={false}
      />
      <View
        style={{
          position: "absolute",
          right: 20,
        }}
      >
        <Button
          title="Search"
          onPress={() => {
            searchByLogin(search);
          }}
          disabled={isLoading || search.length === 0}
        />
      </View>
    </View>
  );
}

export function UserCard({ user }: { user: SearchUserType }) {
  return (
    <Pressable
      style={{
        gap: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.tabIconDefault,
        padding: 10,
        margin: 5,
        borderRadius: 10,
      }}
      onPress={() => {
        router.push({
          pathname: "/profile/[id]",
          params: { id: user.id },
        });
      }}
    >
      <Image
        source={user.image ? { uri: user.image } : defaultProfileImage}
        style={[{ borderRadius: 50, width: 50, height: 50 }]}
      />
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: Colors.black,
          }}
        >
          {user.login}
        </Text>
        <Text>{user.fullName}</Text>
      </View>
    </Pressable>
  );
}

export default function Search() {
  const [search, onChangeText] = useState<string>("");
  const [searchQuery, isLoading, users, setUsers] = searchHook();

  useEffect(() => {
    if (search.length == 0) {
      setUsers(undefined);
    }
  }, [search]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={container}>
        <Image source={backgorundImage} style={background} />
        <SafeAreaView
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <SearchBar
            search={search}
            isLoading={isLoading as boolean}
            onChangeText={onChangeText}
            searchByLogin={searchQuery}
          />
          <ScrollView style={{ width: "100%", marginTop: 20 }}>
            {isLoading ? (
              <ActivityIndicator style={{ marginTop: 89 }} />
            ) : (
              <>
                {users && !users?.length && (
                  <Text
                    style={{
                      color: Colors.text,
                      fontSize: 20,
                      alignSelf: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    user not found
                  </Text>
                )}
                {users?.map((userItem: SearchUserType) => {
                  return <UserCard user={userItem} key={userItem.id} />;
                })}
              </>
            )}
          </ScrollView>
          <Pressable
            onPress={async () => {
              await SecureStore.deleteItemAsync("token");
              router.replace("/");
            }}
          >
            <Text style={logoutText}>Log Out</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

const container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
};

const background: ImageStyle = {
  width: "100%",
  height: "100%",
  flex: 1,
  resizeMode: "cover",
  position: "absolute",
  zIndex: -1,
  top: 0,
};

const logoutText: TextStyle = {
  marginTop: 10,
  fontSize: 16,
  fontWeight: 700,
  color: Colors.text,
};

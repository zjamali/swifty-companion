import SadEmoji from "@/assets/icons/sadEmoji";
import { Colors } from "@/constants/Colors";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, ViewStyle, Pressable, StyleSheet } from "react-native";

export default function Modal() {
  const { error } = useLocalSearchParams<{ error: string }>();

  return (
    <View style={container}>
      <View style={errorContainer}>
        <SadEmoji height={150} width={150} />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            textTransform: "capitalize",
            color: Colors.grey,
          }}
        >
          {error && error.length != 0
            ? error
            : "Something went wrong\n please try later "}
        </Text>
        <Link href="../" style={{ color: Colors.red, fontSize: 20 }}>
          close
        </Link>
      </View>
    </View>
  );
}

const container: ViewStyle = {
  top: 300,
  paddingHorizontal: 20,
};

const errorContainer: ViewStyle = {
  height: 300,
  backgroundColor: Colors.text,
  alignItems: "center",
  justifyContent: "center",
  gap: 25,
  borderRadius: 20,
};

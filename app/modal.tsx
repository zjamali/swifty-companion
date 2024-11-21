import SadEmoji from "@/assets/icons/sadEmoji";
import { Colors } from "@/constants/Colors";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, ViewStyle } from "react-native";

export default function Modal() {
  const { error, canBedismiss } = useLocalSearchParams<{
    error: string;
    canBedismiss: any;
  }>();

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
        {canBedismiss && canBedismiss === "yes" && (
          <Link href="../" style={{ color: Colors.red, fontSize: 20 }}>
            close
          </Link>
        )}
      </View>
    </View>
  );
}

const container: ViewStyle = {
  top: 250,
  paddingHorizontal: 20,
};

const errorContainer: ViewStyle = {
  height: 400,
  backgroundColor: Colors.text,
  alignItems: "center",
  justifyContent: "center",
  gap: 25,
  borderRadius: 20,
};

import SadEmoji from "@/assets/icons/sadEmoji";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle } from "react-native";

export default function Modal() {
  const { error } = useLocalSearchParams<{ error: string }>();

  return (
    <View style={container}>
      <SadEmoji height={150} width={150} />
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {error ? error : "Network error \n please check your connection"}
      </Text>
    </View>
  );
}

const container: ViewStyle = {
  height: 500,
  alignItems: "center",
  justifyContent: "center",
  gap: 25,
};

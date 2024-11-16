import {
  View,
  Text,
  ViewStyle,
  Image,
  ImageStyle,
  TextStyle,
  Pressable,
} from "react-native";
import backgorundImage from "@/assets/images/default-cover-image.jpg";
import { Colors } from "@/constants/Colors";
import SchoolLogo from "@/assets/icons/42Logo";

import * as WebBrowser from "expo-web-browser";
import useAuth from "@/api/authHook";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [promptAsync] = useAuth();

  return (
    <View style={loginView}>
      <Image source={backgorundImage} style={loginBackground} />
      <Pressable style={ButtonContaine} onPress={() => promptAsync()}>
        <Text style={loginText}>Sign in with</Text>
        <SchoolLogo
          width={40}
          height={40}
          fill={Colors.black}
          style={{ marginLeft: 10 }}
        />
      </Pressable>
    </View>
  );
}

const ButtonContaine: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  width: 250,
  height: 60,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: Colors.text,
};

const loginText: TextStyle = {
  fontSize: 22,
  fontWeight: 700,
  color: Colors.black,
};

const loginView: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

const loginBackground: ImageStyle = {
  width: "100%",
  height: "100%",
  flex: 1,
  resizeMode: "cover",
  position: "absolute",
  zIndex: -1,
  top: 0,
};

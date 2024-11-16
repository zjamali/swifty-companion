import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function LogoutIcon(props: SvgProps) {
  return (
    <Svg fill="none" height={30} viewBox="0 0 24 24" width={30} {...props}>
      <Path
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

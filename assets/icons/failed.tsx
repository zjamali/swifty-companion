import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function FailedIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M18 6L6 18" />
      <Path d="M6 6L18 18" />
    </Svg>
  );
}

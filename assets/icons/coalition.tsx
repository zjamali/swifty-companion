import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function CoalitionIcon(props: SvgProps) {
  return (
    <Svg width={26} height={46} fill="#235a16" opacity={100} {...props}>
      <Path d="M0 27V0h35.5v27L13 45.5l-13-11z" />
    </Svg>
  );
}

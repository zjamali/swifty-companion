import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function DropdownIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" fill="none" stroke="#fff" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5z"
        fill="#fff"
      />
    </Svg>
  );
}

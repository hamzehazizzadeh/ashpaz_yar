import React from "react";
import { Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { defaultFontFamily } from "../fontFamilyUtils/fontFamilyUtils";

const ResponsiveText = ({
  color = "#000",
  fontFamily = defaultFontFamily,
  fontSize = 2,
  style,
  children,
  ...otherProps
}) => {
  return (
    <Text
      {...otherProps}
      style={[
        style,
        {
          color,
          fontSize: RFPercentage(fontSize),
          fontFamily,
          textAlign: "justify",
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default ResponsiveText;

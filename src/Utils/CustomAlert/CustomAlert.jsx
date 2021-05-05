import React from "react";
import { View } from "react-native";
import ResponsiveText from "../ResponsiveText/ResponsiveText";

const CustomAlert = ({
  backgroundColor = "#23366b",
  color = "#fff",
  message,
  fontSize = 1.8,
}) => {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 5,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        padding: 7,
      }}
    >
      <ResponsiveText fontSize={fontSize} color={color}>
        {message}
      </ResponsiveText>
    </View>
  );
};

export default CustomAlert;

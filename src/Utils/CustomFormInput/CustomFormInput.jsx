import React from "react";
import { TextInput } from "react-native";
import { Label } from "native-base";

import { chefStyles } from "./../../assets/style/style";

const CustomFormInput = ({ style, label, ...otherProps }) => {
  return (
    <>
      {label ? <Label style={chefStyles.label}>{label}</Label> : null}
      <TextInput
        placeholderTextColor={"#aaa"}
        style={[chefStyles.formInput, style]}
        {...otherProps}
      />
    </>
  );
};

export default CustomFormInput;

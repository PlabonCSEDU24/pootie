import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const Input = ({ style, ...props }) => {
  return <TextInput {...props} style={[styles.textInput, style]} />;
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.lightGray2,
    width: "100%",
    padding: SIZES.padding_fields,
    borderRadius: SIZES.radius,
  },
});

import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const FilledButton = ({ title, onPress, style, loading }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FilledButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: "100%",
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding_fields,
    borderRadius: SIZES.radius,
  },
  text: {
    ...FONTS.button,
    color: COLORS.white,
  },
});

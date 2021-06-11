import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.roundButton}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
  },
});
export default TabBarCustomButton;

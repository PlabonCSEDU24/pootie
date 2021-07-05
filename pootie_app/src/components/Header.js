import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ navigation, title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    backgroundColor: COLORS.white,
    elevation: 5,
    alignItems: "center",
    paddingTop: 28,
    paddingHorizontal: 14,
  },
  title: {
    marginLeft: 20,
    ...FONTS.body2_bangla,
  },
});

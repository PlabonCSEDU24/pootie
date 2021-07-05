import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants";
const CustomHeader = ({ navigation, title, showSearch }) => {
  const handleDrawer = () => {
    navigation.toggleDrawer();
  };
  return (
    <View style={styles.header}>
      <Feather
        name="menu"
        size={24}
        color={COLORS.lightGray}
        style={styles.menuIcon}
        onPress={handleDrawer}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {showSearch && (
        <TouchableOpacity
          style={styles.srcIcon}
          onPress={() => {
            navigation.navigate("search");
          }}
        >
          <Ionicons name="search-circle" size={30} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    position: "absolute",
    left: 0,
  },
  title: {
    ...FONTS.body3,
    color: COLORS.lightGray,
  },
  srcIcon: {
    position: "absolute",
    right: -4,
  },
});

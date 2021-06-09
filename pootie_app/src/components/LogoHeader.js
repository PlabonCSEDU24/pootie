import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FONTS, images } from "../constants";

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={images.book_stack} style={styles.image} />
      <Text style={styles.pootieText}>POOTIE</Text>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  pootieText: {
    ...FONTS.body3,
    letterSpacing: 20,
  },
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS } from "../constants";
import { BACKEND_URL } from "../constants/config";
import { AntDesign } from "@expo/vector-icons";
const maxLength = 20;
const PostCard = ({ item, onPress, deletable, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.image}
          source={{
            uri: `${BACKEND_URL}/api/contents/images/${item.photos[0].fileName}`,
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.bookText}>
            {item.bookName.length > maxLength
              ? item.bookName.substring(0, maxLength - 3) + "..."
              : item.bookName}
          </Text>
          <Text style={styles.priceText}>{"৳ " + item.price}</Text>
        </View>
      </TouchableOpacity>
      {deletable && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <AntDesign name="delete" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 16,
    backgroundColor: COLORS.lightGray2,
    width: "48%",
    borderRadius: 10,
    overflow: "hidden",
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 6,
  },
  image: {
    height: 156,
    width: "100%",
    resizeMode: "cover",
  },
  bookText: {
    ...FONTS.body3_bangla,
  },
  priceText: {
    ...FONTS.body3_bangla,
    color: COLORS.links,
  },
  deleteBtn: {
    height: 40,
    width: 50,
    backgroundColor: COLORS.links,
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

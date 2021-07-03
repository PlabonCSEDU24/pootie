import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS } from "../constants";
import { BACKEND_URL } from "../constants/config";
const maxLength = 20;
const PostCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
});

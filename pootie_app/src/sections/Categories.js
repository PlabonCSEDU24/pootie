import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, FONTS, images, SIZES } from "../constants";
//dummy categories
import categories from "../constants/Categories";

const Categories = ({ navigation }) => {
  //category item that will be rendered
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        navigation.navigate("postsByCategory", { category: item.title });
      }}
    >
      <Image
        source={item.logo}
        style={styles.logo}
        tintColor={COLORS.lightGray}
      />
      <Text style={styles.filterItemText}>{item.title} </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: SIZES.padding,
  },
  categoryItem: {
    width: 100,
    height: 80,
    paddingTop: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  filterItemText: {
    ...FONTS.body3_bangla,
    paddingLeft: 4,
    color: COLORS.lightGray,
  },
  logo: {
    height: 40,
    width: 40,
    marginBottom: 4,
    resizeMode: "contain",
  },
});

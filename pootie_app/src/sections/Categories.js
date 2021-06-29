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
const categories = [
  {
    id: "1",
    title: "ইউনিভার্সিটি",
    logo: images.knowledge,
  },
  {
    id: "2",
    title: "উপন্যাস",
    logo: images.book,
  },
  {
    id: "3",
    title: "ইঞ্জিনিয়ারিং",
    logo: images.engineering,
  },
  {
    id: "4",
    title: "মেডিকেল",
    logo: images.medical,
  },
  {
    id: "5",
    title: "স্কুল ও কলেজ ",
    logo: images.school,
  },

  {
    id: "6",
    title: "গণিত",
    logo: images.math,
  },
  {
    id: "7",
    title: "বিজ্ঞান ও প্রযুক্তি",
    logo: images.physics,
  },

  {
    id: "8",
    title: "ভর্তি প্রস্তুতি",
    logo: images.plan,
  },
  {
    id: "9",
    title: " নিয়োগ প্রস্তুতি",
    logo: images.interview,
  },
  {
    id: "10",
    title: "কম্পিউটার",
    logo: images.computer,
  },
  {
    id: "11",
    title: "ইতিহাস ও ঐতিহ্য",
    logo: images.history,
  },
  {
    id: "12",
    title: "ধর্মীয়",
    logo: images.mosque,
  },
  {
    id: "13",
    title: "খেলাধুলা",
    logo: images.sport,
  },
  {
    id: "14",
    title: "কমিক্স",
    logo: images.manga,
  },

  {
    id: "15",
    title: "কবিতা ও আবৃত্তি",
    logo: images.poem,
  },

  {
    id: "16",
    title: "মুক্তিযুদ্ধ",
    logo: images.dove,
  },
  {
    id: "17",
    title: "রান্নাবান্না",
    logo: images.cooking,
  },
  {
    id: "18",
    title: "অন্যান্য",
    logo: images.more,
  },
];
const Categories = () => {
  //category item that will be rendered
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        alert(item.title);
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

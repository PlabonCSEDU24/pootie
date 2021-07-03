import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking,
  FlatList,
  ScrollView,
} from "react-native";
import { COLORS, FONTS } from "../../constants";
import Header from "../../components/Header";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Carousel from "../../components/Carousel";
import FilledButton from "../../components/FilledButton";
const { width: screenWidth } = Dimensions.get("window");
const timeOptions = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const Comments = [
  {
    id: "1",
    username: "Plabon",
    comment: "Nice book,fngfkdghndghfdghbdfikgfdiughdiughdiughdigduidikgdi",
  },
  {
    id: "2",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "3",
    username: "Plabon",
    comment: "Nice book",
  },
  {
    id: "4",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "5",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "6",
    username: "Plabon",
    comment: "Nice book",
  },
  {
    id: "7",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "8",
    username: "Plabon",
    comment: "Nice book",
  },
  {
    id: "9",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "10",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "11",
    username: "Plabon",
    comment: "Nice book",
  },
  {
    id: "12",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "13",
    username: "Plabon",
    comment: "Nice book",
  },
  {
    id: "14",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "15",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "16",
    username: "Plabon",
    comment: "Nice book",
  },
  {
    id: "17",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "18",
    username: "Plabon",
    comment: "Nice book",
  },
  {
    id: "19",
    username: "Yo",
    comment: "I want it",
  },
  {
    id: "20",
    username: "Yo",
    comment: "I want it",
  },
];
const PostDetail = ({ route, navigation }) => {
  const {
    _id,
    bookName,
    price,
    author,
    description,
    category,
    photos,
    comments,
    contactInfo,
    createdAt,
  } = route.params;

  const [commentID, setCommentID] = useState(null);

  let SellerContact = contactInfo.phone;

  const makeCall = () => {
    if (Platform.OS === "android") {
      SellerContact = "tel:$(" + SellerContact + ")";
    } else {
      SellerContact = "telpropmpt:$(" + SellerContact + ")";
    }
    Linking.openURL(SellerContact);
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentList} key={item.id}>
      <FontAwesome5 name="user-circle" size={24} color="black" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.commentUser}>{item.username}</Text>
        <Text style={{ marginRight: 20 }}>{item.comment}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={bookName} navigation={navigation} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Carousel data={photos} />
        <View style={styles.infoContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.bookName}>{bookName}</Text>
            <Text style={styles.priceText}>{"৳ " + price}</Text>
          </View>
          <View style={styles.addSec}>
            <Ionicons name="location-outline" size={20} color="black" />
            <Text style={styles.addText}> {contactInfo.address}</Text>
          </View>

          <View style={styles.addSec}>
            <Ionicons name="time-outline" size={20} color="black" />
            <Text style={styles.addText}>
              {" "}
              {new Date(createdAt).toLocaleDateString(undefined, timeOptions)}
            </Text>
          </View>
          <Text style={styles.detailTxt}> {description}</Text>

          <View style={styles.margin} height="30%">
            {/*<Text style={styles.textComment}>Comments</Text>
            <FlatList data={Comments} renderItem={renderComment} />*/}
          </View>
          <View style={styles.commentContainer}>
            <TextInput placeholder="add a comment"></TextInput>
            <TouchableOpacity
              TouchableOpacity={0.6}
              onPress={() => {
                console.log("posted");
              }}
            >
              <MaterialCommunityIcons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <FilledButton
          onPress={makeCall}
          style={styles.contactBtn}
          title={"কনট্যাক্ট সেলার"}
        />
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            console.log("Post Saved!");
          }}
          activeOpacity={0.2}
        >
          <Feather name="bookmark" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  body: {},

  item: {
    width: screenWidth - 60,
    height: screenWidth - 150,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({
      ios: 0,
      android: 0,
    }),
    backgroundColor: "white",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  bookName: {
    ...FONTS.body1,
  },
  margin: {
    marginTop: 5,
    marginLeft: 30,
    marginRight: 10,
    height: "15%",
  },
  bottomSection: {
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    height: "18%",
    minHeight: 140,
    width: "100%",
    bottom: 0,
    elevation: 20,
  },
  contactBtn: {
    width: "80%",
    marginRight: 10,
    height: 40,
  },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addSec: {
    flexDirection: "row",
  },
  addText: {
    ...FONTS.body3_bangla,
    color: COLORS.lightGray4,
  },
  priceText: {
    ...FONTS.body3,
    color: COLORS.links,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.white,
  },
  detailTxt: {
    ...FONTS.body2_bangla,
    marginTop: 10,
  },

  textComment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  commentContainer: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 10,
    marginTop: 10,
    borderColor: "black",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  commentUser: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentList: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    padding: 10,
  },
});

export default PostDetail;

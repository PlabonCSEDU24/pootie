import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Linking,
  ScrollView,
} from "react-native";
import TimeAgo from "react-native-timeago";
import { BACKEND_URL } from "../../constants/config";
import { COLORS, FONTS } from "../../constants";
import Header from "../../components/Header";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Carousel from "../../components/Carousel";
import FilledButton from "../../components/FilledButton";
import { useHttpClient } from "../../uitls/http-hook";
const PostDetail = ({ route, navigation }) => {
  const { isLoading, sendRequest } = useHttpClient();
  const [myComment, setMyComment] = useState("");
  const [comments, setComments] = useState([]);
  const {
    _id,
    bookName,
    price,
    author,
    description,
    photos,
    contactInfo,
    createdAt,
  } = route.params;

  useEffect(() => {
    fetchComments();
  }, []);

  const maxLength = 20;
  const makeCall = () => {
    let SellerContact = contactInfo.phone;
    if (Platform.OS === "android") {
      SellerContact = "tel:$(" + SellerContact + ")";
    } else {
      SellerContact = "telpropmpt:$(" + SellerContact + ")";
    }
    Linking.openURL(SellerContact);
  };
  const fetchComments = async () => {
    try {
      const responseData = await sendRequest(
        BACKEND_URL + `/api/posts/${_id}/comments/`
      );
      console.log(responseData);
      if (responseData) {
        setComments(responseData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const makeComment = async () => {
    try {
      const responseData = await sendRequest(
        BACKEND_URL + `/api/posts/${_id}/comments`,
        "POST",
        JSON.stringify({
          comment: myComment,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (responseData) {
        setComments(responseData.comments);
        setMyComment("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={
          bookName.length > maxLength
            ? bookName.substring(0, maxLength - 3) + "..."
            : bookName
        }
        navigation={navigation}
      />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Carousel data={photos} />
        <View style={styles.infoContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.bookName}>{bookName}</Text>
            <Text style={styles.priceText}>{"৳ " + price}</Text>
          </View>
          <Text style={styles.authorText}> {author}</Text>

          <View style={styles.addSec}>
            <Ionicons name="location-outline" size={20} color="black" />
            <Text style={styles.addText}> {contactInfo.address}</Text>
          </View>

          <View style={styles.addSec}>
            <Ionicons name="time-outline" size={20} color="black" />
            <Text style={styles.addText}>
              {" "}
              {new Date(createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.detailTxt}> {description}</Text>

          <View style={styles.commentContainer}>
            <View style={styles.div} />
            {comments.map((comment) => {
              return (
                <View key={comment._id} style={styles.wrappererAbba}>
                  <View style={styles.commentWrapper}>
                    <FontAwesome name="user-o" size={24} color="black" />
                    <View style={styles.commentThread}>
                      <Text style={styles.userTxt}>{comment.userName}</Text>
                      <Text style={styles.commentTxt}>{comment.comment}</Text>
                    </View>
                  </View>
                  <TimeAgo
                    style={styles.timeText}
                    hideAgo={true}
                    time={comment.time}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.addComment}>
            <TextInput
              value={myComment}
              multiline={true}
              onChangeText={(text) => {
                setMyComment(text);
              }}
              selectionColor={COLORS.primary}
              style={styles.textInput}
              placeholder="কমেন্ট করুন..."
            />
            {isLoading && (
              <ActivityIndicator size="small" color={COLORS.primary} />
            )}
            {!isLoading && (
              <TouchableOpacity TouchableOpacity={0.6} onPress={makeComment}>
                <Ionicons name="send" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View paddingVertical={200} />
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
    maxWidth: "80%",
  },
  div: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray2,
    marginBottom: 20,
  },

  bottomSection: {
    position: "absolute",
    paddingHorizontal: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
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
  authorText: {
    ...FONTS.body2_bangla,
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
    marginTop: 20,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userTxt: {
    ...FONTS.body2,
  },
  commentTxt: {
    ...FONTS.body2_bangla,
  },
  commentList: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  wrappererAbba: {
    marginBottom: 10,
  },
  commentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentThread: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingBottom: 6,
    marginLeft: 20,
    marginRight: 20,
  },
  addComment: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: COLORS.lightGray2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: "space-between",
  },
  timeText: {
    marginLeft: 40,
    ...FONTS.body3_bangla,
  },
  infoContainer: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    ...FONTS.body2_bangla,
    marginRight: 20,
  },
});

export default PostDetail;

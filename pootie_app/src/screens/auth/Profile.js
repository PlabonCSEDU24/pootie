import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, images } from "../../constants";
import Context from "../../context/Context";
import { TouchableOpacity } from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { BACKEND_URL } from "../../constants/config";

const Profile = ({ navigation }) => {
  const { user, logout } = useContext(Context);

  // console.log(user);

  let userProfilePicUri = null;
  let profilePhotoText = "No profile photo!";

  if (user?.profilePhoto?.fileName) {
    userProfilePicUri = `${BACKEND_URL}/api/contents/images/${user.profilePhoto.fileName}`;
    profilePhotoText = "Your profile photo";
  }
  // console.log(userProfilePicUri);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              userProfilePicUri ? { uri: userProfilePicUri } : images.default_dp
            }
            style={styles.image}
          />
        </View>
        <Text style={styles.profilePhotoText}>{profilePhotoText}</Text>
        <View style={styles.textMargin}>
          <View flexDirection="column">
            <Text style={styles.bigText}>Name: </Text>
            <Text style={styles.userText}>{user.name}</Text>
          </View>
          <View flexDirection="column">
            <Text style={styles.bigText}>Mail: </Text>
            <Text style={styles.userText}>{user.email}</Text>
          </View>
          <View flexDirection="column">
            <Text style={styles.bigText}>Contact No. : </Text>
            <Text style={styles.userText}>{user.contact_no}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileEdit");
            }}
          >
            <View flexDirection="row">
              <Feather name="edit" size={24} color={COLORS.primary} />
              <Text style={styles.buttonText}>Edit profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
          >
            <View flexDirection="row">
              <SimpleLineIcons
                name="logout"
                size={24}
                color={COLORS.lightRed}
              />
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  profilePhotoText: {
    ...FONTS.body2,
    color: COLORS.lightGray,
    textAlign: "center",
  },
  bigText: {
    ...FONTS.body2,
    color: COLORS.lightGray,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.primary,
    // marginHorizontal: 100,
    padding: SIZES.padding,
  },
  textMargin: {
    padding: SIZES.padding2,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding,
    overflow: "hidden",
  },
  bottom: {
    padding: SIZES.padding,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 100,
  },
  userText: {
    ...FONTS.body2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Profile;

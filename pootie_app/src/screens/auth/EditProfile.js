import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { COLORS, SIZES, FONTS, images } from "../../constants";
import Context from "../../context/Context";
import { TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import PickerModal from "../../components/PickerModal";
import Input from "../../components/Input";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { BACKEND_URL } from "../../constants/config";
import { useHttpClient } from "../../uitls/http-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: if error occurs focus on that field using useRef()

const EditProfile = ({ navigation }) => {
  const { user, setUser, setAuthToken } = useContext(Context);
  let userProfilePicUri = null;
  if (user?.profilePhoto?.fileName) {
    userProfilePicUri = `${BACKEND_URL}/api/contents/images/${user.profilePhoto.fileName}`;
  }
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(userProfilePicUri);
  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [contactNo, setContactNo] = useState(user.contact_no);

  const { isLoading, error, sendRequest } = useHttpClient();

  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("auth_user", jsonValue);
    } catch (err) {
      console.log(err);
    }
  };
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem("auth_token", value);
    } catch (err) {
      console.log(err);
    }
  };
  const sendUserUpdateRequest = async (update) => {
    try {
      const responseData = await sendRequest(
        `${BACKEND_URL}/api/users`,
        "PUT",
        update
      );
      if (responseData) {
        // console.log("Edit profile ln 64: after updating", responseData);
        setUser(responseData.user);
        setAuthToken(responseData.token);
        storeToken(responseData.token);
        storeUser(responseData.user);
        navigation.navigate("Profile");
      }
    } catch (err) {
      // console.log(err);
      Alert.alert("Update Failed", err.message, [
        { text: "Dismiss", style: "default" },
      ]);
    }
  };

  const handleUpdateSubmit = () => {
    const update = new FormData();
    let shouldUpdate = false;
    if (newPassword !== confirmNewPassword) {
      Alert.alert(
        "Password Confirm Error",
        "New password and confirm new password does not match",
        [{ text: "Dismiss", style: "default" }]
      );
      return;
    }
    if (currentPassword === "") {
      Alert.alert(
        "Must need password",
        "We need your current password to change your profile infos",
        [{ text: "Dismiss", style: "default" }]
      );
      return;
    }
    if (user.name !== name) {
      shouldUpdate = true;
      update.append("name", name);
    }
    if (user.contact_no !== contactNo) {
      shouldUpdate = true;
      update.append("contact_no", contactNo);
    }
    update.append("currentPassword", currentPassword);
    if (newPassword !== "") {
      shouldUpdate = true;
      update.append("newPassword", newPassword);
    }
    if (selectedImage !== userProfilePicUri) {
      shouldUpdate = true;
      let filename = selectedImage.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      update.append("profilePhoto", {
        uri: selectedImage,
        name: filename,
        type,
      });
    }
    // console.log(update);
    if (shouldUpdate) sendUserUpdateRequest(update);
    else {
      Alert.alert("Nothing to update", "You did not change anything");
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // console.log(result);

      if (!result.cancelled) {
        setSelectedImages(result.uri);
        setShowModal(false);
        // console.log(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setShowModal(false);
      // console.log(result.uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={
                selectedImage ? { uri: selectedImage } : images.default_dp
              }
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              activeOpacity={0.5}
            >
              <View style={styles.updatePhoto}>
                <MaterialIcons
                  name="file-upload"
                  size={36}
                  color={COLORS.primary}
                />
                <Text style={styles.bigText}>Update Photo</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.textMargin}>
            <View style={styles.inBetweenText}>
              <Feather name="user" size={24} color="black" />
              <Text style={styles.userText}>User Name</Text>
            </View>
            <Input value={name} onChangeText={setName} />
            <View style={styles.inBetweenText}>
              <Feather name="mail" size={24} color="black" />
              <Text style={styles.userText}>Current Password</Text>
            </View>
            <Input
              value={currentPassword}
              placeholder={"(This is required)"}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
            <View style={styles.inBetweenText}>
              <Feather name="mail" size={24} color="black" />
              <Text style={styles.userText}>New Password</Text>
            </View>
            <Input
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <View style={styles.inBetweenText}>
              <Feather name="mail" size={24} color="black" />
              <Text style={styles.userText}>Confirm New Password</Text>
            </View>
            <Input
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry
            />
            <View style={styles.inBetweenText}>
              <Feather name="phone-call" size={24} color="black" />
              <Text style={styles.userText}>Contact No.</Text>
            </View>
            <Input value={contactNo} onChangeText={setContactNo} />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <View style={styles.buttonContainer}>
                <MaterialCommunityIcons name="cancel" size={24} color="red" />
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleUpdateSubmit();
              }}
            >
              <View style={styles.buttonContainer}>
                <Entypo name="check" size={24} color="green" />
                <Text style={styles.buttonText}>Update</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <PickerModal
          showModal={showModal}
          hideModal={() => {
            setShowModal(false);
          }}
          onSelectingClick={takePicture}
          onSelectingPick={pickImage}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding2,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.primary,
    // marginHorizontal: 100,
  },
  textMargin: {
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    padding: SIZES.padding,
  },
  bottom: {
    marginTop: 30,
    marginBottom: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  userText: {
    fontSize: FONTS.body2.fontSize,
    fontWeight: "900",
    paddingHorizontal: SIZES.padding,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  updatePhoto: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inBetweenText: {
    flexDirection: "row",
    marginVertical: 10,
  },
  bigText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default EditProfile;

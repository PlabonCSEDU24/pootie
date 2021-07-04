import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
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

const username = "Lionel Messi";
const mailId = "leo@lm10.com";
const contact = "1234567890";

const Profile = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_BSXPlBjoBeJruSaCamv7kQuMNjoIIWX0CITXUVoapFCbRM9g"
  );
  const { user } = useContext(Context);

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
      console.log(result);

      if (!result.cancelled) {
        setSelectedImages(result.uri);
        setShowModal(false);
        console.log(result.uri);
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

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setShowModal(false);
      console.log(result.uri);
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
              source={{
                uri: selectedImage,
              }}
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
              <Text style={styles.userText}> User Name</Text>
            </View>
            <Input value={username} />
            <View style={styles.inBetweenText}>
              <Feather name="mail" size={24} color="black" />
              <Text style={styles.userText}> Mail</Text>
            </View>
            <Input value={mailId} />
            <View style={styles.inBetweenText}>
              <Feather name="phone-call" size={24} color="black" />
              <Text style={styles.userText}> Contact No.</Text>
            </View>
            <Input value={contact} />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                console.log("update cancelled");
              }}
            >
              <View style={styles.buttonContainer}>
                <MaterialCommunityIcons name="cancel" size={24} color="red" />
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("update done");
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
    marginTop: 60,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginHorizontal: 100,
  },
  textMargin: {
    marginHorizontal: 40,
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  bottom: {
    marginTop: 30,
    marginBottom: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  userText: {
    fontSize: 18,
    fontWeight: "900",
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
		flexDirection: 'row',
	}
});

export default Profile;

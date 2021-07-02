import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input";
import { COLORS, FONTS, SIZES } from "../../constants";
import Context from "../../context/Context";
import PickerModal from "../../components/PickerModal";
import UploadButton from "../../components/UploadButton";
import { AntDesign } from "@expo/vector-icons";
const CreatePost = ({ navigation }) => {
  const { isLoggedIn } = useContext(Context);
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [bookDetails, setBookDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  //redirect to authentication if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Auth");
    }
  }, []);

  //choose image from gallery
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
      if (selectedImages.length < 3)
        setSelectedImages((previousImages) => {
          return previousImages.concat(result.uri);
        });
      setShowModal(false);
      console.log(result.uri);
    }
  };
  //take photo
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
        if (selectedImages.length < 3)
          setSelectedImages((previousImages) => {
            return previousImages.concat(result.uri);
          });
        setShowModal(false);
        console.log(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bookNameInputHandler = (inputBookName) => {
    setBookName(inputBookName);
  };

  const priceInputHandler = (inputPrice) => {
    setPrice(inputPrice.replace(/[^0-9]/g, ""));
  };

  const bookDetailsInputaHandler = (inputDetails) => {
    setBookDetails(inputDetails);
  };

  const onResetHandler = () => {
    setBookName("");
    setPrice("");
    setBookDetails("");
  };

  const onPostHandler = () => {
    if (bookName === "") {
      Alert.alert("Book name empty!", "Please enter the name of your book", [
        {
          text: "ok",
          style: "destructive",
        },
      ]);
      return;
    } else if (price === "" || parseInt(price) === 0) {
      Alert.alert("Name your price!", "Please enter a valid price(in BDT)", [
        {
          text: "ok",
          style: "destructive",
        },
      ]);
      setPrice("");
      return;
    } else if (bookDetails === "") {
      Alert.alert("", "Please write a few things about the book", [
        {
          text: "ok",
          style: "destructive",
        },
      ]);
      return;
    }

    console.log("Book Name: " + bookName);
    console.log("Price: " + parseInt(price));
    console.log("Details about the book: " + bookDetails);
    onResetHandler();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowModal(false);
      }}
    >
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder="বইয়ের নাম"
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          maxLength={256}
          onChangeText={bookNameInputHandler}
          value={bookName}
        />
        <Input
          style={styles.input}
          placeholder="লেখকের নাম"
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          maxLength={256}
          onChangeText={bookNameInputHandler}
          value={bookName}
        />

        <Input
          style={styles.input}
          placeholder="মূল্য"
          keyboardType="number-pad"
          maxLength={10}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={priceInputHandler}
          value={price}
        />
        <TouchableOpacity style={styles.picker}>
          <Text style={styles.catText}>{"ক্যাটাগরি সিলেক্ট করুন"}</Text>
          <AntDesign name="circledowno" size={20} color={COLORS.lightGray4} />
        </TouchableOpacity>
        <Input
          style={styles.multilineInput}
          placeholder="বিস্তারিত লিখুন"
          multiline={true}
          numberOfLines={4}
          maxLength={1000}
          autoCapitalize="sentences"
          onChangeText={bookDetailsInputaHandler}
          value={bookDetails}
        />
        <Text style={styles.upText}>{"ছবি আপলোড করুন (সর্বোচ্চ ৩ টি)"}</Text>
        <View style={styles.uploadButtons}>
          <UploadButton
            onPress={() => {
              setShowModal(true);
            }}
            uri={selectedImages.length > 0 && selectedImages[0]}
            onDelete={() => {
              setSelectedImages((previousImages) => {
                previousImages.splice(0, 1);
                return previousImages;
              });
              setShowModal(true);
            }}
          />
          <UploadButton
            onPress={() => {
              setShowModal(true);
            }}
            uri={selectedImages.length > 1 && selectedImages[1]}
            onDelete={() => {
              setSelectedImages((previousImages) => {
                previousImages.splice(1, 1);
                return previousImages;
              });
              setShowModal(true);
            }}
          />
          <UploadButton
            onPress={() => {
              setShowModal(true);
            }}
            uri={selectedImages.length > 2 && selectedImages[2]}
            onDelete={() => {
              setSelectedImages((previousImages) => {
                previousImages.splice(2, 1);
                return previousImages;
              });
              setShowModal(true);
            }}
          />
        </View>
        <Text style={styles.upText}>{"ঠিকানা"}</Text>
        <TouchableOpacity
          style={styles.addBar}
          onPress={() => {
            console.log("show map");
          }}
        >
          <Text style={styles.addText}>
            address here pencil box i donnow where i leave this needs to be more
            bigger
          </Text>
        </TouchableOpacity>

        <PickerModal
          showModal={showModal}
          hideModal={() => {
            setShowModal(false);
          }}
          onSelectingClick={takePicture}
          onSelectingPick={pickImage}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: SIZES.padding_fields,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    margin: 10,
  },
  input: {
    marginBottom: 10,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    alignItems: "flex-end",
  },
  upText: {
    ...FONTS.body3_bangla,
    color: COLORS.lightGray4,
    marginTop: 10,
    marginBottom: 4,
  },

  uploadButtons: {
    flexDirection: "row",
  },
  addBar: {
    height: 52,
    width: "100%",
    backgroundColor: COLORS.lightGray2,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addText: {
    ...FONTS.body4,
    color: COLORS.lightGray4,
  },
  picker: {
    height: 52,
    backgroundColor: COLORS.lightGray2,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  catText: {
    ...FONTS.body3_bangla,
    color: COLORS.lightGray4,
  },
});

export default CreatePost;

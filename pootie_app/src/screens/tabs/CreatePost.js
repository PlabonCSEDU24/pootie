import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input";
import { COLORS, FONTS, SIZES } from "../../constants";
import Context from "../../context/Context";
import PickerModal from "../../components/PickerModal";
import UploadButton from "../../components/UploadButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CategoryModal from "../../components/CategoryModal";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import FilledButton from "../../components/FilledButton";
import { BACKEND_URL } from "../../constants/config";
import { useHttpClient } from "../../uitls/http-hook";

const CreatePost = ({ navigation }) => {
  const { isLoggedIn, user, setPosts } = useContext(Context);
  const { isLoading, error, sendRequest } = useHttpClient();
  //input states
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [bookDetails, setBookDetails] = useState("");
  const [category, setCategory] = useState("");
  const [mobile, setMobile] = useState(user.contact_no);
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  //modal states
  const [showModal, setShowModal] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  //redirect to authentication if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Auth");
    } else {
      getLocation();
    }
  }, []);

  //get current coords + address
  const getLocation = async () => {
    setLocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
    let addr = await Location.reverseGeocodeAsync(coords);
    const fullAddress =
      addr[0].street + ", " + addr[0].district + ", " + addr[0].city;
    setAddress(fullAddress);
    setLocationLoading(false);
  };

  const getAddress = async () => {
    setLocationLoading(true);

    setLocation(pickedLocation);
    let addr = await Location.reverseGeocodeAsync(pickedLocation);
    const fullAddress =
      addr[0].street + ", " + addr[0].district + ", " + addr[0].city;
    setAddress(fullAddress);
    setLocationLoading(false);
    setShowMap(false);
  };

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
      quality: 0.5,
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
        quality: 0.5,
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

  const onResetHandler = () => {
    setBookName("");
    setPrice("");
    setBookDetails("");
    setBookAuthor("");
    setCategory("");
    setSelectedImages([]);
  };

  const onPostHandler = async () => {
    if (bookName === "") {
      Alert.alert("Book Name Empty!", "Please enter the name of your book", [
        {
          text: "ok",
          style: "destructive",
        },
      ]);
      return;
    } else if (price === "" || parseInt(price) === 0) {
      Alert.alert("Name Your Price!", "Please enter a valid price(in BDT)", [
        {
          text: "ok",
          style: "destructive",
        },
      ]);
      setPrice("");
      return;
    } else if (bookAuthor === "") {
      Alert.alert("Author Name Empty!", "Please enter the name of author", [
        {
          text: "ok",
          style: "destructive",
        },
      ]);
      setPrice("");
      return;
    } else if (category === "") {
      Alert.alert("Category Empty!", "Please enter a category", [
        {
          text: "ok",
          style: "destructive",
        },
      ]);
      setPrice("");
      return;
    } else if (selectedImages.length === 0) {
      Alert.alert("No Image Uploaded!", "Please upload Image of your book", [
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
    try {
      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("author", bookAuthor);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", bookDetails);
      formData.append(
        "contactInfo",
        JSON.stringify({ address: address, phone: mobile, geoCode: location })
      );
      if (selectedImages) {
        for (const image of selectedImages) {
          let filename = image.split("/").pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          formData.append("photos", { uri: image, name: filename, type });
        }
      }

      const responseData = await sendRequest(
        BACKEND_URL + "/api/posts/",
        "POST",
        formData
      );
      console.log(responseData);
      if (responseData) {
        setPosts((previousPosts) => {
          let newArray = [responseData];
          return newArray.concat(previousPosts);
        });
        alert("You have posted successfully!");
        onResetHandler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowModal(false);
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Input
          style={styles.input}
          placeholder="বইয়ের নাম"
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          maxLength={256}
          onChangeText={(text) => {
            setBookName(text);
          }}
          value={bookName}
        />
        <Input
          style={styles.input}
          placeholder="লেখকের নাম"
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          maxLength={256}
          onChangeText={(text) => {
            setBookAuthor(text);
          }}
          value={bookAuthor}
        />

        <Input
          style={styles.input}
          placeholder="মূল্য"
          keyboardType="number-pad"
          maxLength={10}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => {
            setPrice(text);
          }}
          value={price}
        />
        <TouchableOpacity
          style={styles.picker}
          onPress={() => {
            setShowCategories(true);
          }}
        >
          <Text style={styles.catText}>
            {category ? category : "ক্যাটাগরি সিলেক্ট করুন"}
          </Text>
          <AntDesign name="upcircleo" size={20} color={COLORS.lightGray4} />
        </TouchableOpacity>
        <Input
          style={styles.multilineInput}
          placeholder="বিস্তারিত লিখুন"
          multiline={true}
          numberOfLines={4}
          maxLength={1000}
          autoCapitalize="sentences"
          onChangeText={(text) => {
            setBookDetails(text);
          }}
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
            setShowMap(true);
          }}
        >
          {locationLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text style={styles.addText}>{address}</Text>
          )}
        </TouchableOpacity>
        {showMap && location && (
          <View style={styles.mapWrapper}>
            <MapView
              style={styles.map}
              initialRegion={{
                ...location,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onRegionChangeComplete={(value) => {
                setPickedLocation({
                  latitude: value.latitude,
                  longitude: value.longitude,
                });
                console.log(JSON.stringify(value));
              }}
            />
            <Ionicons
              name="ios-pin"
              size={30}
              color="black"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -15,
                marginTop: -15,
              }}
            />
            <TouchableOpacity style={styles.mapBtn} onPress={getAddress}>
              <Text style={styles.mapBtnTxt}>এই লোকেশন ব্যবহার করুন</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.upText}>{"মোবাইল নং"}</Text>
        <Input
          style={styles.input}
          placeholder="মোবাইল নং"
          keyboardType="number-pad"
          maxLength={11}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => {
            setMobile(text);
          }}
          value={mobile}
        />
        <Text style={styles.errorText}>{error}</Text>
        <FilledButton
          title={"পোস্ট"}
          onPress={onPostHandler}
          loading={isLoading}
        />

        <View paddingVertical={100} />

        <PickerModal
          showModal={showModal}
          hideModal={() => {
            setShowModal(false);
          }}
          onSelectingClick={takePicture}
          onSelectingPick={pickImage}
        />
        <CategoryModal
          showModal={showCategories}
          hideModal={() => {
            setShowCategories(false);
          }}
          setCategory={setCategory}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: SIZES.padding_fields,
  },
  mapWrapper: {
    marginTop: 10,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: 260,
  },
  mapBtn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    alignItems: "center",
  },
  mapBtnTxt: {
    ...FONTS.body3_bangla,
    color: COLORS.white,
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
    justifyContent: "center",
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
  errorText: {
    color: COLORS.links,
  },
});

export default CreatePost;

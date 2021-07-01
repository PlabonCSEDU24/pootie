import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Input from "../../components/Input";
import { COLORS, SIZES } from "../../constants";

const CreatePost = ({ navigation }) => {
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [bookDetails, setBookDetails] = useState("");

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
          placeholder="মূল্য"
          keyboardType="number-pad"
          maxLength={10}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={priceInputHandler}
          value={price}
        />
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
        <View style={styles.text}>
          <Text>Upload Images</Text>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            console.log("image uploaded");
          }}
        >
          <Text>Upload Icon</Text>
        </TouchableOpacity>

        <View style={styles.text}>
          <Text>Location</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Post" onPress={onPostHandler} />

          <Button title="Clear" color="red" onPress={onResetHandler} />
        </View>
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
});

export default CreatePost;

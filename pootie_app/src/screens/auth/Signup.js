import React, { useContext, useState } from "react";
import { BACKEND_URL } from "../../constants/config";
import { useHttpClient } from "../../uitls/http-hook";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import FilledButton from "../../components/FilledButton";
import Input from "../../components/Input";
import LogoHeader from "../../components/LogoHeader";
import { COLORS, FONTS, images, SIZES } from "../../constants";
import Context from "../../context/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation }) {
  const { login, setUser } = useContext(Context);
  //hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { isLoading, error, sendRequest } = useHttpClient();
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem("auth_token", value);
    } catch (err) {
      console.log(err);
    }
  };

  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("auth_user", jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  const sendSignupRequest = async () => {
    try {
      const responseData = await sendRequest(
        BACKEND_URL + "/api/users/signup",
        "POST",
        JSON.stringify({
          email: email,
          password: password,
          name: name,
          contact_no: contact,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (responseData) {
        setUser(responseData.user);
        storeToken(responseData.token);
        storeUser(responseData.user);
        login();
        navigation.navigate("HomeTab");
      }
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSignup = () => {
    Keyboard.dismiss();
    sendSignupRequest();
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.inner}>
          <LogoHeader />
          <Text style={styles.heading}>Sign Up</Text>
          <ScrollView
            style={styles.inputItems}
            showsVerticalScrollIndicator={false}
          >
            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder={"Email"}
              keyboardType={"email-address"}
              autoCapitalize="none"
            />
            <Input
              style={styles.input}
              placeholder={"Full Name"}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              value={contact}
              onChangeText={(text) => setContact(text)}
              style={styles.input}
              placeholder={"Contact No"}
              keyboardType={"phone-pad"}
            />

            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder={"New Password"}
              secureTextEntry
            />

            <Input
              value={confirmPass}
              onChangeText={(text) => setConfirmPass(text)}
              style={styles.input}
              placeholder={"Confirm Password"}
              secureTextEntry
            />
          </ScrollView>
          <Text style={styles.errorText}>{error}</Text>
          <FilledButton
            title={"Sign Up"}
            loading={isLoading}
            style={styles.button}
            onPress={handleSignup}
          />

          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>{"ALREADY HAVE AN ACCOUNT?"}</Text>
            <TouchableOpacity onPress={() => navigation.replace("login")}>
              <Text style={[styles.signupText, styles.signupTextLink]}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.white,
  },
  inner: {
    padding: SIZES.padding,
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  heading: {
    ...FONTS.h2,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputItems: {
    width: "100%",
    maxHeight: 360,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginTop: 40,
    marginBottom: 10,
  },
  signupTextContainer: {
    flexDirection: "row",
  },
  signupText: {
    ...FONTS.body3,
  },
  signupTextLink: {
    color: COLORS.links,
    paddingLeft: 4,
  },
  errorText: {
    color: COLORS.links,
  },
});

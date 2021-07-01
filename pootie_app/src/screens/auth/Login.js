import React, { useState, useContext } from "react";
import { BACKEND_URL } from "../../constants/config";
import Context from "../../context/Context";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useHttpClient } from "../../uitls/http-hook";
import FilledButton from "../../components/FilledButton";
import Input from "../../components/Input";
import LogoHeader from "../../components/LogoHeader";
import { COLORS, FONTS, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const { login, setUser } = useContext(Context);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const sendLoginRequest = async () => {
    try {
      const responseData = await sendRequest(
        BACKEND_URL + "/api/users/login",
        "POST",
        JSON.stringify({
          email: email,
          password: password,
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
  const handleLogin = () => {
    sendLoginRequest();
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <LogoHeader />
          <Text style={styles.heading}>Login</Text>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder={"Email"}
            keyboardType={"email-address"}
            autoCapitalize="none"
          />

          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry
          />
          <Text style={styles.errorText}>{error}</Text>
          <FilledButton
            loading={isLoading}
            title={"Login"}
            style={styles.button}
            onPress={handleLogin}
          />
          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>{"NO PREVIOUS ACCOUNT?"}</Text>
            <TouchableOpacity onPress={() => navigation.replace("signup")}>
              <Text style={[styles.signupText, styles.signupTextLink]}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop: 100,
  },
  heading: {
    ...FONTS.h2,
    paddingTop: 20,
    paddingBottom: 40,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginTop: 56,
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

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import FilledButton from "../../components/FilledButton";
import Input from "../../components/Input";
import LogoHeader from "../../components/LogoHeader";
import { COLORS, FONTS, SIZES } from "../../constants";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <LogoHeader />
          <Text style={styles.heading}>Login</Text>
          <Input
            style={styles.input}
            placeholder={"Email"}
            keyboardType={"email-address"}
          />

          <Input
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry
          />
          <FilledButton
            title={"Login"}
            style={styles.button}
            onPress={Keyboard.dismiss}
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
});

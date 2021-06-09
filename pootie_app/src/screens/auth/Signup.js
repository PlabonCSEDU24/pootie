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
import { COLORS, FONTS, images, SIZES } from "../../constants";

export default function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <LogoHeader />
          <Text style={styles.heading}>Sign Up</Text>
          <Input
            style={styles.input}
            placeholder={"Email"}
            keyboardType={"email-address"}
          />
          <Input style={styles.input} placeholder={"Full Name"} />
          <Input
            style={styles.input}
            placeholder={"Contact No"}
            keyboardType={"phone-pad"}
          />

          <Input
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry
          />

          <Input
            style={styles.input}
            placeholder={"Confirm Password"}
            secureTextEntry
          />
          <FilledButton
            title={"Sign Up"}
            style={styles.button}
            onPress={Keyboard.dismiss}
          />
          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>{"ALREADY HAVE AN ACCOUNT?"}</Text>
            <TouchableOpacity onPress={() => navigation.replace("login")}>
              <Text style={[styles.signupText, styles.signupTextLink]}>
                LOGIN
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
    paddingTop: 60,
  },
  heading: {
    ...FONTS.h2,
    paddingTop: 20,
    paddingBottom: 20,
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
    color: COLORS.primary,
    paddingLeft: 4,
  },
});

import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import Context from "../../context/Context";

const Profile = ({ navigation }) => {
  const { user } = useContext(Context);
  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.contact_no}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;

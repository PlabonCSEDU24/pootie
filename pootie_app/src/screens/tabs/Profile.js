import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>profile screen</Text>
      <Button
        title={"authenticate"}
        onPress={() => {
          navigation.navigate("Auth");
        }}
      />
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

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { COLORS } from "../../constants";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text>home screen!</Text>
      </TouchableOpacity>
      <Button title="post detail" onPress={() => navigation.navigate("post")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});
export default Home;

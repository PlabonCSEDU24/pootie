import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { COLORS } from "../../constants";
import Categories from "../../sections/Categories";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Categories />
      {/*<Button title="post detail" onPress={() => navigation.navigate("post")} />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
export default Home;

import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { COLORS } from "../../constants";
import Context from "../../context/Context";
import Categories from "../../sections/Categories";
import Posts from "../../sections/Posts";

const Home = ({ navigation }) => {
  const { posts, setPosts } = useContext(Context);
  return (
    <View style={styles.container}>
      <Categories navigation={navigation} />
      {/*<Button title="post detail" onPress={() => navigation.navigate("post")} />*/}
      <Posts posts={posts} navigation={navigation} />
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

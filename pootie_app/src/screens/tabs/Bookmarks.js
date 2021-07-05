import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { COLORS } from "../../constants";
import Posts from "../../sections/Posts";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Bookmarks = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getPosts = async () => {
    try {
      const value = await AsyncStorage.getItem("@bookmarked");
      if (value !== null) {
        setPosts(JSON.parse(value));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, [refresh]);

  const onSuccessDeletion = () => {
    setRefresh(!refresh);
  };
  return (
    <View style={styles.container}>
      {posts.length > 0 && (
        <Posts
          posts={posts}
          navigation={navigation}
          deletable
          onSuccessDeletion={onSuccessDeletion}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
export default Bookmarks;

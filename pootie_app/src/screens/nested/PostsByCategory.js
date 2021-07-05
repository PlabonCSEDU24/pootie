import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../constants/config";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import Header from "../../components/Header";
import Posts from "../../sections/Posts";
import { useHttpClient } from "../../uitls/http-hook";
const PostsByCategory = ({ route, navigation }) => {
  const { sendRequest } = useHttpClient();
  const { category } = route.params;
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const responseData = await sendRequest(
        BACKEND_URL + `/api/posts/?limit=20&category=${category}`
      );
      if (responseData) {
        setPosts(responseData);
      }
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={category} navigation={navigation} />
      <Posts posts={posts} navigation={navigation} />
    </View>
  );
};

export default PostsByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

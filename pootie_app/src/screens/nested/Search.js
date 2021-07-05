import React, { useRef, useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants/config";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import { COLORS, FONTS } from "../../constants";
import { useHttpClient } from "../../uitls/http-hook";
import Posts from "../../sections/Posts";
const Search = ({ navigation }) => {
  const { isLoading, sendRequest } = useHttpClient();
  const input = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);
  const [posts, setPosts] = useState([]);
  const onSubmit = () => {
    if (searchText.length > 0) {
      fetchPosts();
      setSearched(true);
    }
  };
  useEffect(() => {
    input.current.focus();
  }, [input]);

  const fetchPosts = async () => {
    try {
      const responseData = await sendRequest(
        BACKEND_URL +
          `/api/posts/?limit=20&bookName=${searchText}&queryType=loose`
      );
      if (responseData) {
        setPosts(responseData);
      }
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        search
        navigation={navigation}
        inputRef={input}
        onSubmit={onSubmit}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
      {posts.length > 0 && <Posts posts={posts} navigation={navigation} />}
      {!isLoading && searched && posts.length < 1 && (
        <Text style={styles.foundNoting}>Nothing Found!</Text>
      )}
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  foundNoting: {
    ...FONTS.body3_bangla,
    textAlign: "center",
    marginTop: 40,
  },
});

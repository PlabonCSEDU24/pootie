import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import PostCard from "../components/PostCard";
import { COLORS, SIZES } from "../constants";

const Posts = ({ posts, navigation }) => {
  return (
    <View style={styles.container}>
      {posts.length === 0 && (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={COLORS.primary}
        />
      )}
      {posts.length > 0 && (
        <FlatList
          data={posts}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => {
            return (
              <PostCard
                item={item}
                onPress={() => {
                  navigation.navigate("postDetail", item);
                }}
              />
            );
          }}
          keyExtractor={(item) => item._id}
          ListFooterComponent={<View style={{ margin: 100 }} />}
        />
      )}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    marginTop: 10,
  },
  loader: {
    marginTop: "50%",
  },
});

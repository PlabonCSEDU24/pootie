import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const Header = ({
  navigation,
  title,
  search,
  inputRef,
  searchText,
  setSearchText,
  onSubmit,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      {!search && <Text style={styles.title}>{title}</Text>}
      {search && (
        <View style={styles.searchContainer}>
          <TextInput
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            onSubmitEditing={onSubmit}
            ref={inputRef}
            style={styles.input}
            selectionColor={COLORS.primary}
            placeholder={"seacth here..."}
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    backgroundColor: COLORS.white,
    elevation: 5,
    alignItems: "center",
    paddingTop: 28,
    paddingHorizontal: 14,
  },
  title: {
    marginLeft: 20,
    ...FONTS.body2_bangla,
  },
  searchContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.lightGray2,
    marginHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
  },
});

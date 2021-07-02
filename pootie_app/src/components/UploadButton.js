import React from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { AntDesign } from "@expo/vector-icons";
const UploadButton = ({ onPress, uri, onDelete }) => {
  return (
    <View>
      <TouchableOpacity style={styles.uploadBtn} onPress={onPress}>
        {!uri && (
          <Feather
            name="upload"
            size={24}
            color={COLORS.lightGray4}
            resizeMode={"cover"}
          />
        )}
        {uri && <Image style={styles.image} source={{ uri: uri }} />}
      </TouchableOpacity>
      {uri && (
        <TouchableOpacity style={styles.cross} onPress={onDelete}>
          <AntDesign name="delete" size={14} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UploadButton;
const styles = StyleSheet.create({
  uploadBtn: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  cross: {
    position: "absolute",
    right: 0,
    top: -10,
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: COLORS.links,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { COLORS, DRAWABLES, FONTS } from "../constants";

import categories from "../constants/Categories";

const CategoryModal = ({ showModal, hideModal, setCategory }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.catItem}
      onPress={() => {
        setCategory(item.title);
        hideModal();
      }}
    >
      <Image source={item.logo} style={styles.catLogo} />
      <Text style={styles.catText}>{item.title} </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        hideModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.heading}>
            <TouchableOpacity onPress={hideModal} style={styles.closeBtn} />
          </View>
          <Text style={styles.headerText}>{"ক্যাটাগরি সিলেক্ট করুন"}</Text>

          <View style={styles.catList}>
            <FlatList
              data={categories}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
    height: "70%",
    width: "100%",
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopStartRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  headerText: {
    ...FONTS.body2_bangla,
    marginTop: 10,
  },
  closeBtn: {
    backgroundColor: COLORS.lightGray3,
    width: 60,
    height: 10,
    borderRadius: 20,
  },
  catItem: {
    backgroundColor: COLORS.lightGray2,
    marginBottom: 4,
    paddingVertical: 8,
    paddingLeft: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  catList: {
    height: "90%",
  },
  catText: {
    ...FONTS.body3_bangla,
  },
  catLogo: {
    height: 20,
    width: 20,
    marginRight: 30,
  },
});

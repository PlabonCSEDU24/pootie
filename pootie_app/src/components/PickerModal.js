import React, { useState, useContext, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, DRAWABLES, FONTS } from "../constants";

const PickerModal = ({
  showModal,
  hideModal,
  onSelectingPick,
  onSelectingClick,
}) => {
  return (
    <Modal
      style={{ height: "30%" }}
      animationType="slide"
      transparent={true}
      visible={showModal}
      onDismiss={hideModal}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.heading}>
            <TouchableOpacity onPress={hideModal} style={styles.closeBtn} />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.imgBtn} onPress={onSelectingPick}>
              <Text style={styles.imgBtnTxt}>{"ছবি নির্বাচন করুন"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imgBtn} onPress={onSelectingClick}>
              <Text style={styles.imgBtnTxt}>{"ছবি তুলুন"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PickerModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    height: "26%",
    width: "100%",
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopStartRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 10,
    elevation: 20,
  },

  textStyle: {
    color: COLORS.white,
    ...FONTS.body3,
  },
  modalText: {
    ...FONTS.button,
    color: COLORS.white,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  closeBtn: {
    backgroundColor: COLORS.lightGray2,
    width: 60,
    height: 10,
    borderRadius: 20,
  },
  assetContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: COLORS.prussian_deep,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    height: 10,
    width: 14,
    marginRight: 10,
  },
  imgBtn: {
    width: "80%",
    marginTop: 20,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 10,
  },
  imgBtnTxt: {
    ...FONTS.body2_bangla,
    color: COLORS.white,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});

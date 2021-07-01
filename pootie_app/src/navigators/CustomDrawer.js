import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
//Drawer
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

//Icon
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../constants";
//Link

//custom drawer content
export default (props) => {
  const Logout = () => {
    Alert.alert("Log Out", "are you sure?", [
      {
        text: "cancel",
        style: "cancel",
      },
      {
        text: "yes",
        onPress: () => {
          props.logout();
          props.navigation.navigate("Home");
        },
      },
    ]);
  };
  const { state, ...rest } = props;
  const newState = { ...state };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {1 ? (
          <View style={{ alignItems: "center", marginVertical: 20 }}></View>
        ) : (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
              >
                <AntDesign
                  name="user"
                  size={24}
                  color={focused ? COLORS.black : COLORS.lightGray4}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 18,
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                  }}
                >
                  name
                </Text>
              </View>
            </View>
          </>
        )}
        <View>
          <DrawerItemList state={newState} {...rest} />
        </View>
      </DrawerContentScrollView>

      {props.isLoggedIn && (
        <DrawerItem
          onPress={Logout}
          label={() => (
            <View style={styles.logout}>
              <AntDesign name="logout" size={24} color="black" />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logo: {
    resizeMode: "contain",
    width: "80%",
    height: 100,
  },
  logoutSection: {
    borderRadius: 5,
    marginHorizontal: 10,
    height: 50,
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: "row",
    marginHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  drawerSection: {
    marginTop: 10,
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    paddingLeft: 30,
  },
});

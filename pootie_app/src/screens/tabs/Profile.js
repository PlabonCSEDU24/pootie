import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import Context from "../../context/Context";
import FilledButton from "../../components/FilledButton";
import { TouchableOpacity } from "react-native";
import { Feather, SimpleLineIcons } from '@expo/vector-icons';



const username = "Lionel Messi"
const mailId = "leo@lm10.com"
const contact = "1234567890"

const Profile = ({ navigation }) => {
  const { user } = useContext(Context);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_BSXPlBjoBeJruSaCamv7kQuMNjoIIWX0CITXUVoapFCbRM9g" }}
          style={styles.image}
        />
        <Text style={styles.bigText}>Photo</Text>
      </View>
      <View style={styles.textMargin}>
        <View flexDirection='row'>
          <Text style={styles.bigText}>User Name: </Text>
          <Text style={styles.userText}>{username}</Text>
        </View>
        <View flexDirection='row'>
          <Text style={styles.bigText}>Mail: </Text>
          <Text style={styles.userText}>{mailId}</Text>
        </View>
        <View flexDirection='row'>
          <Text style={styles.bigText}>Contact No. :</Text>
          <Text style={styles.userText}>{contact}</Text>
        </View>
      </View >
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => { console.log("profile edited") }}
        >
          <View flexDirection='row'>
            <Feather name="edit" size={24} color="black" />
            <Text style={styles.buttonText}>Edit profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { console.log("logged out") }}
        >
          <View flexDirection='row'>
            <SimpleLineIcons name="logout" size={24} color="black" />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View >
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 60,
  },
  bigText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.lightGray,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginHorizontal: 100
  },
  textMargin: {
    marginLeft: 40,
    marginTop: 50,
    alignContent: 'flex-start'
  },
  imageContainer: {
    alignItems: 'center',

  },
  bottom: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  userText: {
    fontSize: 25,
    fontWeight: '300',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Profile;

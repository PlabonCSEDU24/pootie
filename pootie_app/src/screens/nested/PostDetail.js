import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking
} from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Header from "../../components/Header";
import { COLORS, FONTS, SIZES } from "../../constants";

const ImageSlides = [
  {
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const { width: screenWidth } = Dimensions.get('window');

const PostDetail = props => {

  const BookName = "Ekattorer Dinguli";
  const Price = 150.00;
  const BookDetails = "I bought the book 3yrs ago. But it still looks as good as new";

  const SellerName = "Ahnaf Tahmid";
  let SellerContact = "+8801309479051";

  const makeCall = () => {
    if (Platform.OS === 'android') {
      SellerContact = 'tel:$(' + SellerContact + ')';
    } else {
      SellerContact = 'telpropmpt:$(' + SellerContact + ')';
    }
    Linking.openURL(SellerContact);
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Post Details" />
      <View>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={ImageSlides}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>{BookName}</Text>
        <Text style={styles.text}>Price:
          <Text style={{ fontWeight: 'normal' }}> {Price} BDT</Text>
        </Text>
        <Text style={styles.text}>Details:
          <Text style={{ fontWeight: 'normal' }}> {BookDetails}</Text>
        </Text>
      </View>
      <View style={styles.bottomScreen}>
        <TouchableOpacity
          onPress={makeCall}
          activeOpacity={0.5}
          style={styles.makeContact}
        >
          <Text style={styles.contactText}>Contact Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { console.log("Post Saved!") }}
          activeOpacity={0.5}
          style={styles.savePost}
        >
          <Text style={styles.contactText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 150,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({
      ios: 0,
      android: 0
    }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  text: {
    marginLeft: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  textView: {
    marginTop: 25,
  },
  makeContact: {
    maxWidth: '70%',
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',

  },
  contactText: {
    fontSize: 20,
    color: COLORS.white,
  },
  bottomScreen: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 30,
    marginTop: 10,
  },
  savePost: {
    maxWidth: '20%',
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default PostDetail;

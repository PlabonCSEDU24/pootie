import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking,
  FlatList,
  TextInput
} from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Header from "../../components/Header";
import { COLORS, FONTS } from "../../constants";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

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

const Comments = [
  {
    id: '1',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '2',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '3',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '4',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '5',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '6',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '7',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '8',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '9',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '10',
    username: 'Yo',
    comment: 'I want it'
  },
];
const PostDetail = props => {

  const [commentID, setCommentID] = useState(null);

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

  const renderCommentItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Post Details" />
      <View height="18%">
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={ImageSlides}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </View>
      <View style={styles.margin}>
        <Text style={styles.text} numberOfLines={1}>{BookName}</Text>
        <Text style={styles.text}>Price:
          <Text style={{ fontWeight: 'normal' }}> {Price} BDT</Text>
        </Text>
        <Text style={styles.text} numberOfLines={3}>Details:
          <Text style={{ fontWeight: 'normal' }}> {BookDetails}</Text>
        </Text>
      </View>

      <View height='30%'>
        <Text style={styles.textComment} >Comments</Text>
        {/*<FlatList
          data={Comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />*/}
      </View>
      <View style={styles.commentContainer}>
        <TextInput placeholder="add a comment"></TextInput>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => { console.log("comment posted") }}
        >
          <MaterialCommunityIcons name="send-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomScreen}>
        <TouchableOpacity
          onPress={makeCall}
          activeOpacity={0.8}
          style={styles.makeContact}
        >
          <Text style={styles.buttonText}>Contact Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { console.log("Post Saved!") }}
          activeOpacity={0.2}
        >
          <Feather name="bookmark" size={40} color="cadetblue" />
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
    fontSize: 18,
    fontWeight: "bold",
  },
  margin: {
    marginTop: 5,
    marginLeft: 30,
    marginRight: 10,
    height: '15%',
  },
  makeContact: {
    maxWidth: '70%',
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    fontSize: 20,
    color: COLORS.white,
  },
  bottomScreen: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 30,
    marginTop: 10,
  },
  textComment: {
    marginTop: 5,
    marginLeft: 30,
    fontSize: 18,
    fontWeight: "bold",
  },
  commentContainer: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  }
});

export default PostDetail;

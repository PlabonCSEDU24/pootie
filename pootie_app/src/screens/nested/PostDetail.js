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
} from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Header from "../../components/Header";
import { COLORS } from "../../constants";
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Input from "../../components/Input";
import { TextInput } from "react-native-gesture-handler";

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
    comment: 'Nice book,fngfkdghndghfdghbdfikgfdiughdiughdiughdigduidikgdi'
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
  {
    id: '11',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '12',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '13',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '14',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '15',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '16',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '17',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '18',
    username: 'Plabon',
    comment: 'Nice book'
  },
  {
    id: '19',
    username: 'Yo',
    comment: 'I want it'
  },
  {
    id: '20',
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

  const renderComment = ({ item }) => (
    <View
      style={styles.commentList}
      key={item.id}>
      <FontAwesome5 name="user-circle" size={24} color='black' />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.commentUser} >{item.username}</Text>
        <Text style={{ marginRight: 20 }}>{item.comment}</Text>
      </View>
    </View>
  );


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

      <View style={styles.margin} height='30%'>
        <Text style={styles.textComment} >Comments</Text>
        <FlatList
          data={Comments}
          renderItem={renderComment}
        />
      </View>
      <View style={styles.commentContainer}>
        <TextInput placeholder="add a comment">
        </TextInput>
        <TouchableOpacity
          TouchableOpacity={0.6}
          onPress={() => { console.log("posted") }}
        >
          <MaterialCommunityIcons name="send" size={24} color="black" />
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
    marginTop: 5,
  },
  textComment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  commentContainer: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 10,
    marginTop: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  commentUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentList: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  }
});

export default PostDetail;

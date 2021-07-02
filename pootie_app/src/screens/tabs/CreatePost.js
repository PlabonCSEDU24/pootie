import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Header from '../../components/Header';
import { COLORS } from "../../constants";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Input from '../../components/Input';

const CreatePost = ({ navigation }) => {
    const [bookName, setBookName] = useState('');
    const [price, setPrice] = useState('');
    const [bookDetails, setBookDetails] = useState('');

    const bookNameInputHandler = inputBookName => {
        setBookName(inputBookName);
    };

    const priceInputHandler = inputPrice => {
        setPrice(inputPrice.replace(/[^0-9]/g, ''));
    };

    const bookDetailsInputaHandler = inputDetails => {
        setBookDetails(inputDetails);
    };

    const onResetHandler = () => {
        setBookName('');
        setPrice('');
        setBookDetails('');
    };

    const onPostHandler = () => {
        if (bookName === '') {
            Alert.alert('Book name empty!', 'Please enter the name of your book',
                [{
                    text: 'ok',
                    style: 'destructive'
                }]);
            return;
        } else if (price === '' || parseInt(price) === 0) {
            Alert.alert('Name your price!', 'Please enter a valid price(in BDT)',
                [{
                    text: 'ok',
                    style: 'destructive'
                }]);
            setPrice('');
            return;
        } else if (bookDetails === '') {
            Alert.alert('', 'Please write a few things about the book',
                [{
                    text: 'ok',
                    style: 'destructive'
                }]);
            return;
        }

        console.log("Book Name: " + bookName);
        console.log("Price: " + parseInt(price));
        console.log("Details about the book: " + bookDetails);
        onResetHandler();
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.container}>
                <Header title="Create New Post" />

                <Input
                    style={styles.input}
                    placeholder="Bookname"
                    autoCapitalize='words'
                    autoCorrect={false}
                    keyboardType='default'
                    maxLength={256}
                    onChangeText={bookNameInputHandler}
                    value={bookName}
                />

                <Input
                    style={styles.input}
                    placeholder="Price(in BDT)"
                    keyboardType='number-pad'
                    maxLength={10}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={priceInputHandler}
                    value={price}
                />

                <Input style={styles.multilineInput}
                    placeholder="Details"
                    multiline={true}
                    numberOfLines={4}
                    maxLength={1000}
                    autoCapitalize='sentences'
                    onChangeText={bookDetailsInputaHandler}
                    value={bookDetails}
                />
                <View style={styles.text}>
                    <Text>Upload Images</Text>
                </View>
                <TouchableOpacity style={styles.icon}
                    onPress={() => { console.log("image uploaded") }}
                >
                    <AntDesign
                        name="upload"
                        size={36}
                        color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => { console.log("Location Pinned") }}>
                    <View
                        flexDirection='row'
                        marginTop={20}
                    >
                        <MaterialIcons
                            name="location-pin"
                            size={24}
                            color="black" />
                        <Text style={styles.locationText}>Current Location</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.postButton}
                        onPress={onPostHandler}
                        TouchableOpacity={0.8}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={onResetHandler}
                        TouchableOpacity={0.8}>
                        <Text style={styles.buttonText}>Clear</Text>

                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback >
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 25,
    },
    input: {
        backgroundColor: COLORS.lightGray2,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        maxWidth: '90%',
        marginLeft: 10,
        marginTop: 5,
    },
    multilineInput: {
        backgroundColor: COLORS.lightGray2,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 2,
        height: 80,
        maxWidth: '90%',
        textAlignVertical: 'top',
        marginLeft: 10,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        alignItems: 'flex-end',
    },
    icon: {
        margin: 10,
    },
    postButton: {
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        width: '20%',
        padding: 5,
    },
    clearButton: {
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'orangered',
        width: '20%',
        padding: 5,
    },
    buttonText: {
        fontSize: 20,
        color: COLORS.white,
    },
    locationText: {
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default CreatePost;
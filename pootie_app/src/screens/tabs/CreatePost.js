import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Header from '../../components/Header';
import { COLORS } from "../../constants";

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
                <Header title="Create A Post" />
                <View style={styles.text}>
                    <Text>Book Name</Text>
                </View>
                <TextInput
                    style={styles.input}
                    autoCapitalize='words'
                    autoCorrect={false}
                    keyboardType='default'
                    maxLength={256}
                    onChangeText={bookNameInputHandler}
                    value={bookName}
                />

                <View style={styles.text}>
                    <Text>Price(in BDT)</Text>
                </View>

                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    maxLength={10}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={priceInputHandler}
                    value={price}
                />

                <View style={styles.text}>
                    <Text>Details</Text>
                </View>
                <TextInput style={styles.multilineInput}
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
                    <Text>Upload Icon</Text>
                </TouchableOpacity>

                <View style={styles.text}>
                    <Text>Location</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Post"
                        onPress={onPostHandler}
                    />

                    <Button
                        title="Clear"
                        color='red'
                        onPress={onResetHandler}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>
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
        margin: 10,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        maxWidth: '80%',
        margin: 10,
    },
    multilineInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 2,
        height: 80,
        maxWidth: '80%',
        textAlignVertical: 'top',
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        alignItems: 'flex-end',
    }
});

export default CreatePost;
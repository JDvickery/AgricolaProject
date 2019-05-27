import React, { Component } from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import Database from '../Database';
import {Header} from "react-navigation";

const headerBackground = (
    <Image
        style={{overflow:'hidden',resizeMode:'center',height:Header.HEIGHT,position:'absolute'}}
        blurRadius={10}
        source={require('../assets/images/header-image.jpg')}
    />
);

export default class ScoreScreen extends Component {

    constructor(){
        super();
    }

    static navigationOptions = {
        title: 'Score',
        headerTitleStyle: {color:'#000000'},
        headerBackTitleStyle: {color:'#000000'},
        headerBackImage: (
            <Image
                source={require('../assets/images/back-icon-black.png')}
                style={{marginLeft: 10,marginRight:5,height: 21,width: 12}}
            />
        ),
    };

    render() {
        return(
            <ScrollView>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    infoText: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 30,
        color: '#316D78',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    textInput: {
        height: 40,
        flex: 0.5,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
        padding: 3,
    },
    gravatarSelect: {
        flex: 0.5,
    }
});
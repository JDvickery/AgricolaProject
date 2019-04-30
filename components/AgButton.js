/*Custom Button*/
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

import {
    LinearGradient
} from "expo";

const AgButton = props => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.customClick}>
            <LinearGradient colors={['#8a8c4f', '#c2bc66', '#d7d17d', '#c2bc66', '#8a8c4f']} style={styles.gradient}>
            <Text style={styles.buttonText}>{props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        marginRight:0,
        marginLeft:0,
        marginTop:10,
        backgroundColor: '#c9884c',
        borderRadius:10,
        borderWidth: 2,
        borderColor: '#b06c14'
    },
    buttonText: {
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight: 'bold'
    },
    gradient: {
        paddingTop:15,
        paddingBottom:15,
        paddingRight:12,
        paddingLeft:12,
        borderRadius:10,
        borderWidth: 2,
        borderColor: '#b06c14'
    },
});
export default AgButton;
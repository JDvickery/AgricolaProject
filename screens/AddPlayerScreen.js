import React, { Component } from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import AgTextInput from '../components/AgTextInput';
import Database from '../Database';

export default class AddPlayerScreen extends Component {

    constructor(){
        super();
    }

    static navigationOptions = {
        title: 'Add Player',
    };

    render() {
        let rows = Database.getPlayers();
        var availablePlayers;
        if( typeof rows !== 'undefined'){
            availablePlayers = rows.map( (player) => {
                <Text>{player[1] + ' ' + player[2]}</Text>
            });
        }else{
            availablePlayers = <Text>Add a New Player</Text>;
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    {availablePlayers}
                </View>
                <View style={styles.wrapper}>
                    <AgTextInput placeholder={"First Name"} value={""}></AgTextInput>
                    <AgTextInput placeholder={"Last Name"} value={""}></AgTextInput>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 15,
        alignSelf: 'stretch',
    },
    wrapper: {
        flex: 1,
        alignSelf: 'stretch',
    },
    picker: {
        flex: 1,
        height: 80,
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    addPlayerButton: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    addPlayerButtonText: {
        fontSize: 75
    }
});
import React, { Component } from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import Database from '../Database';

export default class AddPlayerScreen extends Component {

    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            gravatar: 0,
        }
    }

    static navigationOptions = {
        title: 'Add Player',
        headerBackTitleStyle: {color:'#c9884c'},
        headerBackImage: (
            <Image
                source={require('../assets/images/back-icon.svg')}
                style={{marginLeft: 10,marginRight:5,height: 21,width: 12,}}
            />
        ),
    };

    render() {
        let rows = Database.getPlayers();
        return (
            <ScrollView>
                <Text style={styles.infoText}>Enter player's first and last name and gravitar choice. Click "Add Player" when ready.</Text>
                <View contentContainerStyle={styles.container} style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({firstName: text})}
                        value={this.state.firstName}
                        autoCapitalize={'words'}
                        placeholder={'First Name'}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({lastName: text})}
                        value={this.state.lastName}
                        autoCapitalize={'words'}
                        placeholder={'Last Name'}
                    />
                </View>
                <View contentContainerStyle={styles.container} style={styles.container}>
                    <TouchableOpacity
                        style={styles.gravatarSelect}
                        onPress={() => this.setState({gravatar:0})}
                    >

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.gravatarSelect}
                        onPress={() => this.setState({gravatar:1})}
                    >

                    </TouchableOpacity>
                </View>
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
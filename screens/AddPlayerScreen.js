import React, { Component } from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity, Text, TextInput, Image, Dimensions} from 'react-native';
import AgButton from '../components/AgButton';
import Database from '../Database';
import {Header} from "react-navigation";

const headerBackground = (
    <Image
        style={{overflow:'hidden',resizeMode:'center',height:Header.HEIGHT,position:'absolute'}}
        blurRadius={10}
        source={require('../assets/images/header-image.jpg')}
    />
);

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
        let txResults = Database.getPlayers();
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
                        <Image
                            source={require('../assets/images/family_m.png')}
                            style={[styles.gravatarImage,this.isSelected(0)]}
                            resizeMode={'center'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.gravatarSelect}
                        onPress={() => this.setState({gravatar:1})}
                    >
                        <Image
                            source={require('../assets/images/family_f.png')}
                            style={[styles.gravatarImage,this.isSelected(1)]}
                            resizeMode={'center'}
                        />
                    </TouchableOpacity>
                </View>
                <View contentContainerStyle={styles.container} style={styles.container}>
                    <AgButton title={"Add Player"} customClick={() => {
                        if(this.state.firstName === '' || this.state.lastName === ''){
                            alert("Enter First and Last name.");
                        }else{
                            Database.addPlayer(this.state.firstName,this.state.lastName,this.state.gravatar);
                        }
                    }}/>
                </View>
            </ScrollView>
        );
    }

    isSelected = function (options) {
        if(options===this.state.gravatar){
            return{
                opacity: 1
            }
        }else{
            return{
                opacity: 0.5
            }
        }
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
        padding: 15,
        marginTop: 15,
        marginBottom: 15,
        flex: 0.45,
        justifyContent: 'center',
        textAlign: 'center',
    },
    gravatarImage: {
        width: windowWidth * 0.35,
        height: windowWidth * 0.35,
    }
});
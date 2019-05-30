import React, { Component } from 'react';
import {Platform, ScrollView, StyleSheet, View, TouchableOpacity, Text, CheckBox, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Database from '../Database';
import { Header } from 'react-navigation';

const headerBackground = (
    <Image
        style={{overflow:'hidden',resizeMode:'center',height:Header.HEIGHT,position:'absolute'}}
        blurRadius={10}
        source={require('../assets/images/header-image.jpg')}
    />
);

export default class GameScreen extends Component {

  constructor(){
    super();
    this.state = {
        selectedPlayers: []
    };
  }

  static navigationOptions = ({navigation}) => {
      return {
          headerTitleStyle: {color:'#000000'},
          title: 'Game',
          headerRight: (
              <TouchableOpacity style={styles.addPlayerButton} onPress={() => navigation.navigate('AddPlayer')}>
                  <Icon
                      reverse
                      name={Platform.OS === "ios" ? "ios-person-add" : "md-person-add"}
                      color={"#c9884c"}
                      type={"ionicon"}
                      size={35}
                      style={{color:'#000000'}}
                  />
              </TouchableOpacity>
          )
      }
  };

  render() {
      let txResults = Database.getPlayers();
      var availablePlayers;
      if( typeof txResults.rows !== 'undefined'){
          availablePlayers = txResults.rows.map( (player) => {
              <CheckBox
                  title={player[1] + ' ' + player[2]}
                  iconType='material'
                  checkedIcon='clear'
                  uncheckedIcon='add'
                  checkedColor='red'
                  checked={this.state.checked}
              />
          });
      }else{
          availablePlayers = <Text style={styles.playerAlertText}>There are no players, you must add at least one player.</Text>;
      }
    return (
      <ScrollView style={{backgroundColor:'white'}}>
          <View contentContainerStyle={styles.container}>
              {availablePlayers}
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    addPlayerButton: {
      marginRight: 15,
      width: 35,
      height: 35,
    },
  container: {
        backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
  },
    playerAlertText: {
      textAlign: 'center',
        marginTop: 15,
        color: '#8B6C12'
    },
});

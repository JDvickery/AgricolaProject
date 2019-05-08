import React, { Component } from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity, Text, Picker} from 'react-native';
import Database from '../Database';

export default class GameScreen extends Component {

  constructor(){
    super();
    this.state = {
        selectedPlayers: []
    };
  }

  static navigationOptions = {
    title: 'Game',
  };

  render() {
      let rows = Database.getPlayers();
      if( typeof rows !== 'undefined'){
          for(let c; c < rows.length; c++){
              console.log(rows[c]);
          }
      }else{
          rows = 'Add a New Player';
      }
      let availablePlayers = rows.map( (p, i) => {

      });
    return (
      <ScrollView style={styles.container}>
          <View style={styles.wrapper}>
              <Picker
                  selectedValue={this.state.selectedPlayers}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({selectedPlayers: itemValue})}>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
              </Picker>
              <TouchableOpacity style={styles.addPlayerButton} onPress={this.addNewPlayer()}>
                  <Text style={styles.addPlayerButtonText}>+</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
    );
  }

  addNewPlayer(){
    alert("add things here...");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  wrapper: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
    addPlayerButton: {
        width: 80,
        height: 80,
    },
    addPlayerButtonText: {
        fontSize: 75
    }
});

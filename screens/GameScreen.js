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
      var availablePlayers;
      if( typeof rows !== 'undefined'){
          availablePlayers = rows.map( (player) => {
              <Picker.Item label={player[1] + ' ' + player[2]} value={player[0]}/>
          });
      }else{
          availablePlayers = <Picker.Item label={"Add a New Player"} value={"Add a New Player"}/>;
      }
    return (
      <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.wrapper}>
              <Picker
                  selectedValue={this.state.selectedPlayers}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => this.setState({selectedPlayers: [...this.state.selectedPlayers, itemValue]})}>
                  {availablePlayers}
              </Picker>
          </View>
          <View style={styles.wrapper}>
              <TouchableOpacity style={styles.addPlayerButton} onPress={() => this.props.navigation.navigate('AddPlayerScreen')}>
                  <Text style={styles.addPlayerButtonText}>+</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
        paddingTop: 15,
      alignSelf: 'stretch',
      alignItems: 'flex-start'
  },
  wrapper: {

  },
    picker: {
        height: 80,
        width: 300,
    },
    addPlayerButton: {
        width: 75,
    },
    addPlayerButtonText: {
        fontSize: 75
    }
});

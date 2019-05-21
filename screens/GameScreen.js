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
      <ScrollView style={styles.container}>
          <View style={styles.wrapper}>
              <Picker
                  selectedValue={this.state.selectedPlayers}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => this.setState({selectedPlayers: [...this.state.selectedPlayers, itemValue]})}>
                  {availablePlayers}
              </Picker>
          </View>
          <View style={styles.wrapper}>
              <TouchableOpacity style={styles.addPlayerButton} onPress={() => this.props.navigation.navigate('AddPlayer')}>
                  <Text style={styles.addPlayerButtonText}>+</Text>
              </TouchableOpacity>
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

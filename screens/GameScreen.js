import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, AppState} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';

export default class GameScreen extends Component {

  constructor(){
    super();
    this.state = {
      selectedItems: []
    }
  }

  static navigationOptions = {
    title: 'Game',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
        </View>
      </ScrollView>
    );
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
  }
});

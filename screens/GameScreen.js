import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import AgButton from "../components/AgButton";

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Game',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <AgButton title={"Add Player"} customClick={() => alert('Add a new player...')}/>
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

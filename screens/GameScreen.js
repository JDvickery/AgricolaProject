import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import AgButton from "../components/AgButton";
import AgPicker from "../components/AgPicker";

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Game',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <AgPicker defaultValue={"Select or add user"} customChange={()=>alert("Add new user here...")}/>
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

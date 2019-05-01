import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class RecordsScreen extends React.Component {
  static navigationOptions = {
    title: 'Game Records',
  };

  render() {
    return (
        <ScrollView style={styles.container}>

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
});

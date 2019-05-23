import React, {Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, AppState} from 'react-native';
import { AppLoading, Asset, Font, Icon, SQLite } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Database from './Database';

interface State{
  isLoadingComplete: boolean,
}

export default class App extends Component<{}, State> {

  constructor(props: any){
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  componentDidMount(){
    Database.createTables();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/header-image.jpg'),
        require('./assets/images/back-icon.png'),
        require('./assets/images/home-screen.jpg'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

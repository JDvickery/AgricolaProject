import React, {Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, AppState} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Database from './components/Database';

interface State{
  isLoadingComplete: boolean,
  appState: string,
  dataBaseIsReady: boolean,
}

const database = new Database;

export default class App extends Component<{}, State> {

  constructor(props: any){
    super(props);
    this.state = {
      isLoadingComplete: false,
      appState: AppState.currentState,
      databaseIsReady: false,
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount(){
    this.appIsNowRunningInForeground();
    this.setState({
      appState: "active"
    });
    AppState.addEventListener('change',this.handleAppStateChange);
  }

  componentWillUnmount(){
    AppState.removeEventListener('change',this,this.handleAppStateChange);
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
      console.log(database);
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  handleAppStateChange(nextAppState: string){
    if( this.state.appState.match(/inactive|background/) && nextAppState === 'active' ){
      this.appIsNowRunningInForeground();
    }else if( this.state.appState === 'active' && nextAppState.match(/inactive|background/) ){
      this.appHasGoneToBackground();
    }
    this.setState({appState: nextAppState});
  }

  appIsNowRunningInForeground(){
    database.open();
    this.setState({dataBaseIsReady: true});
  }

  appHasGoneToBackground(){
    database.close();
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
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

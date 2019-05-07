import React, {Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, AppState} from 'react-native';
import { AppLoading, Asset, Font, Icon, SQLite } from 'expo';
import AppNavigator from './navigation/AppNavigator';

interface State{
  isLoadingComplete: boolean,
}

const db = SQLite.openDatabase('Agricola.db', );

export default class App extends Component<{}, State> {

  constructor(props: any){
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  componentDidMount(){
    this.createTables();
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

  /*
  CURDS
   */

  createTables(){
    db.transaction( tx => {
          tx.executeSql(
              "CREATE TABLE IF NOT EXISTS Games( " +
              "gameID INTEGER PRIMARY KEY NOT NULL, " +
              "Date TEXT, " +
              "Location TEXT" +
              ");"
          );
        }
    );

    db.transaction( tx => {
          tx.executeSql(
              "CREATE TABLE IF NOT EXISTS Players( " +
              "playerID INTEGER PRIMARY KEY NOT NULL, " +
              "FirstName TEXT, " +
              "LastName TEXT, " +
              "Gravitar BIT DEFAULT 0" +
              ");"
          );
        }
    );

    db.transaction( tx => {
          tx.executeSql(
              "CREATE TABLE IF NOT EXISTS Scores( " +
              "scoreID INTEGER PRIMARY KEY NOT NULL, " +
              "gameID INTEGER, " +
              "playerID INTEGER, " +
              "score INTEGER, " +
              "FOREIGN KEY ( gameID ) REFERENCES Games ( gameID ), " +
              "FOREIGN KEY ( playerID ) REFERENCES Players ( playerID )" +
              ");"
          );
        }
    );
  }

  addPlayer(_firstName:string, _lastName:string, _gravitar:number){
    var rows;
    db.transaction( tx=> {
        tx.executeSql(
            "SELECT * FROM Players " +
            "WHERE FirstName = ? " +
            "AND LastName = ?;",
            [ _firstName, _lastName ],
            (_, {_rows}) => { rows = _rows; }
        );
      },
      null,
        tx => {
        if (rows.length === 0) {
          tx.executeSql(
              "INSERT INTO Players (FirstName, LastName, Gravitar) " +
              "VALUES (?, ?, ?)",
              [_firstName, _lastName, _gravitar]
          )
        }
      }
    )
  }

  getPlayer(){
    var rows;
    db.transaction( tx=> {
      tx.executeSql(
          "SELECT * FROM Players",
          (_, {_rows}) => { rows = _rows; }
        );
      },
        null,
        () => { return rows; }
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

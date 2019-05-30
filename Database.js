'use strict';
import React from 'react';
import { SQLite } from 'expo';

var databaseName = 'Agricola.db';
var databaseVersion = '1.0';
var databaseDisplayName = 'db';

const db = SQLite.openDatabase( databaseName, databaseVersion, databaseDisplayName );

class Database {
    getDatabase(){
        return db;
    }

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
                    ");",
                    [],
                    () => {console.log("Queuing the creation of the Games table...");}
                );
            },
            null,
            () => {console.log("Games Table Creates");}
        );

        db.transaction( tx => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS Players( " +
                    "playerID INTEGER PRIMARY KEY NOT NULL, " +
                    "FirstName TEXT, " +
                    "LastName TEXT, " +
                    "Gravitar BIT" +
                    ");",
                    [],
                    () => {console.log("Queuing the creation of the Players table...");}
                );
            },
            null,
            () => {console.log("Players Table Creates");}
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
                    ");",
                    [],
                    () => {console.log("Queuing the creation of the Scores table...");}
                );
            },
            null,
            () => {console.log("Scores Table Creates");}
        );
    }

    addPlayer(_firstName:string, _lastName:string, _gravitar:number){
        var txResults;
        db.transaction( tx=> {
                tx.executeSql(
                    "INSERT INTO Players (FirstName, LastName, Gravitar) " +
                    "VALUES (?, ?, ?)",
                    [ _firstName, _lastName, _gravitar ],
                    ( tx, results ) => { console.log("Queuing the insertion of new player..."); }
                );
            },
            null,
            () => { console.log("Added Player"); }
        )
    }

    getPlayers(){
        var txResults;
        db.transaction( tx=> {
                tx.executeSql(
                    "SELECT * FROM Players",
                    [],
                    ( tx, results ) => { txResults = results; console.log("Queuing the selecting of all player data..."); }
                );
            },
            null,
            () => { console.log("Retrieved player data"); return txResults; }
        );
    }
}
module.exports = new Database();
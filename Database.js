'use strict';
import React from 'react';
import { SQLite } from 'expo';

var databaseName = 'Agricola.db';
var databaseVersion = '1.0';
var databaseDisplayName = 'db';

let db = SQLite.openDatabase( databaseName, databaseVersion, databaseDisplayName );

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
                if ( typeof rows === 'undefined' ) {
                    tx.executeSql(
                        "INSERT INTO Players (FirstName, LastName, Gravitar) " +
                        "VALUES (?, ?, ?)",
                        [_firstName, _lastName, _gravitar]
                    )
                }
            }
        )
    }

    getPlayers(){
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
module.exports = new Database();
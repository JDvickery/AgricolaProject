import {SQLite} from 'expo';

class Database{
    databaseName = 'Agricola.db';
    db = undefined;

    open(){
        this.db = SQLite.openDatabase(this.databaseName);
    }

    close(){
        this.db.close();
        this.db = undefined;
    }

    createTables(){
        if( typeof this.db !== 'undefined' ){
            this.db.transaction.executeSql(
                "CREATE TABLE IF NOT EXISTS Games( " +
                "gameID INTEGER PRIMARY KEY NOT NULL, " +
                "Date TEXT, " +
                "Location TEXT" +
                ");"
            );

            this.db.transaction.executeSql(
                "CREATE TABLE IF NOT EXISTS Players( " +
                "playerID INTEGER PRIMARY KEY NOT NULL, " +
                "FirstName TEXT, " +
                "LastName TEXT, " +
                "Gravitar BIT DEFAULT 0" +
                ");"
            );

            this.db.transaction.executeSql(
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
    }

    //curd
}
export default Database;
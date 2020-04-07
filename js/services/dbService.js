import React from 'react';
import SQLite from "react-native-sqlite-storage";
import { availableEvents } from '../metaData/eventData.js';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
let db;

async function openDb(success, failure) {
  return SQLite.openDatabase(
    'eventtracker.db',
    '1.0',
    'Event Tracker',
    200000
  );
}

export async function initDB(username) {
  return new Promise((resolve, reject) => {
    if (db) {
      db.transaction((txn) => {
        txn.executeSql(`SELECT * FROM TrackedEvents WHERE userName = "${username}"`, [], (tx, res) => {
          var len = res.rows.length;
          const allResult = []
          for (let i = 0; i < len; i++) {
            allResult.push(res.rows.item(i));
          }
          console.log('allResult = ', allResult);
          resolve(allResult);
        })
      })
    } else {
      openDb().then(async (database) => {
        db = database;
        database.transaction((txn) => {
          //txn.executeSql('DROP TABLE IF EXISTS TrackedEvents');
          txn.executeSql('CREATE TABLE IF NOT EXISTS TrackedEvents (userName VARCHAR(50) PRIMARY KEY, eventInfo VARCHAR(50))').catch((e) => {
            console.log('error while creating table');
          });
          txn.executeSql(`SELECT * FROM TrackedEvents WHERE userName = "${username}"`, [], (tx, res) => {
            var len = res.rows.length;
            const allResult = []
            for (let i = 0; i < len; i++) {
              allResult.push(res.rows.item(i));
            }
            console.log('allResult = ', allResult);
            resolve(allResult);
          })
        })
      });
    }
  });
};

export async function writeTrackedEvents(username, trackedEvents = []) {
  const toWrite = trackedEvents.join(',');
  //await openDb().then((database) => {
    await db.transaction((txn) => {
      txn.executeSql(`INSERT OR REPLACE INTO TrackedEvents (userName, eventInfo) VALUES("${username}", "${toWrite}")`).then(() => {
        console.log('Insert completed');
        //database.close();
      })
    }).then(() => {
      //database.close();
    })
  //})
};

export async function getTrackedEvents() {
  await openDb().then((database) => {
    database.transaction((txn) => {
      txn.executeSql('SELECT * FROM TrackedEvents', [], (tx, res) => {
        const rows = results.rows;
        const allItems = rows.map((item) => item);
        console.log('allItems = ', allItems);
        Promise.resolve(allItems);
      });
    });
  });
}

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

var busNumber = 0;
var busDirection = '';
var dataBase = [2, 'inbound','12 minutes away', ''];

app.intent('bus number', (conv, {number}) => {
    busNumber = number;
    conv.ask('Inbound or Outbound');
});

app.intent('bus direction', (conv, {direction}) => {
  //busDirection = direction;
  //var distance = dataBaseReader(dataBase, busNumber, busDirection);
  conv.close('The number ' + busNumber + ' bus is ' + Math.floor(Math.random() * Math.floor(30)) + ' minutes away');
});

function dataBaseReader (dataBase, number, direction) {
  if (dataBase[0] == number && dataBase[1] == 'incoming') {
    return dataBase[2];
  }
  return;
}

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
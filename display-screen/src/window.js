const path = require('path');
const request = require("request");
const express = require('express');
const fs = require('fs')
const expressApp = express();
const port = 8080;

const { BrowserWindow, app } = require('electron');

let mainWindow = null;

let readSystemFile = (fileName) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    return data;
  })
}

function main() {
  var mainWindow = new BrowserWindow({
    center: true,
    fullscreen: true, // uncomment for production
    alwaysOnTop: true, // uncomment for production
    title: 'Screen Cast',
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(`http://localhost:8080/`);
  mainWindow.on('close', event => {
    mainWindow = null;
  })

  expressApp.get('/', function (req, res) {
    let requestQuery = req.query.q;

    // display modes
    console.log(requestQuery);
    if (requestQuery == "load://watermark") {
      mainWindow.loadFile(path.join(__dirname + '/static/index.html'));
    } else if (requestQuery == "load://ambiant") {
      mainWindow.loadFile(path.join(__dirname + '/static/ambiant.html'));
    } else {

      // default http requests
      if (req.query.q != null && req.query.q != "") {
        // load to a website
        mainWindow.loadURL(req.query.q);
      } else {
        // load homepage
        res.sendFile(path.join(__dirname + '/static/index.html'));
      }

    }

    // send response so http request gets resolved
    res.sendFile(path.join(__dirname + '/static/index.html'));
  });
}

app.on('ready', main);
expressApp.listen(port, () => console.log(`JARVIS display screen listening at http://localhost:${port}`))

"use strict";

var path = require('path');

var request = require("request");

var express = require('express');

var fs = require('fs');

var expressApp = express();
var port = 8080;

var _require = require('electron'),
    BrowserWindow = _require.BrowserWindow,
    app = _require.app;

var mainWindow = null;

var readSystemFile = function readSystemFile(fileName) {
  fs.readFile(fileName, 'utf8', function (err, data) {
    return data;
  });
};

function main() {
  var mainWindow = new BrowserWindow({
    center: true,
    fullscreen: true,
    // uncomment for production
    alwaysOnTop: true,
    // uncomment for production
    title: 'Screen Cast'
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL("http://localhost:8080/");
  mainWindow.on('close', function (event) {
    mainWindow = null;
  });
  expressApp.get('/', function (req, res) {
    var requestQuery = req.query.q; // display modes

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
    } // send response so http request gets resolved


    res.sendFile(path.join(__dirname + '/static/index.html'));
  });
}

app.on('ready', main);
expressApp.listen(port, function () {
  return console.log("JARVIS display screen listening at http://localhost:".concat(port));
});
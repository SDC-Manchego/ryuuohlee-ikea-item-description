// server that connects client and database

//requirements
const express = require('express');
const bodyParser = require('body-parser');
var db = require('../database/connect.js');
const controller = require('./controller.js');
const path = require('path');

var app = express();
var port = 9000; //lol if you get this we are buds

//Middleware
app.use(bodyParser.json());
app.use(express.static('client/dist'));

//why was this needed when i didn't require something like this for cow list?
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/'), {});
});

app.get('/api/products', (req, res) => {
  controller.ikea_products.get(req, res, (err, data) => {
    if (err) {
      return console.log('error connecting to server');
    }
    console.log('ikea_products connected');
    //console.log(data);

    res.send(data).status(200);
  });
});

//check if app is listening
app.listen(port, () => {console.log(`listening on ${port}`)});
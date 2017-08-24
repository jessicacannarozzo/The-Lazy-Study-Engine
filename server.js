var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser')
var file = './notes.json'
var pg = require("pg");
var path = require("path");


var file;
var usedValues;
var index;

app.use(express.static("./public"));
// app.set('view engine', 'pug');
// app.set('views', __dirname + '/public');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));



app.listen(3000, function () {
    console.log('Listening on port 3000...');
    usedValues = []; //init
    index = 0;
});

jsonfile.readFile(file, function(err, obj) { //get file
    file = obj;
    // if (!err) console.log("FILE: " + JSON.stringify(file));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/homepage.html'));
})

//get possible answers to populate dropdown
app.get("/dropdown", function(req, res) {
  var dropdown = [];

  for (var i in file[index].answers) {
    dropdown.push(file[index].answers[i]);
  }
  res.send(dropdown);
});

//get question
app.get("/question", function(req, res) {
  var data;

  data = getQuestion();
  console.log(data);
  if (data) { //if data exists
    res.send(data);
  } else { //reset
    resetIndex();
    data = getQuestion();
    res.send(data);
  }
});

//save new Quiz
app.post("/createQuiz", function(req,res) {
  console.log("Creating quiz...");
  res.redirect('./studytime.html');
});

//get answer
app.post("/answer", function(req, res) {
  data = getAnswer().solution;
  if (!data) {
    console.log("Error... no answer."); // better error handling later... don't see how there would be a question without an answer yet
  }

  console.log(req.body.solution);

  if (req.body.solution == data) {
    res.sendStatus(200);
  }
});

function getQuestion() {
  while (usedValues.indexOf(index) != -1) {
    index = parseInt(Math.random()*file.length);
  }

  //found new value
  usedValues.push(index);
  return file[index];
}

function getAnswer() {
  return file[index];
}

function resetIndex() {
  //starting the quiz over...
  usedValues = []; //emptied
}

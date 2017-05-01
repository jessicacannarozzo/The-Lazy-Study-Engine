var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser')
var file = './notes.json'

var file;
var usedValues;
var index;

app.use(express.static("./public"));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

jsonfile.readFile(file, function(err, obj) { //get file
  file = obj;
  // if (!err) console.log("FILE: " + JSON.stringify(file));
});

app.get('/', function (req, res) {
  res.render('index', {});
})

app.listen(3000, function () {
  console.log('Listening on port 3000...');
  usedValues = []; //init
  index = 0;
})

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

//get answer
app.post("/answer", function(req, res) {
  data = getAnswer();
  if (!data) {
    console.log("Error... no answer."); // better error handling later... don't see how there would be a question without an answer yet
  }

  if (req.body.answer == data.answer) {
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

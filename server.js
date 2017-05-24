var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser')
var file = './notes.json'
var mongo = require('mongodb').MongoClient;

var file;
var usedValues;
var index;

app.use(express.static("./public"));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

mongo.connect("mongodb://localhost:27017/recipeDB",function(err,database){
	if(err) throw err;

  app.listen(3000, function () {
    console.log('Listening on port 3000...');
    usedValues = []; //init
    index = 0;
  })

	db = database; //store the connection (pool)

  jsonfile.readFile(file, function(err, obj) { //get file
    file = obj;
    // if (!err) console.log("FILE: " + JSON.stringify(file));
  });

  db.collection("notes").update(file,{upsert:true, w: 1});
  // , function(err, result) { //Source: A in readme
    // if (err) res.sendStatus(500); //internal server error
    // else if (!recipe.name) res.sendStatus(400); //400, data missing
    // else res.sendStatus(200); //OK, success.
  // });
});



app.get('/', function (req, res) {
  res.render('index', {});
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

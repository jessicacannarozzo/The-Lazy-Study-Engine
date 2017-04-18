var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser')
var file = './notes.json'

var questionNum;
var answerNum;

app.use(express.static("./public"));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  res.render('index', {});
})

app.listen(3000, function () {
  console.log('Listening on port 3000...');
  questionNum = 0;
  answerNum = 0;

  //test, comment later
  // jsonfile.readFile(file, function(err, obj) {
  //   // console.log(JSON.stringify(obj));
  //   console.log(questionNum);
  //   console.log(obj[questionNum]);
  // });
})

//get question
app.get("/question", function(req, res) {
  var data;

  jsonfile.readFile(file, function(err, obj) {
    console.log("question" + questionNum);
    data = obj[questionNum];
    if (data) { //if data exists
      res.send(data[parseInt(questionNum)]);
    } else { //reset
      questionNum = 0;
      data = obj[questionNum]
      res.send(data[parseInt(questionNum)]);
    }
    questionNum++;
  });
});

//get answer
app.post("/answer", function(req, res) {
  // console.log(JSON.stringify(req.body.answer));
  jsonfile.readFile(file, function(err, obj) {
    console.log("answer" + answerNum);
    data = obj[answerNum];
    if (!data) {
      answerNum = 0;
      data = obj[answerNum];
    }

    if (req.body.answer == data[parseInt(answerNum)].answer) {
      res.sendStatus(200);
    }
    answerNum++;
  });
});

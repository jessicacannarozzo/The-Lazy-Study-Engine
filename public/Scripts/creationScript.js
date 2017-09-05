//@Jessica Cannarozzo

var index = 0;
var finalQuiz = {};

//saves question and answers, does not finalize the quiz yet
function saveQuestion(quizQuestion, quizAnswer, quizAnswer2, quizAnswer3, quizAnswer4) {
  console.log(finalQuiz);
  finalQuiz[index] = "";
  finalQuiz[index].answers = [""];

  finalQuiz[index].question = quizQuestion;
  console.log(quizQuestion);
  console.log(finalQuiz[index].question);
  finalQuiz[index].solution = quizAnswer;

  // finalQuiz[index].answers.concat([quizAnswer2, quizAnswer3, quizAnswer4]);
  index++;

  console.log(JSON.stringify(finalQuiz[index-1]));

  //reset question and answers
}

//resets all inputs so that new question and answers can be entered
function refreshQuestion() {
  $('#quizQuestion').val('');
  $('#quizAnswer*').val('');
}

//sends quiz back to the server to be stored as a JSON file
function finalizeQuiz() {

}

//@Jessica Cannarozzo

var index = 0;
var finalQuiz = new Object;

//saves question and answers, does not finalize the quiz yet
function saveQuestion(quizQuestion, quizAnswer, quizAnswer2, quizAnswer3, quizAnswer4) {
  finalQuiz[index] = new Object;

  //set question and solution
  finalQuiz[index].question = quizQuestion;
  finalQuiz[index].solution = quizAnswer;
  finalQuiz[index].answers = [];

  //add possible answers
  finalQuiz[index].answers.push(quizAnswer2); finalQuiz[index].answers.push(quizAnswer3); finalQuiz[index].answers.push(quizAnswer4);

  index++;

  console.log(JSON.stringify(finalQuiz[index-1]));

  //reset question and answers
  refreshQuestion();
}

//resets all inputs so that new question and answers can be entered
function refreshQuestion() {
  $('#quizFields').find('input:text').val('');
  // $('#quizAnswer*').val('');
}

//sends quiz back to the server to be stored as a JSON file
function finalizeQuiz() {

}

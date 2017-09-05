//@Jessica Cannarozzo

var index = 0;
var finalQuiz = new Object;

function isValid(input) {
  if (input == undefined || input == "") return false;
  else return true;
}

function addAnswer(ans) { //to avoid invalid additions
  if (isValid(ans)) finalQuiz[index].answers.push(ans);
}

//saves question and answers, does not finalize the quiz yet
function saveQuestion(quizQuestion, quizAnswer, quizAnswer2, quizAnswer3, quizAnswer4) {
  //at least a question, solution, and one possible answer must be valid
  if ((!isValid(quizQuestion) && !isValid(quizAnswer)) && (!isValid(quizAnswer2) || !isValid(quizAnswer3) || !isValid(quizAnswer4))) return;

  finalQuiz[index] = new Object;
  //set question and solution
  finalQuiz[index].question = quizQuestion;
  finalQuiz[index].solution = quizAnswer;
  finalQuiz[index].answers = [];

  //add possible answers
  addAnswer(quizAnswer2); addAnswer(quizAnswer3); addAnswer(quizAnswer4);

  index++;

  //reset question and answers
  refreshQuestion();
}

//resets all inputs so that new question and answers can be entered
function refreshQuestion() {
  $('#quizFields').find('input:text').val('');
}

//sends quiz back to the server to be stored as a JSON file
function finalizeQuiz() {
  if ($('#quizName').val() == undefined) index = 0; //reset
  else finalQuiz.quizName = $('#quizName').val();

  console.log("Finalizing quiz..."); //remove later
  console.log(finalQuiz);
  $.post("/createQuiz", finalQuiz, function(data, status) {});
}

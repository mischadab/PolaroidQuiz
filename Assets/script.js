var time = 80;
var TimerEl = document.getElementById('time');
var timerId;
var questionNum;
var finalScore = 0;

var questions = [
    { question: "Who started the company Polaroid?",
    answers: [ "George Eastman", "Ersnt Leitz", "Edwin Land" ],
    correct: "Edwin Land" },
    
    { question: "What was Edwin Land's first invention?",
    answers: [ "The Polaroid Camera", "Night Vision Goggles", "The Polarizer" ],
    correct: "The Polarizer" },
    
    { question: "Edwin Land's dream was to create:",
    answers: [ "The ultimate camera", "True one-step photography", "Simple photography that is easy accessible" ],
    correct: "True one-step photography" },

    { question: "The SX-70 was Edwin Land's first camera goal, although he released different cameras before it.. How long did it take to invent the SX-70?",
    answers: [ "50 years", "29 years", "14 years" ],
    correct: "29 years" },
    
    { question: "Edwin Land was on many projects in his lifetime. He is the reason why:",
    answers: [ "The first NASA telescope went into space", "Cars have turbochargers", "Tea comes in bags" ],
    correct: "The first NASA telescope went into space" },
]

function startQuiz(event) {
    event.preventDefault();
    questionNum = 0
    document.querySelector('#startQuiz')
    timerId = setInterval(clockTick, 1000);
    startBtn.style.display='none';
    document.getElementById('finalScoreEl').classList.add('d-none');
    document.getElementById('answerResponse').classList.remove('d-none');
    showQuestion();
}

function showQuestion() {
    var question = questions[questionNum]
    var questionEl = document.querySelector('#questionBox')
    questionEl.innerHTML = `
        <div class="alert alert-warning"><h3>${question.question}</h3>
         `
    for( var i=0; i < question.answers.length; i++ ){
        var answer = question.answers[i]
        questionEl.innerHTML += `
        <button onClick="selectAnswer(event,'${answer}')" class="btn btn-secondary btn-block">${answer}</button>
        `
    }
}

function selectAnswer(event, answer) {
    event.preventDefault()
        if (answer === questions[questionNum].correct) {
            console.log(`Yay you got it!`)
            finalScore++ 
         } else {
            console.log(`WRONG -10 seconds`)
    time-=10
    }
    questionNum++
        if (questionNum < questions.length)
     showQuestion()
        else
    endQuiz()
}

function clockTick() {
    time--;
    timerEl.textContent = time;
        if (time <= 0) {
        endQuiz();
    }
}

function endQuiz() {
 if (event) event.preventDefault();
  console.log(`Quiz complete`);
  clearInterval(timerId);
  document.getElementById('startBtn').style.display = 'inline';
  document.querySelector('#questionBox').innerHTML = "";
  timerEl.textContent = ""; time = 80;
  document.getElementById('finalScoreEl').textContent = 'Final Score ' + finalScore + "/5";
  document.getElementById('finalScoreEl').classList.remove('d-none');
  document.getElementById('completeForm').classList.remove('d-none');
  document.getElementById('answerResponse').classList.add('d-none');
}

function enterInfo(){
    event.preventDefault();
    var names = document.querySelector('#enteredInfo').value
    var storage = localStorage.setItem("infos", JSON.stringify(names));
    console.log(names + finalScore);
    renderInfo();
}

function renderInfo(){
    var personInfo = JSON.parse(localStorage.getItem("infos"));
    document.querySelector('#score').textContent += `${personInfo}  ${finalScore}`
    
}

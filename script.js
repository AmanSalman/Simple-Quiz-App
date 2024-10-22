const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "George Orwell"],
    correctAnswer: 0
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Osmium", "Gold", "Oganesson"],
    correctAnswer: 0
  },
  {
    question: "What year did the Titanic sink?",
    options: ["1905", "1912", "1899", "1920"],
    correctAnswer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 15;

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15;
  document.getElementById('timer').textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      checkAnswer(null);
    }
  }, 1000);
}

function updateProgressBar() {
  const progressBar = document.getElementById('progressBar');
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    document.querySelector('.question').textContent = currentQuestion.question;
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach((button, index) => {
      button.textContent = currentQuestion.options[index];
    });

    startTimer();
    updateProgressBar();
  } else {
    document.querySelector('.quiz-container').innerHTML += `<p>Your score is: ${score}/${questions.length}</p>`;
    document.querySelector('.retake-btn').style.display = 'inline-block';
  }
}

function checkAnswer(selectedIndex) {
  clearInterval(timerInterval);

  const currentQuestion = questions[currentQuestionIndex];
  const resultDiv = document.querySelector('.result');

  if (selectedIndex === currentQuestion.correctAnswer) {
    resultDiv.textContent = "Correct!";
    score++;
  } else if (selectedIndex !== null) {
    resultDiv.textContent = "Wrong answer!";
  } else {
    resultDiv.textContent = "Time's up!";
  }

  currentQuestionIndex++;
  setTimeout(() => {
    resultDiv.textContent = "";
    loadQuestion();
  }, 1000);
}

function retakeQuiz() {
  location.reload(); // Reload the page to restart the quiz
}

function startQuiz() {
  document.querySelector('.start-btn').style.display = 'none';
  document.querySelector('.question').style.display = 'block';
  document.querySelector('.timer').style.display = 'block';
  document.querySelector('.progress').style.display = 'block';
  document.querySelector('.options').style.display = 'block';
  loadQuestion();
}

loadQuestion();

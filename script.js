const quizData = [
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    choices: ['4', '22', 'NaN', 'Error'],
    correctAnswer: 1,
  },
  {
    question: 'Which method is used to add elements to the end of an array?',
    choices: ['push()', 'pop()', 'unshift()', 'shift()'],
    correctAnswer: 0,
  },
  {
    question: 'What does `NaN` stand for in JavaScript?',
    choices: [
      'No Any Number',
      'Negative Any Number',
      'Null and None',
      'Not a Number',
    ],
    correctAnswer: 3,
  },
];

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const questionContainer = document.getElementById('question-container');

let currentQuestion = 0;
let score = 0;
const wrongAnswers = [];

function loadQuestion() {
  const { question, choices } = quizData[currentQuestion];
  questionElement.textContent = question;
  choicesElement.innerHTML = '';

  choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.classList.add('choice-btn');
    button.addEventListener('click', () => selectChoice(index));
    choicesElement.appendChild(button);
  });
}

function selectChoice(index) {
  [...choicesElement.children].forEach((btn) =>
    btn.classList.remove('selected')
  );
  choicesElement.children[index].classList.add('selected');
}

function submitAnswer() {
  const selected = choicesElement.querySelector('.selected');
  if (!selected) return;

  const selectedIndex = [...choicesElement.children].indexOf(selected);
  const current = quizData[currentQuestion];

  if (selectedIndex === current.correctAnswer) {
    score++;
  } else {
    wrongAnswers.push({
      question: current.question,
      userAnswer: current.choices[selectedIndex],
      correctAnswer: current.choices[current.correctAnswer],
    });
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.style.display = 'none';
  submitButton.style.display = 'none';

  let resultHTML = `
    <p class='score'>You scored ${Math.round((score * 100) / quizData.length)}%
    (${score} out of ${quizData.length})</p>
  `;

  if (wrongAnswers.length > 0) {
    resultHTML += '<h3>Review</h3><ul>';
    wrongAnswers.forEach(({ question, userAnswer, correctAnswer }) => {
      resultHTML += `
        <li>
          <p><strong>Q:</strong> ${question}</p>
          <p><strong>Your Answer:</strong> <span class='wrong'>${userAnswer}</span></p>
          <p><strong>Correct Answer:</strong> <span class='correct'>${correctAnswer}</span></p>
        </li>
      `;
    });
    resultHTML += '</ul>';
  }

  resultElement.innerHTML = resultHTML;
}

submitButton.addEventListener('click', submitAnswer);
loadQuestion();

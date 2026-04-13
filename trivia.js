// Preguntas de trivia (5 preguntas de opción múltiple)
const questions = [
  {
    question: "¿Qué selección ha ganado más Copas del Mundo?",
    options: ["Brasil", "Alemania", "Argentina", "Italia"],
    correct: 0 // Brasil
  },
  {
    question: "¿En qué año se celebró el primer Mundial de fútbol?",
    options: ["1930", "1934", "1938", "1950"],
    correct: 0 // 1930
  },
  {
    question: "¿Qué país organizará el Mundial 2026 junto a México y Canadá?",
    options: ["Estados Unidos", "Argentina", "Brasil", "Francia"],
    correct: 0 // Estados Unidos
  },
  {
    question: "¿Quién es el máximo goleador histórico de los Mundiales?",
    options: ["Miroslav Klose", "Ronaldo Nazário", "Pelé", "Lionel Messi"],
    correct: 0 // Miroslav Klose
  },
  {
    question: "¿Qué selección ganó el Mundial de 2018?",
    options: ["Francia", "Croacia", "Bélgica", "Inglaterra"],
    correct: 0 // Francia
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = []; // ahora almacena true/false para cada pregunta
let quizFinished = false;

const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const scoreText = document.getElementById('scoreText');

// Función para mezclar array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Cargar la primera pregunta
function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestion];
  
  // Crear array de opciones con indicador de correcta
  let optionsWithCorrect = q.options.map((opt, index) => ({
    text: opt,
    isCorrect: index === q.correct
  }));
  
  // Mezclar opciones
  optionsWithCorrect = shuffleArray(optionsWithCorrect);

  let html = `
    <div class="question-card">
      <div class="question-text">${currentQuestion + 1}. ${q.question}</div>
      <div class="options" id="options-${currentQuestion}">
  `;

  optionsWithCorrect.forEach((opt, index) => {
    const letter = String.fromCharCode(65 + index); // A, B, C, D
    html += `
      <div class="option" data-question="${currentQuestion}" data-correct="${opt.isCorrect}" onclick="selectOption(${currentQuestion}, this)">
        <span class="option-letter">${letter}</span>
        <span class="option-text">${opt.text}</span>
      </div>
    `;
  });

  html += `</div></div>`;

  // Botón siguiente o finalizar
  if (currentQuestion < questions.length - 1) {
    html += `<button class="submit-btn" onclick="nextQuestion()">Siguiente</button>`;
  } else {
    html += `<button class="submit-btn" onclick="finishQuiz()">Finalizar</button>`;
  }

  quizContainer.innerHTML = html;
}

// Seleccionar opción
function selectOption(qIndex, element) {
  // Remover selección previa en esta pregunta
  document.querySelectorAll(`[data-question="${qIndex}"]`).forEach(el => {
    el.classList.remove('selected');
  });
  // Marcar la seleccionada
  element.classList.add('selected');
  // Guardar respuesta (true si es correcta, false si no)
  userAnswers[qIndex] = element.dataset.correct === 'true';
}

// Ir a siguiente pregunta
function nextQuestion() {
  if (userAnswers[currentQuestion] === undefined) {
    alert('Por favor selecciona una respuesta');
    return;
  }
  currentQuestion++;
  loadQuestion();
}

// Finalizar y calcular puntuación
function finishQuiz() {
  if (userAnswers[currentQuestion] === undefined) {
    alert('Por favor selecciona una respuesta');
    return;
  }
  // Calcular puntaje: sumar las respuestas que son true
  score = userAnswers.filter(ans => ans === true).length;
  showResults();
}

function showResults() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreText.textContent = `Obtuviste ${score} de ${questions.length} respuestas correctas.`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  quizFinished = false;
  quizContainer.classList.remove('hidden');
  resultContainer.classList.add('hidden');
  loadQuestion();
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
});
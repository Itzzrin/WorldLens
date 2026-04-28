// 100 preguntas sobre el Mundial 2026
const allQuestions = [

  // ===== MÉXICO (20 preguntas) =====
  {
    question: "¿Cómo se llama el estadio de la Ciudad de México que será sede del Mundial 2026?",
    options: ["Estadio Azteca", "Estadio Aztlán", "Estadio Olímpico Universitario", "Foro Sol"],
    correct: 0
  },
  {

    question: "¿Cómo se llama el estadio de Monterrey que será sede del Mundial 2026?",
    options: ["Estadio BBVA", "Estadio Universitario", "Estadio Tecnológico", "Estadio Olímpico"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el estadio de Guadalajara que será sede del Mundial 2026?",
    options: ["Estadio Akron", "Estadio Jalisco", "Estadio Chivas", "Estadio Verde Valle"],
    correct: 0
  },
  {
    question: "¿Cuántas ciudades mexicanas serán sedes del Mundial 2026?",
    options: ["3", "2", "4", "5"],
    correct: 0
  },
  {
    question: "¿Cuántos Mundiales habrá organizado México contando el de 2026?",
    options: ["3", "2", "1", "4"],
    correct: 0
  },
  {
    question: "¿En qué año llegó México a cuartos de final por primera y única vez en un Mundial?",
    options: ["1986", "1970", "1994", "2002"],
    correct: 0
  },
  {
    question: "¿Cómo se llama la racha de México de no superar la ronda de octavos de final en Mundiales?",
    options: ["El quinto partido", "La maldición azteca", "La barrera invisible", "El techo de cristal"],
    correct: 0
  },
  {
    question: "¿Quién es el máximo goleador histórico de la Selección Mexicana en Mundiales?",
    options: ["Javier Hernández", "Hugo Sánchez", "Cuauhtémoc Blanco", "Jared Borgetti"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo de la Selección Mexicana de fútbol?",
    options: ["El Tri", "Los Aztecas", "Los Verdes", "La Bicolor"],
    correct: 0
  },
  {
    question: "¿Cuál fue el resultado del partido México vs Alemania en el Mundial Rusia 2018?",
    options: ["México ganó 1-0", "Alemania ganó 2-0", "Empate 1-1", "México ganó 2-1"],
    correct: 0
  },
  {
    question: "¿Qué portero mexicano fue titular en el Mundial de México 1986?",
    options: ["Pablo Larios", "Jorge Campos", "Oswaldo Sánchez", "Antonio Carbajal"],
    correct: 0
  },
  {
    question: "¿Quién anotó el gol de México que eliminó a Argentina en prórroga en el Mundial 2006?",
    options: ["Rafael Márquez", "Jared Borgetti", "Omar Bravo", "Cuauhtémoc Blanco"],
    correct: 0
  },
  {
    question: "¿Contra qué selección perdió México en octavos de final en el Mundial 2010?",
    options: ["Argentina", "Brasil", "Uruguay", "Alemania"],
    correct: 0
  },
  {
    question: "¿En qué Mundial México fue eliminado por Argentina con un gol de Maxi Rodríguez en la prórroga?",
    options: ["Alemania 2006", "Sudáfrica 2010", "Francia 1998", "Brasil 2014"],
    correct: 0
  },
  {
    question: "¿Cuál es la capacidad aproximada del Estadio Azteca?",
    options: ["87,000", "70,000", "60,000", "100,000"],
    correct: 0
  },
  {
    question: "¿Qué famoso jugador mexicano fue capitán del Barcelona y ganó la Champions League en 2006?",
    options: ["Rafael Márquez", "Andrés Guardado", "Héctor Herrera", "Javier Hernández"],
    correct: 0
  },
  {
    question: "¿Cuántas clasificaciones consecutivas al Mundial acumuló México entre 1994 y 2022?",
    options: ["8", "7", "9", "6"],
    correct: 0
  },
  {
    question: "¿Qué jugador mexicano anotó dos goles ante Camerún en el Mundial Brasil 2014?",
    options: ["Oribe Peralta", "Javier Hernández", "Andrés Guardado", "Marco Fabián"],
    correct: 0
  },
  {
    question: "¿Cuál fue el resultado de México vs Brasil en octavos de final del Mundial Rusia 2018?",
    options: ["Brasil ganó 2-0", "México ganó 1-0", "Empate 0-0", "Brasil ganó 3-1"],
    correct: 0
  },
  {
    question: "¿En qué año disputó México su primer Mundial de fútbol?",
    options: ["1930", "1934", "1950", "1938"],
    correct: 0
  },

  // ===== GENERAL MUNDIAL 2026 (20 preguntas) =====
  {
    question: "¿Cuántos países organizan el Mundial 2026?",
    options: ["3", "2", "4", "1"],
    correct: 0
  },
  {
    question: "¿Cuántos equipos participarán en el Mundial 2026?",
    options: ["48", "32", "40", "36"],
    correct: 0
  },
  {
    question: "¿En qué país se jugará la final del Mundial 2026?",
    options: ["Estados Unidos", "México", "Canadá", "Se sortea al inicio"],
    correct: 0
  },
  {
    question: "¿En qué estadio se jugará la final del Mundial 2026?",
    options: ["MetLife Stadium (Nueva Jersey)", "Estadio Azteca", "Rose Bowl", "AT&T Stadium"],
    correct: 0
  },
  {
    question: "¿Cuántos grupos habrá en el Mundial 2026?",
    options: ["12", "8", "10", "16"],
    correct: 0
  },
  {
    question: "¿Cuántos equipos de cada grupo avanzan a la siguiente ronda en el Mundial 2026?",
    options: ["3 de 4", "2 de 4", "2 de 3", "1 de 4"],
    correct: 0
  },
  {
    question: "¿Qué confederación tiene más plazas directas en el Mundial 2026?",
    options: ["UEFA (Europa) con 16", "CONMEBOL con 8", "CAF con 9", "AFC con 8"],
    correct: 0
  },
  {
    question: "¿Cuántas plazas directas tiene CAF (África) en el Mundial 2026?",
    options: ["9", "5", "6", "8"],
    correct: 0
  },
  {
    question: "¿Cuál fue el primer Mundial de fútbol con formato de 48 equipos?",
    options: ["FIFA 2026", "Qatar 2022", "Rusia 2018", "Brasil 2030"],
    correct: 0
  },
  {
    question: "¿Cuántas plazas directas tiene CONMEBOL (Sudamérica) en el Mundial 2026?",
    options: ["6", "5", "4", "7"],
    correct: 0
  },
  {
    question: "¿Cuáles son las tres ciudades sede de Canadá en el Mundial 2026?",
    options: ["Toronto, Vancouver y Edmonton", "Toronto, Montreal y Ottawa", "Vancouver, Calgary y Toronto", "Montreal, Edmonton y Quebec"],
    correct: 0
  },
  {
    question: "¿Cuántas ciudades sede tiene Estados Unidos en el Mundial 2026?",
    options: ["11", "8", "10", "12"],
    correct: 0
  },
  {
    question: "¿Cuál es el nombre de la mascota oficial representante de México del Mundial 2026?",
    options: ["Zayu", "Amigos", "Zakumi", "Zabivaka"],
    correct: 0
  },
  {
    question: "¿En qué mes arranca el Mundial 2026?",
    options: ["Junio", "Mayo", "Julio", "Agosto"],
    correct: 0
  },
  {
    question: "¿Cuántos partidos se jugarán en total en el Mundial 2026?",
    options: ["104", "64", "80", "96"],
    correct: 0
  },
  {
    question: "¿Qué selección es la actual campeona del mundo al arrancar el Mundial 2026?",
    options: ["Argentina", "Francia", "Brasil", "Alemania"],
    correct: 0
  },
  {
    question: "¿Dónde se celebró el Mundial 2022?",
    options: ["Qatar", "Rusia", "Brasil", "Emiratos Árabes"],
    correct: 0
  },
  {
    question: "¿Cuántas plazas tiene CONCACAF en el Mundial 2026 sin contar a los tres anfitriones?",
    options: ["3", "5", "6", "2"],
    correct: 0
  },
  {
    question: "¿Cuál fue el marcador de la final del Mundial 2022 al término del tiempo reglamentario?",
    options: ["2-2 entre Argentina y Francia", "3-2 para Argentina", "1-1", "3-3"],
    correct: 0
  },
  {
    question: "¿Qué estadio de Texas (área de Dallas) será sede del Mundial 2026?",
    options: ["AT&T Stadium", "Cotton Bowl", "Globe Life Field", "Toyota Stadium"],
    correct: 0
  },

  // ===== ESPAÑA (8 preguntas) =====
  {
    question: "¿Cuántos Mundiales ha ganado España?",
    options: ["1", "2", "3", "0"],
    correct: 0
  },
  {
    question: "¿En qué año ganó España su único Mundial?",
    options: ["2010", "2006", "2014", "2002"],
    correct: 0
  },
  {
    question: "¿Contra qué selección jugó España la final del Mundial 2010?",
    options: ["Países Bajos", "Alemania", "Argentina", "Brasil"],
    correct: 0
  },
  {
    question: "¿Quién marcó el único gol de la victoria de España en la final del Mundial 2010?",
    options: ["Andrés Iniesta", "David Villa", "Fernando Torres", "Xavi"],
    correct: 0
  },
  {
    question: "¿Cómo se conoce el estilo de juego de posesión por el que España fue famosa entre 2008 y 2012?",
    options: ["Tiki-taka", "Catenaccio", "Gegenpressing", "Total Football"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo más común de la Selección Española?",
    options: ["La Roja", "La Furia Española", "Los Toros", "La Armada Invencible"],
    correct: 0
  },
  {
    question: "¿Qué joven extremo español se convirtió en el jugador más joven en marcar en una Eurocopa en 2024?",
    options: ["Lamine Yamal", "Pedri", "Gavi", "Ferran Torres"],
    correct: 0
  },
  {
    question: "¿Cuál fue el resultado de España ante Alemania en cuartos de la Eurocopa 2024?",
    options: ["España ganó 2-1", "Alemania ganó 2-0", "Empate y España gana en penales", "España ganó 3-0"],
    correct: 0
  },

  // ===== JAPÓN (6 preguntas) =====
  {
    question: "¿Cuál es el apodo oficial de la Selección Japonesa?",
    options: ["Samurai Azul", "Dragones del Este", "Samuráis del Pacífico", "Tigres Asiáticos"],
    correct: 0
  },
  {
    question: "¿A qué dos selecciones europeas eliminó Japón en la fase de grupos del Mundial 2022?",
    options: ["Alemania y España", "Francia e Italia", "Bélgica y Alemania", "España y Portugal"],
    correct: 0
  },
  {
    question: "¿Contra qué selección fue eliminado Japón en octavos de final del Mundial 2022?",
    options: ["Croacia", "Argentina", "Brasil", "Portugal"],
    correct: 0
  },
  {
    question: "¿En qué año co-organizó Japón un Mundial de fútbol junto a Corea del Sur?",
    options: ["2002", "1998", "2006", "2010"],
    correct: 0
  },
  {
    question: "¿Qué liga es la primera división de fútbol profesional en Japón?",
    options: ["J1 League", "J-Division", "Liga Japonesa", "Nippon League"],
    correct: 0
  },
  {
    question: "¿Cuántas veces ha clasificado Japón a un Mundial hasta 2022?",
    options: ["7", "5", "6", "8"],
    correct: 0
  },

  // ===== COLOMBIA (6 preguntas) =====
  {
    question: "¿Cuál es el apodo de la Selección Colombiana?",
    options: ["Los Cafeteros", "Los Dorados", "La Tricolor", "Los Pumas"],
    correct: 0
  },
  {
    question: "¿Cuál fue el mejor resultado histórico de Colombia en un Mundial?",
    options: ["Cuartos de final en Brasil 2014", "Semifinales en Brasil 2014", "Octavos en USA 1994", "Fase de grupos en Rusia 2018"],
    correct: 0
  },
  {
    question: "¿Quién fue el máximo goleador del Mundial Brasil 2014 y pertenecía a Colombia?",
    options: ["James Rodríguez", "Radamel Falcao", "Carlos Bacca", "Jackson Martínez"],
    correct: 0
  },
  {
    question: "¿Qué premio individual ganó James Rodríguez en el Mundial Brasil 2014?",
    options: ["Bota de Oro (máximo goleador)", "Balón de Oro (mejor jugador)", "Guante de Oro (mejor portero)", "Premio al Fair Play"],
    correct: 0
  },
  {
    question: "¿En qué posición terminó Colombia en su grupo en el Mundial Rusia 2018?",
    options: ["Primera de grupo", "Segunda de grupo", "Tercera, no clasificó", "No participó"],
    correct: 0
  },
  {
    question: "¿En qué equipo inglés juega el extremo colombiano Luis Díaz?",
    options: ["Liverpool", "Manchester City", "Arsenal", "Chelsea"],
    correct: 0
  },

  // ===== COREA DEL SUR (6 preguntas) =====
  {
    question: "¿Hasta qué ronda llegó Corea del Sur en el Mundial 2002 que co-organizó?",
    options: ["Semifinales", "Final", "Cuartos de final", "Octavos de final"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo de la Selección de Corea del Sur?",
    options: ["Guerreros Taeguk", "Dragones Rojos", "Tigres Asiáticos", "Leones del Este"],
    correct: 0
  },
  {
    question: "¿Qué legendario jugador coreano ganó varios títulos con el Manchester United tras brillar en 2002?",
    options: ["Park Ji-sung", "Son Heung-min", "Cha Bum-kun", "Lee Dong-gook"],
    correct: 0
  },
  {
    question: "¿Cuál es el nombre del capitán y máximo goleador histórico de Corea del Sur?",
    options: ["Son Heung-min", "Hwang Hee-chan", "Kim Min-jae", "Lee Kang-in"],
    correct: 0
  },
  {
    question: "¿Con qué país co-organizó Corea del Sur el Mundial 2002?",
    options: ["Japón", "China", "Australia", "Vietnam"],
    correct: 0
  },
  {
    question: "¿Contra qué selección fue eliminada Corea del Sur en octavos de final del Mundial 2022?",
    options: ["Brasil", "Argentina", "Croacia", "Portugal"],
    correct: 0
  },

  // ===== ARABIA SAUDÍ (5 preguntas) =====
  {
    question: "¿Cuál fue el histórico resultado de Arabia Saudí ante Argentina en el Mundial 2022?",
    options: ["Arabia Saudí ganó 2-1", "Argentina ganó 3-0", "Empate 1-1", "Arabia Saudí ganó 1-0"],
    correct: 0
  },
  {
    question: "¿Cuál es el nombre oficial de la primera división de fútbol de Arabia Saudí?",
    options: ["Saudi Pro League", "Liga Árabe", "Gulf League", "Saudi Premier League"],
    correct: 0
  },
  {
    question: "¿A qué club de Arabia Saudí fichó Cristiano Ronaldo en enero de 2023?",
    options: ["Al-Nassr", "Al-Hilal", "Al-Ittihad", "Al-Ahli"],
    correct: 0
  },
  {
    question: "¿Cuántas veces ha clasificado Arabia Saudí a un Mundial hasta 2022?",
    options: ["6", "4", "5", "7"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo de la Selección de Arabia Saudí?",
    options: ["Las Águilas Verdes", "Los Halcones del Desierto", "Los Guerreros del Desierto", "Los Camellos Dorados"],
    correct: 0
  },

  // ===== SUDÁFRICA (5 preguntas) =====
  {
    question: "¿En qué año fue el Mundial organizado por Sudáfrica?",
    options: ["2010", "2006", "2014", "2002"],
    correct: 0
  },
  {
    question: "¿Cuál fue el instrumento de viento símbolo del Mundial 2010 en Sudáfrica?",
    options: ["Vuvuzela", "Maracas", "Tambor", "Trompeta"],
    correct: 0
  },
  {
    question: "¿Quién ganó el Mundial 2010 organizado por Sudáfrica?",
    options: ["España", "Países Bajos", "Alemania", "Brasil"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo de la Selección de Sudáfrica?",
    options: ["Bafana Bafana", "Los Leones", "Los Springboks", "Los Guerreros del Cabo"],
    correct: 0
  },
  {
    question: "¿Qué canción de Shakira fue el himno del Mundial 2010 en Sudáfrica?",
    options: ["Waka Waka (Esto es África)", "La Copa de la Vida", "Boom", "She Wolf"],
    correct: 0
  },

  // ===== UCRANIA (4 preguntas) =====
  {
    question: "¿Hasta qué ronda llegó Ucrania en su mejor participación mundialista (Alemania 2006)?",
    options: ["Cuartos de final", "Semifinales", "Octavos de final", "Final"],
    correct: 0
  },
  {
    question: "¿Cuál es el nombre coloquial con el que se conoce a la Selección de Ucrania?",
    options: ["Zbirna", "Dynamo", "Shakhtar", "Trident"],
    correct: 0
  },
  {
    question: "¿Contra qué selección perdió Ucrania su repechaje para no clasificar al Mundial 2022?",
    options: ["Gales", "Polonia", "Escocia", "Austria"],
    correct: 0
  },
  {
    question: "¿Qué jugador ucraniano, ex del Shakhtar Donetsk, fichó por el Arsenal en enero de 2023?",
    options: ["Mykhailo Mudryk", "Zinchenko", "Yarmolenko", "Malinovsky"],
    correct: 0
  },

  // ===== TÚNEZ (4 preguntas) =====
  {
    question: "¿Qué hito histórico logró Túnez en el Mundial de Argentina 1978?",
    options: ["Fue el primer equipo africano en ganar un partido en un Mundial", "Llegó a cuartos de final", "Eliminó a Brasil", "Fue el primer clasificado africano"],
    correct: 0
  },
  {
    question: "¿Cuántas veces ha clasificado Túnez a un Mundial hasta 2022?",
    options: ["6", "4", "5", "7"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo de la Selección de Túnez?",
    options: ["Las Águilas de Cartago", "Los Leones del Norte", "Los Tuaregs", "Los Halcones del Mediterráneo"],
    correct: 0
  },
  {
    question: "¿En qué confederación juega Túnez sus partidos de clasificación mundialista?",
    options: ["CAF (África)", "UEFA (Europa)", "AFC (Asia)", "CONMEBOL"],
    correct: 0
  },

  // ===== UZBEKISTÁN (4 preguntas) =====
  {
    question: "¿En qué confederación compite Uzbekistán para clasificar a Mundiales?",
    options: ["AFC (Asia)", "UEFA (Europa)", "CAF (África)", "OFC (Oceanía)"],
    correct: 0
  },
  {
    question: "¿Sería el Mundial 2026 la primera participación de Uzbekistán como nación independiente?",
    options: ["Sí, sería su primera participación", "No, ya participó en 2022", "No, participó en 2018", "No, jugó en 2014"],
    correct: 0
  },
  {
    question: "¿Cuál es la capital de Uzbekistán?",
    options: ["Taskent", "Samarcanda", "Bujará", "Andiyán"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo de la Selección de Uzbekistán?",
    options: ["Los Lobos Blancos", "Los Tigres de Asia", "Los Guerreros de la Seda", "Los Leones del Este"],
    correct: 0
  },

  // ===== CABO VERDE (4 preguntas) =====
  {
    question: "¿En qué confederación compite Cabo Verde para clasificar a Mundiales?",
    options: ["CAF (África)", "UEFA (Europa)", "CONMEBOL", "AFC (Asia)"],
    correct: 0
  },
  {
    question: "¿Cuál es el apodo de la Selección de Cabo Verde?",
    options: ["Los Tiburones Azules", "Los Leones del Atlántico", "Las Águilas del Mar", "Los Guerreros Insulares"],
    correct: 0
  },
  {
    question: "¿Cuántas islas habitadas tiene el archipiélago de Cabo Verde?",
    options: ["10", "7", "15", "20"],
    correct: 0
  },
  {
    question: "¿En qué océano se encuentra el archipiélago de Cabo Verde?",
    options: ["Atlántico", "Índico", "Pacífico", "Mediterráneo"],
    correct: 0
  },

  // ===== REPÚBLICA CHECA (4 preguntas) =====
  {
    question: "¿Cuántas veces llegó Checoslovaquia (antecesora de la Rep. Checa) a la final de un Mundial?",
    options: ["2 veces (1934 y 1962)", "1 vez (1934)", "3 veces", "Nunca llegó a una final"],
    correct: 0
  },
  {
    question: "¿Qué famoso jugador checo ganó el Balón de Oro en 2003?",
    options: ["Pavel Nedvěd", "Petr Čech", "Tomáš Rosický", "Jan Koller"],
    correct: 0
  },
  {
    question: "¿En qué año se separó pacíficamente Checoslovaquia en República Checa y Eslovaquia?",
    options: ["1993", "1990", "1989", "1995"],
    correct: 0
  },
  {
    question: "¿Cuál fue el famoso resultado de la República Checa ante Países Bajos en la Eurocopa 2004 (cuartos)?",
    options: ["República Checa ganó 3-2 remontando", "Empate 1-1 con penales", "Países Bajos ganó 2-0", "República Checa ganó 1-0"],
    correct: 0
  }

];

// Seleccionar 10 preguntas aleatorias de las 100
function getRandomQuestions(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const questions = getRandomQuestions(allQuestions, 10);

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let quizFinished = false;

const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const scoreText = document.getElementById('scoreText');

// Mezclar opciones (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestion];

  let optionsWithCorrect = q.options.map((opt, index) => ({
    text: opt,
    isCorrect: index === q.correct
  }));

  optionsWithCorrect = shuffleArray(optionsWithCorrect);

  let html = `
    <div class="question-card">
      <div class="question-text">${currentQuestion + 1}. ${q.question}</div>
      <div class="options" id="options-${currentQuestion}">
  `;

  optionsWithCorrect.forEach((opt, index) => {
    const letter = String.fromCharCode(65 + index);
    html += `
      <div class="option" data-question="${currentQuestion}" data-correct="${opt.isCorrect}" onclick="selectOption(${currentQuestion}, this)">
        <span class="option-letter">${letter}</span>
        <span class="option-text">${opt.text}</span>
      </div>
    `;
  });

  html += `</div></div>`;

  if (currentQuestion < questions.length - 1) {
    html += `<button class="submit-btn" onclick="nextQuestion()">Siguiente</button>`;
  } else {
    html += `<button class="submit-btn" onclick="finishQuiz()">Finalizar</button>`;
  }

  quizContainer.innerHTML = html;
}

function selectOption(qIndex, element) {
  document.querySelectorAll(`[data-question="${qIndex}"]`).forEach(el => {
    el.classList.remove('selected');
  });
  element.classList.add('selected');
  const isCorrect = element.dataset.correct === 'true';
  const chosenText = element.querySelector('.option-text').textContent;
  userAnswers[qIndex] = { isCorrect, chosenText };
}

function nextQuestion() {
  if (userAnswers[currentQuestion] === undefined) {
    alert('Por favor selecciona una respuesta');
    return;
  }
  currentQuestion++;
  loadQuestion();
}

function finishQuiz() {
  if (userAnswers[currentQuestion] === undefined) {
    alert('Por favor selecciona una respuesta');
    return;
  }
  score = userAnswers.filter(ans => ans.isCorrect).length;
  showResults();
}

function showResults() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreText.textContent = `Obtuviste ${score} de ${questions.length} respuestas correctas.`;

  // Construir resumen de respuestas
  let reviewHtml = '<div class="review-list">';
  questions.forEach((q, i) => {
    const answer = userAnswers[i];
    const correctText = q.options[q.correct];
    const isCorrect = answer && answer.isCorrect;
    const chosenText = answer ? answer.chosenText : '—';

    reviewHtml += `
      <div class="review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}">
        <div class="review-question">
          <span class="review-icon">${isCorrect ? '✓' : '✗'}</span>
          <span>${i + 1}. ${q.question}</span>
        </div>
        <div class="review-answers">
          <div class="review-chosen">
            <span class="review-label">Tu respuesta:</span>
            <span class="review-value ${isCorrect ? 'chosen-ok' : 'chosen-wrong'}">${chosenText}</span>
          </div>
          ${!isCorrect ? `
          <div class="review-right">
            <span class="review-label">Respuesta correcta:</span>
            <span class="review-value correct-value">${correctText}</span>
          </div>` : ''}
        </div>
      </div>
    `;
  });
  reviewHtml += '</div>';

  // Insertar antes del botón group
  const existingReview = resultContainer.querySelector('.review-list');
  if (existingReview) existingReview.remove();
  const buttonGroup = resultContainer.querySelector('.button-group');
  buttonGroup.insertAdjacentHTML('beforebegin', reviewHtml);
}

function restartQuiz() {
  const newQuestions = getRandomQuestions(allQuestions, 10);
  questions.length = 0;
  newQuestions.forEach(q => questions.push(q));

  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  quizFinished = false;
  quizContainer.classList.remove('hidden');
  resultContainer.classList.add('hidden');
  loadQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
});
let currentCategory = null;
let currentQuestionIndex = 0;
let impactScore = 0;
let categoryScores = { transporte: 0, alimentacion: 0, residuos: 0 };

// Preguntas y opciones
const questions = {
  transporte: [
    {
      question: "¿Cómo te desplazas habitualmente?",
      options: [
        { text: "Coche particular", impact: 10 },
        { text: "Transporte público", impact: 5 },
        { text: "Bicicleta o a pie", impact: 1 }
      ]
    },
    {
      question: "¿Qué tipo de coche usas?",
      options: [
        { text: "Gasolina", impact: 10 },
        { text: "Eléctrico", impact: 3 },
        { text: "No uso coche", impact: 0 }
      ]
    }
  ],
  alimentacion: [
    {
      question: "¿Con qué frecuencia consumes carne roja?",
      options: [
        { text: "Diario", impact: 8 },
        { text: "Una vez por semana", impact: 4 },
        { text: "Rara vez", impact: 1 }
      ]
    }
  ],
  residuos: [
    {
      question: "¿Cómo gestionas tus residuos?",
      options: [
        { text: "No reciclo", impact: 10 },
        { text: "Reciclo parcialmente", impact: 5 },
        { text: "Reciclo todo", impact: 1 }
      ]
    }
  ]
};

// Inicia la simulación
function startSimulation(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  impactScore = 0;

  document.getElementById("categories").classList.add("hidden");
  document.getElementById("simulation").classList.remove("hidden");

  showQuestion();
}

// Muestra la pregunta actual
function showQuestion() {
  const categoryQuestions = questions[currentCategory];
  const currentQuestion = categoryQuestions[currentQuestionIndex];

  document.getElementById("question").innerText = currentQuestion.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("choice-btn");
    button.onclick = () => selectOption(option.impact);
    optionsDiv.appendChild(button);
  });
}

// Registra la opción seleccionada
function selectOption(impact) {
  impactScore += impact;
  document.getElementById("next-btn").classList.remove("hidden");
}

// Pasa a la siguiente pregunta o muestra los resultados
function nextQuestion() {
  currentQuestionIndex++;
  const categoryQuestions = questions[currentCategory];

  if (currentQuestionIndex < categoryQuestions.length) {
    document.getElementById("next-btn").classList.add("hidden");
    showQuestion();
  } else {
    categoryScores[currentCategory] = impactScore;
    document.getElementById("simulation").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    renderResults();
  }
}

// Muestra los resultados finales
function renderResults() {
  const totalImpact =
    categoryScores.transporte +
    categoryScores.alimentacion +
    categoryScores.residuos;

  const summary = `Tu impacto ambiental total es de ${totalImpact} puntos.`;
  document.getElementById("recommendations").innerText = summary;

  // Agrega el gráfico
  renderChart();
}

// Genera un gráfico usando Chart.js
function renderChart() {
  const ctx = document.getElementById("impactChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Transporte", "Alimentación", "Residuos"],
      datasets: [
        {
          label: "Puntaje por categoría",
          data: [
            categoryScores.transporte,
            categoryScores.alimentacion,
            categoryScores.residuos
          ],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"]
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Reinicia la simulación
function restartSimulation() {
  document.getElementById("results").classList.add("hidden");
  document.getElementById("categories").classList.remove("hidden");

  // Reinicia los puntajes
  categoryScores = { transporte: 0, alimentacion: 0, residuos: 0 };
}

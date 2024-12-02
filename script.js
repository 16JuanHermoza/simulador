// Simulador de Impacto Ambiental
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

  currentQuestion.options.forEach((option) => {
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
    showResults();
  }
}

// Muestra los resultados finales como texto
function showResults() {
  document.getElementById("simulation").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");

  const totalImpact =
    categoryScores.transporte +
    categoryScores.alimentacion +
    categoryScores.residuos;

  let summary = `Tu impacto ambiental total es de ${totalImpact} puntos.`;
  if (totalImpact < 15) {
    summary += " ¡Excelente! Tus hábitos son muy sostenibles.";
  } else if (totalImpact < 30) {
    summary +=
      " Tienes buenos hábitos, pero hay margen para reducir aún más tu impacto.";
  } else {
    summary +=
      " Tu impacto es alto. Considera cambiar algunos hábitos para cuidar el planeta.";
  }

  let recommendations = "";
  if (categoryScores.transporte > 10) {
    recommendations += " - Usa más transporte público o medios no motorizados.\n";
  }
  if (categoryScores.alimentacion > 8) {
    recommendations += " - Reduce el consumo de carne roja.\n";
  }
  if (categoryScores.residuos > 5) {
    recommendations += " - Intenta reciclar más y compostar residuos orgánicos.\n";
  }

  document.getElementById("results-summary").innerText = summary;
  document.getElementById(
    "results-recommendations"
  ).innerText = recommendations || "¡Sigue así, estás haciendo un gran trabajo!";
}

// Reinicia la simulación
function restartSimulation() {
  document.getElementById("results").classList.add("hidden");
  document.getElementById("categories").classList.remove("hidden");
}

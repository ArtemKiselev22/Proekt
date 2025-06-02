const questions = [
    {
        question: "Какая величина измеряется в Ньютонах?",
        options: ["Сила", "Энергия", "Мощность", "Давление"],
        answer: 0,
        hint: "Эта величина описывает взаимодействие между телами"
    },
    {
        question: "В каких единицах измеряется электрическое сопротивление?",
        options: ["Вольты", "Амперы", "Омы", "Ватты"],
        answer: 2,
        hint: "Названы в честь немецкого физика"
    },
    {
        question: "Что измеряется в Джоулях?",
        options: ["Сила тока", "Электрическое напряжение", "Энергия", "Масса"],
        answer: 2,
        hint: "Эта величина может быть кинетической или потенциальной"
    },
    {
        question: "Какая из этих величин является векторной?",
        options: ["Масса", "Время", "Сила", "Температура"],
        answer: 2,
        hint: "Векторные величины имеют направление"
    },
    {
        question: "В чем измеряется индуктивность?",
        options: ["Фарады", "Генри", "Тесла", "Вебер"],
        answer: 1,
        hint: "Названа в честь американского физика"
    }
];

// Элементы DOM
const questionElement = document.getElementById('question');
const hintElement = document.getElementById('hint');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const pointsElement = document.getElementById('points');

// Переменные игры
let currentQuestion = 0;
let points = 0;
let gameCompleted = false;

// Загрузка вопроса
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    hintElement.textContent = "";
    resultElement.textContent = "";
    resultElement.className = "result";
    nextBtn.style.display = 'none';
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
    });
}

// Проверка ответа
function checkAnswer(index) {
    const question = questions[currentQuestion];
    const options = optionsElement.querySelectorAll('.option');
    
    // Отключить все кнопки
    options.forEach(button => {
        button.disabled = true;
    });

    // Показать подсказку
    hintElement.textContent = question.hint;

    // Проверить ответ
    if (index === question.answer) {
        options[index].style.background = '#2ecc71';
        resultElement.textContent = "Правильно! +5 очков";
        resultElement.className = "result correct";
        points += 5;
    } else {
        options[index].style.background = '#e74c3c';
        options[question.answer].style.background = '#2ecc71';
        resultElement.textContent = "Неверно! Правильный ответ: " + question.options[question.answer];
        resultElement.className = "result incorrect";
        if (points > 0) points -= 2;
    }

    pointsElement.textContent = points;
    nextBtn.style.display = 'block';
}

// Следующий вопрос
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
});

// Завершение игры
function endGame() {
    gameCompleted = true;
    questionElement.textContent = "Игра завершена!";
    hintElement.textContent = "";
    optionsElement.innerHTML = '';
    nextBtn.style.display = 'none';
    resultElement.textContent = `Ваш результат: ${points} очков из ${questions.length * 5} возможных`;
    resultElement.className = "result";
}

// Начало игры
loadQuestion();
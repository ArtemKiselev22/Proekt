const questions = [
    {
        question: "Какой закон описывает силу взаимодействия двух точечных зарядов?",
        options: [
            "Закон Ома",
            "Закон Кулона", 
            "Закон Фарадея",
            "Закон Ньютона"
        ],
        answer: 1
    },
    {
        question: "Какая физическая величина измеряется в Ньютонах?",
        options: [
            "Масса",
            "Энергия",
            "Сила",
            "Мощность"
        ],
        answer: 2
    },
    {
        question: "Кто открыл явление радиоактивности?",
        options: [
            "Мария Кюри",
            "Альберт Эйнштейн",
            "Эрнест Резерфорд",
            "Нильс Бор"
        ],
        answer: 0
    },
    {
        question: "Какой прибор используется для измерения силы тока?",
        options: [
            "Вольтметр",
            "Амперметр",
            "Омметр",
            "Ваттметр"
        ],
        answer: 1
    },
    {
        question: "Что описывает второй закон Ньютона?",
        options: [
            "Закон сохранения энергии",
            "Связь между силой, массой и ускорением",
            "Закон всемирного тяготения",
            "Принцип относительности"
        ],
        answer: 1
    },
    {
        question: "Какое явление лежит в основе работы трансформатора?",
        options: [
            "Термоэлектронная эмиссия",
            "Электромагнитная индукция",
            "Фотоэффект",
            "Сверхпроводимость"
        ],
        answer: 1
    },
    {
        question: "Как называется единица измерения электрического сопротивления?",
        options: [
            "Вольт",
            "Ампер",
            "Ом",
            "Фарад"
        ],
        answer: 2
    },
    {
        question: "Кто сформулировал специальную теорию относительности?",
        options: [
            "Нильс Бор",
            "Альберт Эйнштейн",
            "Исаак Ньютон",
            "Макс Планк"
        ],
        answer: 1
    },
    {
        question: "Какой газ наиболее распространен в атмосфере Земли?",
        options: [
            "Кислород",
            "Азот",
            "Углекислый газ",
            "Аргон"
        ],
        answer: 1
    },
    {
        question: "Что характеризует частота колебаний?",
        options: [
            "Амплитуду колебаний",
            "Число колебаний в единицу времени",
            "Энергию колебаний",
            "Скорость распространения волны"
        ],
        answer: 1
    }
];

// Элементы DOM
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const progressBar = document.getElementById('progress');
const timeElement = document.getElementById('time');

// Переменные игры
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let quizCompleted = false;

// Загрузка вопроса
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    clearInterval(timer);
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    startTimer();

    const question = questions[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${question.question}`;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });

    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
    nextBtn.style.display = 'none';
}

// Выбор ответа
function selectOption(index) {
    if (quizCompleted) return;

    const question = questions[currentQuestion];
    const options = optionsElement.querySelectorAll('.option');
    
    // Отключить все кнопки
    options.forEach(button => {
        button.disabled = true;
    });

    // Проверить ответ
    if (index === question.answer) {
        options[index].style.background = '#2ecc71';
        score++;
        resultElement.textContent = "Правильно!";
    } else {
        options[index].style.background = '#e74c3c';
        options[question.answer].style.background = '#2ecc71';
        resultElement.textContent = "Неверно!";
    }

    resultElement.style.display = 'block';
    nextBtn.style.display = 'block';
    clearInterval(timer);
}

// Следующий вопрос
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    resultElement.style.display = 'none';
    loadQuestion();
});

// Таймер
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function timeUp() {
    const options = optionsElement.querySelectorAll('.option');
    options.forEach(button => {
        button.disabled = true;
    });
    
    const question = questions[currentQuestion];
    options[question.answer].style.background = '#2ecc71';
    resultElement.textContent = "Время вышло!";
    resultElement.style.display = 'block';
    nextBtn.style.display = 'block';
}

// Завершение теста
function endQuiz() {
    quizCompleted = true;
    questionElement.textContent = "Тест завершен!";
    optionsElement.innerHTML = '';
    nextBtn.style.display = 'none';
    resultElement.style.display = 'none';
    
    document.querySelector('.score-container').style.display = 'block';
    scoreElement.textContent = score;
    totalElement.textContent = questions.length;
    
    progressBar.style.width = '100%';
    clearInterval(timer);
}

// Начало игры
totalElement.textContent = questions.length;
loadQuestion();
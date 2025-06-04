const questions = [
    {
        question: "Кто сформулировал законы движения и закон всемирного тяготения?",
        options: ["Альберт Эйнштейн", "Исаак Ньютон", "Галилео Галилей", "Никола Тесла"],
        answer: 1,
        hint: "Этот ученый родился в 1643 году",
        image: "../images/Isak.webp"
    },
    {
        question: "Кто открыл явление электромагнитной индукции?",
        options: ["Джеймс Максвелл", "Майкл Фарадей", "Андре-Мари Ампер", "Генрих Герц"],
        answer: 1,
        hint: "Его именем названа единица электрической емкости",
        image: "../images/Faradey.webp"
    },
    {
        question: "Кто разработал специальную теорию относительности?",
        options: ["Нильс Бор", "Вернер Гейзенберг", "Альберт Эйнштейн", "Макс Планк"],
        answer: 2,
        hint: "Автор знаменитой формулы E=mc²",
        image: "../images/7575693.jpg"
    },
    {
        question: "Кто открыл радиоактивность?",
        options: ["Мария Кюри", "Эрнест Резерфорд", "Анри Беккерель", "Нильс Бор"],
        answer: 2,
        hint: "Открытие было сделано при изучении солей урана",
        image: "../images//Anry.jpg"
    },
    {
        question: "Кто создал первую квантовую теорию атома?",
        options: ["Эрвин Шрёдингер", "Вольфганг Паули", "Нильс Бор", "Пол Дирак"],
        answer: 2,
        hint: "Датский физик, лауреат Нобелевской премии 1922 года",
        image: "../images//Bor.webp"
    },
    {
        question: "Кто изобрел первый практичный телеграф?",
        options: ["Томас Эдисон", "Александр Попов", "Сэмюэл Морзе", "Гульельмо Маркони"],
        answer: 2,
        hint: "Также известен созданием специального кода",
        image: "../images//Morze.webp"
    },
    {
        question: "Кто открыл рентгеновские лучи?",
        options: ["Мария Кюри", "Вильгельм Рентген", "Антуан Беккерель", "Джозеф Томсон"],
        answer: 1,
        hint: "Первая Нобелевская премия по физике (1901 год)",
        image: "../images//Retgen.webp"
    },
    {
        question: "Кто сформулировал уравнения электромагнитного поля?",
        options: ["Генрих Герц", "Джеймс Максвелл", "Андре-Мари Ампер", "Георг Ом"],
        answer: 1,
        hint: "Эти уравнения объединили электричество и магнетизм",
        image: "../images//Mackvel.webp"
    },
    {
        question: "Кто изобрел переменный ток?",
        options: ["Томас Эдисон", "Никола Тесла", "Галилео Феррарис", "Михаил Доливо-Добровольский"],
        answer: 1,
        hint: "Его именем названа единица магнитной индукции",
        image: "../images/Tesla.webp"
    },
    {
        question: "Кто открыл электрон?",
        options: ["Эрнест Резерфорд", "Джеймс Чедвик", "Джозеф Томсон", "Роберт Милликен"],
        answer: 2,
        hint: "Нобелевская премия 1906 года",
        image: "../images/Tomson.webp"
    }
];

// Элементы DOM
const questionElement = document.getElementById('question');
const hintElement = document.getElementById('hint');
const scientistImage = document.getElementById('scientistImage');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const progressBar = document.getElementById('progress');
const scoreContainer = document.querySelector('.score-container');

// Переменные игры
let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

// Загрузка вопроса
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    hintElement.textContent = "";
    scientistImage.style.display = 'none';
    scientistImage.src = question.image;
    resultElement.textContent = "";
    resultElement.className = "result";
    nextBtn.style.display = 'none';
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });

    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
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

    // Показать изображение ученого
    scientistImage.style.display = 'block';
    hintElement.textContent = question.hint;

    // Проверить ответ
    if (index === question.answer) {
        options[index].style.background = '#2ecc71';
        resultElement.textContent = "Правильно! +10 очков";
        resultElement.className = "result correct";
        score += 10;
    } else {
        options[index].style.background = '#e74c3c';
        options[question.answer].style.background = '#2ecc71';
        resultElement.textContent = "Неверно! Это " + question.options[question.answer];
        resultElement.className = "result incorrect";
    }

    scoreElement.textContent = score;
    nextBtn.style.display = 'block';
}

// Следующий вопрос
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
});

// Завершение игры
function endQuiz() {
    quizCompleted = true;
    questionElement.textContent = "Тест завершен!";
    hintElement.textContent = "";
    scientistImage.style.display = 'none';
    optionsElement.innerHTML = '';
    nextBtn.style.display = 'none';
    resultElement.textContent = `Вы набрали ${score} очков из ${questions.length * 10} возможных`;
    resultElement.className = "result";
    
    progressBar.style.width = '100%';
    scoreContainer.style.display = 'block';
    totalElement.textContent = questions.length * 10;
}

// Начало игры
totalElement.textContent = questions.length * 10;
loadQuestion();
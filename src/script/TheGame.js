const formulas = [
    {
        name: "Второй закон Ньютона",
        correct: "F = m · a",
        elements: ["F", "=", "m", "·", "a", "p", "+", "-"]
    },
    {
        name: "Закон Ома",
        correct: "I = U / R",
        elements: ["I", "=", "U", "/", "R", "P", "·", "√"]
    },
    {
        name: "Кинетическая энергия",
        correct: "E = (m · v²)/2",
        elements: ["E", "=", "(", "m", "·", "v", "²", ")", "/", "2", "+", "3"]
    },
    {
        name: "Закон всемирного тяготения",
        correct: "F = G · (m₁·m₂)/r²",
        elements: ["F", "=", "G", "·", "(", "m", "₁", "·", "m", "₂", ")", "/", "r", "²", "p", "3"]
    }
];

// Элементы DOM
const formulaDisplay = document.getElementById('formulaDisplay');
const elementsContainer = document.getElementById('elementsContainer');
const checkBtn = document.getElementById('checkBtn');
const clearBtn = document.getElementById('clearBtn');
const feedback = document.getElementById('feedback');
const pointsElement = document.getElementById('points');

// Переменные игры
let currentFormula = 0;
let points = 0;
let currentElements = [];

// Начало игры
function startGame() {
    if (currentFormula >= formulas.length) {
        formulaDisplay.textContent = "Игра завершена!";
        elementsContainer.innerHTML = '';
        feedback.textContent = `Вы набрали ${points} очков!`;
        checkBtn.style.display = 'none';
        clearBtn.style.display = 'none';
        return;
    }

    const formula = formulas[currentFormula];
    formulaDisplay.textContent = formula.name;
    feedback.textContent = '';
    
    elementsContainer.innerHTML = '';
    formula.elements.forEach((element, index) => {
        const button = document.createElement('button');
        button.classList.add('element');
        button.textContent = element;
        button.onclick = () => addElement(element);
        elementsContainer.appendChild(button);
    });

    currentElements = [];
}

// Добавление элемента
function addElement(element) {
    currentElements.push(element);
    updateFormulaDisplay();
}

// Обновление отображения формулы
function updateFormulaDisplay() {
    formulaDisplay.textContent = `${formulas[currentFormula].name}: ${currentElements.join(' ')}`;
}

// Проверка формулы
checkBtn.addEventListener('click', () => {
    const userFormula = currentElements.join('');
    const correctFormula = formulas[currentFormula].correct.replace(/\s/g, '');
    
    if (userFormula === correctFormula) {
        feedback.textContent = "Правильно! +10 очков";
        feedback.className = "feedback correct";
        points += 10;
        pointsElement.textContent = points;
        setTimeout(() => {
            currentFormula++;
            startGame();
        }, 1500);
    } else {
        feedback.textContent = "Неверно! Попробуйте еще";
        feedback.className = "feedback incorrect";
        if (points > 0) points -= 2;
        pointsElement.textContent = points;
    }
});

// Очистка формулы
clearBtn.addEventListener('click', () => {
    currentElements = [];
    updateFormulaDisplay();
    feedback.textContent = '';
});

// Начало игры
startGame();
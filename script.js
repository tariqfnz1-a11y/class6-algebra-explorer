/* =========================
   NAVIGATION
========================= */

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selected = document.getElementById(sectionId);

    if (selected) {
        selected.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   PATTERN EXPLORER
========================= */

function checkPattern() {

    const rule = Number(
        document.getElementById("patternRule").value
    );

    const answer = 8 + rule;

    document.getElementById("number5").textContent = answer;

    const feedback =
        document.getElementById("patternFeedback");

    feedback.textContent =
        `The rule is "add ${rule}". The next number is ${answer}.`;
}


/* =========================
   VARIABLES
========================= */

function checkVariable() {

    const answer = Number(
        document.getElementById("variableAnswer").value
    );

    const feedback =
        document.getElementById("variableFeedback");

    if (answer === 7) {

        feedback.textContent =
            "Correct! 7 + 5 = 12.";

    } else {

        feedback.textContent =
            "Try again. Think: what number added to 5 gives 12?";
    }
}


/* =========================
   EXPRESSION BUILDER
========================= */

let currentExpression = "";

function addExpression(value) {

    currentExpression += value;

    document.getElementById(
        "expressionDisplay"
    ).textContent = currentExpression;
}


function clearExpression() {

    currentExpression = "";

    document.getElementById(
        "expressionDisplay"
    ).textContent = "";
}


/* =========================
   SIMPLIFICATION
========================= */

function simplifyAnswer(answer) {

    const feedback =
        document.getElementById("simplifyFeedback");

    if (answer === "5x") {

        feedback.textContent =
            "Correct! 3x and 2x are like terms, so 3x + 2x = 5x.";

    } else {

        feedback.textContent =
            "Try again. Combine the coefficients of the like terms.";
    }
}


/* =========================
   QUIZ
========================= */

const questions = [

    {
        question: "What is the next number in 2, 4, 6, 8, ...?",
        options: ["9", "10", "11", "12"],
        answer: "10"
    },

    {
        question: "In x + 5, which is the variable?",
        options: ["x", "5", "+", "x + 5"],
        answer: "x"
    },

    {
        question: "In 3x, what is the coefficient?",
        options: ["3", "x", "3x", "1"],
        answer: "3"
    },

    {
        question: "Which is an algebraic expression?",
        options: ["3 + 4", "x + 5", "12", "7 = 7"],
        answer: "x + 5"
    },

    {
        question: "Simplify: 2x + 3x",
        options: ["5x", "6x", "5", "x"],
        answer: "5x"
    },

    {
        question: "What is the next number in 5, 10, 15, 20, ...?",
        options: ["21", "25", "30", "35"],
        answer: "25"
    },

    {
        question: "If x = 4, what is x + 3?",
        options: ["6", "7", "8", "9"],
        answer: "7"
    },

    {
        question: "Which pair contains like terms?",
        options: ["3x and 5x", "3x and 5", "x and 4", "2x and 2y"],
        answer: "3x and 5x"
    },

    {
        question: "Simplify: 4x + x",
        options: ["4x", "5x", "5", "x"],
        answer: "5x"
    },

    {
        question: "In 7 + y, which is the constant?",
        options: ["7", "y", "+", "7y"],
        answer: "7"
    },

    {
        question: "If x = 5, what is 2x?",
        options: ["7", "10", "12", "25"],
        answer: "10"
    },

    {
        question: "Which expression means 'a number plus 6'?",
        options: ["x + 6", "x - 6", "6x", "x ÷ 6"],
        answer: "x + 6"
    },

    {
        question: "Simplify: 6x - 2x",
        options: ["4x", "8x", "4", "12x"],
        answer: "4x"
    },

    {
        question: "What is the rule in 3, 6, 9, 12?",
        options: ["Add 2", "Add 3", "Multiply by 3", "Add 4"],
        answer: "Add 3"
    },

    {
        question: "If x = 2, what is 3x + 1?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    }

];


function loadQuiz() {

    const container =
        document.getElementById("quizContainer");

    container.innerHTML = "";

    questions.forEach((q, index) => {

        const questionDiv =
            document.createElement("div");

        questionDiv.className =
            "quiz-question";

        let html =
            `<h3>${index + 1}. ${q.question}</h3>`;

        q.options.forEach(option => {

            html += `
                <label class="quiz-option">
                    <input
                        type="radio"
                        name="question${index}"
                        value="${option}">
                    ${option}
                </label>
            `;

        });

        questionDiv.innerHTML = html;

        container.appendChild(questionDiv);

    });
}


function submitQuiz() {

    let score = 0;

    questions.forEach((q, index) => {

        const selected =
            document.querySelector(
                `input[name="question${index}"]:checked`
            );

        if (
            selected &&
            selected.value === q.answer
        ) {

            score++;

        }

    });


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    document.getElementById(
        "quizResult"
    ).textContent =
        `You scored ${score} out of ${questions.length} (${percentage}%).`;
}


/* Load quiz */

loadQuiz();

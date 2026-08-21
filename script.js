/* ============================================================
   NAVIGATION
============================================================ */

/**
 * Show a specific section and hide all others.
 * @param {string} sectionId - The ID of the section to display.
 */
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}


/* ============================================================
   VARIABLES & CONSTANTS
============================================================ */

/** Update the visual expression tiles and result text. */
function updateExpression() {
    const coeff = Number(document.getElementById('coefficient').value);
    const constant = Number(document.getElementById('constant').value);

    document.getElementById('coefficientValue').textContent = coeff;
    document.getElementById('constantValue').textContent = constant;

    const container = document.getElementById('expressionTiles');
    container.innerHTML = '';
    for (let i = 0; i < coeff; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile variable';
        tile.textContent = 'x';
        container.appendChild(tile);
    }
    if (constant > 0) {
        const tile = document.createElement('div');
        tile.className = 'tile number';
        tile.textContent = '+' + constant;
        container.appendChild(tile);
    }

    document.getElementById('expressionResult').innerHTML =
        `<strong>Expression:</strong> ${coeff}x + ${constant}<br><br>${coeff} copies of x + ${constant}`;
}

/** Check the answer to "x + 5 = 12". */
function checkVariable() {
    const answer = Number(document.getElementById('variableAnswer').value);
    const feedback = document.getElementById('variableFeedback');
    if (answer === 7) {
        feedback.innerHTML = '✅ <strong>Correct!</strong> 7 + 5 = 12.';
        feedback.style.borderLeftColor = '#16a085';
    } else {
        feedback.innerHTML = '❌ Try again. Think: what number added to 5 gives 12?';
        feedback.style.borderLeftColor = '#e74c3c';
    }
}


/* ============================================================
   EXPRESSION BUILDER
============================================================ */

let currentExpression = '';

/** Append a character or token to the current expression. */
function addExpression(value) {
    currentExpression += value;
    document.getElementById('expressionDisplay').textContent = currentExpression || '_';
}

/** Clear the expression display. */
function clearExpression() {
    currentExpression = '';
    document.getElementById('expressionDisplay').textContent = '_';
}


/* ============================================================
   LIKE TERMS
============================================================ */

/** Combine like terms visually and show the result. */
function combineTerms() {
    const a = Number(document.getElementById('likeA').value);
    const b = Number(document.getElementById('likeB').value);

    document.getElementById('likeAValue').textContent = a;
    document.getElementById('likeBValue').textContent = b;

    const container = document.getElementById('likeTiles');
    container.innerHTML = '';
    for (let i = 0; i < a + b; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile variable';
        tile.textContent = 'x';
        container.appendChild(tile);
    }

    document.getElementById('likeResult').innerHTML =
        `<strong>${a}x + ${b}x = ${a + b}x</strong>`;
}

/** Handle simplification practice (3x + 2x). */
function simplifyAnswer(answer) {
    const feedback = document.getElementById('simplifyFeedback');
    if (answer === '5x') {
        feedback.innerHTML = '✅ <strong>Correct!</strong> 3x and 2x are like terms, so 3x + 2x = 5x.';
        feedback.style.borderLeftColor = '#16a085';
    } else {
        feedback.innerHTML = '❌ Try again. Combine the coefficients of the like terms.';
        feedback.style.borderLeftColor = '#e74c3c';
    }
}


/* ============================================================
   EQUATION BALANCE
============================================================ */

/** Update the balance scale with x tiles on the left and number tiles on the right. */
function drawBalance() {
    const x = Number(document.getElementById('balanceX').value);
    document.getElementById('balanceXValue').textContent = x;

    const left = document.getElementById('leftPan');
    const right = document.getElementById('rightPan');
    left.innerHTML = '';
    right.innerHTML = '';

    for (let i = 0; i < x; i++) {
        const t = document.createElement('div');
        t.className = 'tile variable';
        t.textContent = 'x';
        left.appendChild(t);
    }
    for (let i = 0; i < x; i++) {
        const t = document.createElement('div');
        t.className = 'tile number';
        t.textContent = '1';
        right.appendChild(t);
    }

    document.getElementById('balanceResult').innerHTML =
        `Both sides contain <strong>${x}</strong> equal units.`;
}


/* ============================================================
   ONE-STEP EQUATIONS
============================================================ */

/** Solve x + a = b and display steps. */
function solveOneStep() {
    const a = Number(document.getElementById('oneA').value);
    const b = Number(document.getElementById('oneB').value);

    document.getElementById('oneAValue').textContent = a;
    document.getElementById('oneBValue').textContent = b;

    const ans = b - a;
    document.getElementById('oneStepResult').innerHTML =
        `<strong>x + ${a} = ${b}</strong><br><br>Subtract ${a} from both sides.<br><br><strong>x = ${ans}</strong>`;
    document.getElementById('oneChallenge').textContent = `x + ${a} = ${b}`;
}


/* ============================================================
   TWO-STEP EQUATIONS
============================================================ */

/** Solve ax + b = c and display both steps. */
function solveTwoStep() {
    const a = Number(document.getElementById('twoA').value);
    const b = Number(document.getElementById('twoB').value);
    const c = Number(document.getElementById('twoC').value);

    document.getElementById('twoAValue').textContent = a;
    document.getElementById('twoBValue').textContent = b;
    document.getElementById('twoCValue').textContent = c;

    const ans = (c - b) / a;
    document.getElementById('twoStepResult').innerHTML =
        `<strong>${a}x + ${b} = ${c}</strong><br><br>` +
        `Step 1: subtract ${b}<br>${a}x = ${c - b}<br><br>` +
        `Step 2: divide by ${a}<br><br><strong>x = ${ans.toFixed(2)}</strong>`;
}


/* ============================================================
   SUBSTITUTION
============================================================ */

/** Evaluate 3x + 2 for a given x. */
function substitute() {
    const x = Number(document.getElementById('subX').value);
    document.getElementById('subXValue').textContent = x;

    const ans = 3 * x + 2;
    document.getElementById('subResult').innerHTML =
        `3(${x}) + 2<br><br>= ${3 * x} + 2<br><br><strong>= ${ans}</strong>`;
}


/* ============================================================
   NUMBER PATTERNS
============================================================ */

/** Update the pattern tiles based on the chosen rule (add). */
function checkPattern() {
    const rule = Number(document.getElementById('patternRule').value);
    document.getElementById('patternRuleDisplay').textContent = rule;

    const start = 2;
    const tiles = document.getElementById('patternTiles');
    tiles.innerHTML = '';
    const nums = [];
    for (let i = 0; i < 5; i++) {
        const val = start + i * rule;
        nums.push(val);
        const tile = document.createElement('div');
        tile.className = 'tile number';
        tile.textContent = val;
        tiles.appendChild(tile);
    }

    const feedback = document.getElementById('patternFeedback');
    feedback.innerHTML =
        `The rule is "add ${rule}". The next number is <strong>${nums[nums.length - 1] + rule}</strong>.`;
}


/* ============================================================
   COORDINATE PLANE
============================================================ */

/** Draw a coordinate grid and a movable point. */
function drawCoordinates() {
    const x = Number(document.getElementById('coordX').value);
    const y = Number(document.getElementById('coordY').value);

    document.getElementById('coordXValue').textContent = x;
    document.getElementById('coordYValue').textContent = y;

    const canvas = document.getElementById('coordinateCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const ox = 300, oy = 240;
    const scale = 25;

    // Grid
    ctx.strokeStyle = '#e8e3ff';
    ctx.lineWidth = 1;
    for (let i = -12; i <= 12; i++) {
        ctx.beginPath();
        ctx.moveTo(ox + i * scale, 0);
        ctx.lineTo(ox + i * scale, H);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, oy - i * scale);
        ctx.lineTo(W, oy - i * scale);
        ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#2d2580';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, oy);
    ctx.lineTo(W, oy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ox, 0);
    ctx.lineTo(ox, H);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#2d2580';
    ctx.font = '14px "Segoe UI", sans-serif';
    ctx.fillText('x', W - 22, oy - 10);
    ctx.fillText('y', ox + 10, 20);
    ctx.fillText('(0,0)', ox + 6, oy - 8);

    // Point with glow
    const px = ox + x * scale;
    const py = oy - y * scale;
    const grad = ctx.createRadialGradient(px, py, 2, px, py, 28);
    grad.addColorStop(0, 'rgba(232,67,147,0.2)');
    grad.addColorStop(1, 'rgba(232,67,147,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#e84393';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#1e1a3a';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText(`(${x}, ${y})`, px + 16, py - 12);

    document.getElementById('coordinateResult').innerHTML =
        `Point coordinates: <strong>(${x}, ${y})</strong>`;
}


/* ============================================================
   STUDY NOTES (toggle)
============================================================ */

/** Toggle the visibility of a note's content. */
function toggleNote(el) {
    const content = el.nextElementSibling;
    content.classList.toggle('show');
    el.classList.toggle('open');
}


/* ============================================================
   QUIZ (15 questions)
============================================================ */

const questions = [
    { q: 'What is the next number in 2, 4, 6, 8, …?', o: ['9', '10', '11', '12'], a: '10' },
    { q: 'In x + 5, which is the variable?', o: ['x', '5', '+', 'x + 5'], a: 'x' },
    { q: 'In 3x, what is the coefficient?', o: ['3', 'x', '3x', '1'], a: '3' },
    { q: 'Which is an algebraic expression?', o: ['3 + 4', 'x + 5', '12', '7 = 7'], a: 'x + 5' },
    { q: 'Simplify: 2x + 3x', o: ['5x', '6x', '5', 'x'], a: '5x' },
    { q: 'What is the next number in 5, 10, 15, 20, …?', o: ['21', '25', '30', '35'], a: '25' },
    { q: 'If x = 4, what is x + 3?', o: ['6', '7', '8', '9'], a: '7' },
    { q: 'Which pair contains like terms?', o: ['3x and 5x', '3x and 5', 'x and 4', '2x and 2y'], a: '3x and 5x' },
    { q: 'Simplify: 4x + x', o: ['4x', '5x', '5', 'x'], a: '5x' },
    { q: 'In 7 + y, which is the constant?', o: ['7', 'y', '+', '7y'], a: '7' },
    { q: 'If x = 5, what is 2x?', o: ['7', '10', '12', '25'], a: '10' },
    { q: 'Which expression means "a number plus 6"?', o: ['x + 6', 'x - 6', '6x', 'x ÷ 6'], a: 'x + 6' },
    { q: 'Simplify: 6x - 2x', o: ['4x', '8x', '4', '12x'], a: '4x' },
    { q: 'What is the rule in 3, 6, 9, 12?', o: ['Add 2', 'Add 3', 'Multiply by 3', 'Add 4'], a: 'Add 3' },
    { q: 'If x = 2, what is 3x + 1?', o: ['5', '6', '7', '8'], a: '7' }
];

/** Generate the quiz UI inside the container. */
function loadQuiz() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    questions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'quiz-question';
        let html = `<h3>${idx + 1}. ${q.q}</h3>`;
        q.o.forEach(opt => {
            html += `
                <label class="quiz-option">
                    <input type="radio" name="q${idx}" value="${opt}" />
                    ${opt}
                </label>
            `;
        });
        div.innerHTML = html;
        container.appendChild(div);
    });
}

/** Grade the quiz and display the score. */
function submitQuiz() {
    let score = 0;
    questions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        const options = document.querySelectorAll(`input[name="q${idx}"]`);

        options.forEach((input, i) => {
            const label = input.parentElement;
            label.classList.remove('correct', 'wrong');
            if (input.value === q.a) label.classList.add('correct');
        });

        if (selected && selected.value === q.a) {
            score++;
        } else if (selected) {
            selected.parentElement.classList.add('wrong');
        }
    });

    document.getElementById('quizScore').textContent = score;
    const pct = Math.round((score / questions.length) * 100);
    let msg = pct >= 80 ? '🏆 Excellent algebra skills!' :
              pct >= 60 ? '🌟 Great work!' :
              pct >= 40 ? '👍 Good effort!' :
              '📚 Keep practising!';

    document.getElementById('quizResult').innerHTML =
        `<div class="result">You scored <strong>${score}/${questions.length}</strong> (${pct}%)<br>${msg}</div>`;
}

/** Reset the quiz – clear all selections and scores. */
function resetQuiz() {
    document.querySelectorAll('.quiz-question input').forEach(el => {
        el.checked = false;
        el.parentElement.classList.remove('correct', 'wrong');
    });
    document.getElementById('quizScore').textContent = '0';
    document.getElementById('quizResult').innerHTML = '';
}


/* ============================================================
   INITIALIZATION
============================================================ */

/** Run all setup functions when the DOM is ready. */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize each interactive component
    updateExpression();
    combineTerms();
    drawBalance();
    solveOneStep();
    solveTwoStep();
    substitute();
    checkPattern();
    drawCoordinates();
    loadQuiz();

    // Open the first note by default
    const firstNote = document.querySelector('.note .note-title');
    if (firstNote) {
        firstNote.nextElementSibling.classList.add('show');
        firstNote.classList.add('open');
    }

    // Show the Variables section by default (if the nav is used)
    showSection('sectionVariables');
});

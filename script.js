let numSquares = 6;
let pickedColor;
let header = document.querySelector('.header');
let resultDisplay = document.querySelector("#result");
let h1 = document.querySelector("h1");
let squares = document.querySelectorAll("#square");
let colorDisplay = document.getElementById("colorDisplay");
let resetButton = document.querySelector("#resetButton");
let counterDisplay = document.querySelector('#counter');
let resetCounterButton = document.getElementById('resetCounter');
let counterClass = document.querySelector(".counter__class");
let rulesButton = document.querySelector("#rule");
let closeButton = document.querySelector('.close');
let modal = document.querySelector('#modal');
let easyButton = document.getElementById('easyBtn');
let hardButton = document.getElementById('hardBtn');
let wrongMessages = ['try again 😒', 'not match 🚫', 'wrong ❌', 'incorrect 😒'];
let rightMessages = ['correct 🎉', "you got it 🎉"];
let counter = 0;

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function () {
            let clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                rightAnswer();
                resetButton.textContent = "Play again?";
                changeColors(clickedColor);
                header.style.background = pickedColor;
                counterDisplay.innerHTML = counter++;
                setTimeout(time, 2500)
                function time() {
                    if (clickedColor === pickedColor) {
                        counterDisplay.innerHTML = counter = 0;
                    }
                }
            } else {
                this.style.backgroundColor = "black";
                changeColor();
                counterDisplay.innerHTML = --counter;
            }
        });
    }
}

function changeColor() {
    let randomAnswer = Math.floor(Math.random() * wrongMessages.length);
    resultDisplay.textContent = wrongMessages[randomAnswer];
}

function rightAnswer() {
    let randomRight = Math.floor(Math.random() * rightMessages.length);
    resultDisplay.textContent = rightMessages[randomRight];
}

hardButton.addEventListener("click", function () {
    numSquares = 6;
    hardButton.classList.add('selected');
    easyButton.classList.remove('selected');
    for (let i = 0; i < squares.length; i++) {
        if (hardButton.textContent === "Hard") {
            squares[i].style.display = "block";
        }
    }
    reset();
});

easyButton.addEventListener("click", function () {
    numSquares = 3;
    hardButton.classList.remove('selected');
    easyButton.classList.add('selected');
    for (let i = 0; i < squares.length; i++) {
        if (easyButton.textContent === "Easy") {
            squares[i].style.display = "block";
        }
    }
    reset();
});

function resetCounter() {
    resetCounterButton.addEventListener('click', function () {
        counterDisplay.innerHTML = counter = 0;
    });
    counterDisplay.innerHTML = counter = 0;
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resultDisplay.textContent = "";
    resetButton.textContent = "Reset Colors";
    if (header !== pickedColor) {
        header.style.background = "linear-gradient(to bottom left, #ff3434, #1787a6)";
    }
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    resetCounter();
}

resetButton.addEventListener("click", function () {
    reset();
    resetCounter();
});

function setupRuleModal() {
    rulesButton.onclick = function () {
        modal.style.display = "block";
    };
    closeButton.onclick = function () {
        modal.style.display = "none";
    };
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function init() {
    setupSquares();
    reset();
    resetCounter();
    setupRuleModal();
}

document.addEventListener('DOMContentLoaded', function () {
    init();
});

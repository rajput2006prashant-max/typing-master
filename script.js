// ------------------------------------
// HTML Elements ko select karna
// ------------------------------------

var startBtn = document.querySelector("#start-btn");
var restartBtn = document.querySelector("#restart-btn");

var typingInput = document.querySelector("#typing-input");
var textDisplay = document.querySelector("#text-display");

var wpmDisplay = document.querySelector("#wpm");
var accuracyDisplay = document.querySelector("#accuracy");
var errorsDisplay = document.querySelector("#errors");
var timeDisplay = document.querySelector("#time");


// ------------------------------------
// Variables
// ------------------------------------

var time = 60;
var timer;
var isTyping = false;

var errors = 0;


// ------------------------------------
// Typing Text
// ------------------------------------

var originalText = textDisplay.innerText;


// ------------------------------------
// Text ko individual characters me banana
// ------------------------------------

textDisplay.innerHTML = "";

for (var i = 0; i < originalText.length; i++) {

    var span = document.createElement("span");

    span.innerText = originalText[i];

    textDisplay.appendChild(span);
}


// ------------------------------------
// Start Button
// ------------------------------------

startBtn.addEventListener("click", function () {

    typingInput.disabled = false;

    typingInput.focus();

    startBtn.disabled = true;

    isTyping = true;

    startTimer();

});


// ------------------------------------
// Timer Function
// ------------------------------------

function startTimer() {

    timer = setInterval(function () {

        time--;

        timeDisplay.innerHTML = time;


        if (time <= 0) {

            clearInterval(timer);

            typingInput.disabled = true;

            isTyping = false;

            calculateResult();

        }

    }, 1000);

}


// ------------------------------------
// Typing Check
// ------------------------------------

typingInput.addEventListener("input", function () {

    if (!isTyping) {
        return;
    }


    var typedText = typingInput.value;

    errors = 0;


    // Text ke saare characters select karo

    var characters = textDisplay.querySelectorAll("span");


    // Har character check karo

    for (var i = 0; i < characters.length; i++) {

        var originalCharacter = originalText[i];

        var typedCharacter = typedText[i];


        // Pehle classes remove karo

        characters[i].classList.remove(
            "correct",
            "wrong",
            "current"
        );


        // Current character

        if (i === typedText.length) {

            characters[i].classList.add("current");

        }


        // Agar user ne character type kiya hai

        if (typedCharacter !== undefined) {


            // Correct character

            if (typedCharacter === originalCharacter) {

                characters[i].classList.add("correct");

            }


            // Wrong character

            else {

                characters[i].classList.add("wrong");

                errors++;

            }

        }

    }


    // Errors show karo

    errorsDisplay.innerHTML = errors;


    // Accuracy calculate karo

    var totalCharacters = typedText.length;

    var correctCharacters = totalCharacters - errors;


    if (totalCharacters > 0) {

        var accuracy =
            (correctCharacters / totalCharacters) * 100;

        accuracyDisplay.innerHTML =
            Math.max(0, accuracy).toFixed(0) + "%";

    }


    // Live WPM

    calculateLiveWPM();

});


// ------------------------------------
// Live WPM
// ------------------------------------

function calculateLiveWPM() {

    var typedText = typingInput.value;

    var words = typedText.length / 5;

    var usedTime = 60 - time;


    if (usedTime <= 0) {

        usedTime = 1;

    }


    var wpm =
        (words / usedTime) * 60;


    wpmDisplay.innerHTML =
        Math.round(wpm);

}


// ------------------------------------
// Final Result
// ------------------------------------

function calculateResult() {

    var typedText = typingInput.value;

    var totalCharacters = typedText.length;

    var words = totalCharacters / 5;

    var usedTime = 60 - time;


    if (usedTime === 0) {

        usedTime = 1;

    }


    var wpm =
        (words / usedTime) * 60;


    wpmDisplay.innerHTML =
        Math.round(wpm);


    // Final accuracy

    var correctCharacters =
        totalCharacters - errors;


    if (totalCharacters > 0) {

        var accuracy =
            (correctCharacters / totalCharacters) * 100;

        accuracyDisplay.innerHTML =
            Math.max(0, accuracy).toFixed(0) + "%";

    }

}


// ------------------------------------
// Restart Button
// ------------------------------------

restartBtn.addEventListener("click", function () {

    clearInterval(timer);


    time = 60;

    errors = 0;

    isTyping = false;


    // Screen reset

    timeDisplay.innerHTML = "60";

    wpmDisplay.innerHTML = "0";

    accuracyDisplay.innerHTML = "100%";

    errorsDisplay.innerHTML = "0";


    // Input reset

    typingInput.value = "";

    typingInput.disabled = true;


    // Start button enable

    startBtn.disabled = false;


    // Characters reset

    var characters =
        textDisplay.querySelectorAll("span");


    for (var i = 0; i < characters.length; i++) {

        characters[i].classList.remove(
            "correct",
            "wrong",
            "current"
        );

    }


    // First character highlight

    if (characters.length > 0) {

        characters[0].classList.add("current");

    }

});
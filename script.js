const words = ["apple", "banana", "orange", "grape", "strawberry", "kiwi", "melon", "peach", "pear", "plum",
    "pineapple", "mango", "blueberry", "raspberry", "blackberry", "coconut", "lemon", "lime", "cherry", "apricot",
    "nectarine", "fig", "date", "pomegranate", "tangerine", "papaya", "cantaloupe", "watermelon", "kiwifruit", "jackfruit",
    "passionfruit", "currant", "gooseberry", "cucumber", "zucchini", "eggplant", "bell pepper", "tomato", "carrot", "onion",
    "garlic", "lettuce", "spinach", "broccoli", "cauliflower", "cabbage", "sweet potato", "potato", "asparagus", "corn"];

let currentWords = [];
let currentWordIndex = 0;
let currentCharIndex = 0;
let startTime;

const textContainer = document.getElementById("text-container");
const resultContainer = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);

function startTest() {
    const selectedWords = document.querySelector('input[name="wordCount"]:checked').value;
    currentWords = generateWords(parseInt(selectedWords));
    currentWordIndex = 0;
    currentCharIndex = 0;
    startTime = Date.now(); // Start timer
    displayWords();
    textContainer.focus();
}

function resetTest() {
    textContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    currentWords = [];
    currentWordIndex = 0;
    currentCharIndex = 0;
}

function generateWords(count) {
    const selectedWords = [];
    for (let i = 0; i < count; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        selectedWords.push(randomWord + getRandomPunctuation());
    }
    return selectedWords;
}

function getRandomPunctuation() {
    return Math.random() < 0.5 ? "" : Math.random() < 0.5 ? "." : ",";
}

function displayWords() {
    const wordsHTML = currentWords.map((word, index) => {
        return index === currentWordIndex ? 
        `<span>${word.substring(0, currentCharIndex)}<span class="highlight">${word.charAt(currentCharIndex)}</span>${word.substring(currentCharIndex + 1)}</span>` : 
        word;
    }).join(" ");
    
    textContainer.innerHTML = wordsHTML;
    textContainer.setAttribute("tabindex", "0");
    textContainer.addEventListener("keydown", handleTyping);
}

function handleTyping(event) {
    const currentWord = currentWords[currentWordIndex];

    // Handle spacebar press to move to the next word
    if (event.key === " ") {
        event.preventDefault(); // Prevent space from being added
        if (currentCharIndex === currentWord.length) {
            currentWordIndex++;
            currentCharIndex = 0; // Move to the next word
            if (currentWordIndex === currentWords.length) {
                endTest();
            }
        }
        displayWords();
        return;
    }

    // Handle character input
    if (currentCharIndex < currentWord.length) {
        if (event.key === currentWord.charAt(currentCharIndex)) {
            currentCharIndex++;
            // Check if current word is completed
            if (currentCharIndex === currentWord.length) {
                displayWords(); // Display after completing the word
            }
        }
    }
    
    // End test if it's the last character of the last word
    if (currentWordIndex === currentWords.length - 1 && currentCharIndex === currentWord.length) {
        endTest();
    }
    
    displayWords();
}

function endTest() {
    const timeTaken = (Date.now() - startTime) / 1000; // time in seconds
    const wpm = Math.round((currentWords.length / timeTaken) * 60);
    resultContainer.innerHTML = `Your typing speed: <strong>${wpm} WPM</strong>`;
    textContainer.removeEventListener("keydown", handleTyping);
}

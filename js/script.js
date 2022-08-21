const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".btn"),
  typingInput = document.querySelector(".typing-input");

let word,
  maxGuesses,
  incorrectLetters = [],
  correctLetters = [];

function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 6 ? ` ${8}` : ` ${6}`;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  let letter = "";
  for (let i = 0; i < word.length; i++) {
    letter += `<input type="text" disabled>`;
    inputs.innerHTML = letter;
  }
}
randomWord();

function initGame(e) {
  let key = e.target.value.toLowerCase();

  if (word.includes(key)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] == key) {
        correctLetters += key;
        inputs.querySelectorAll("input")[i].value = key;
      }
    }
  } else {
    maxGuesses--;
    incorrectLetters.push(` ${key}`);
  }
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  typingInput.value = "";

  setTimeout(() => {
    if (correctLetters.length === word.length) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      return randomWord();
    } else if (maxGuesses < 1) {
      alert("Game over! You don't have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 400);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

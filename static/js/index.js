const start = new Date();

const setTimer = function () {
  const current = new Date();
  const passed = new Date(current - start);
  const minutes = passed.getMinutes().toString();
  const seconds = passed.getSeconds().toString();
  const timeBlock = document.querySelector(".timer-time");

  timeBlock.innerText = `${minutes.padStart(2, 0)}: ${seconds.padStart(2, 0)}`;
};

let startTimer = setInterval(setTimer, 1000);
// >> return interval id

const stopTimer = () => clearInterval(startTimer);

// startTimer(); clearInterval 함수형으로 어떻게?

// const solution = "apple".toUpperCase();
let index = 0;
let attempts = 0;
// let correct = 0;

const rgb2hex = (rgb) => {
  if (rgb === "") return;

  return `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
};

const appStart = function () {
  const green = "#6AAA64";
  const yellow = "#C9B458";
  const grey = "#787c7e";
  const changeKeyboardColor = function (letter, color) {
    keyboardBlock = document.querySelector(`#${letter.toLowerCase()}`);
    const currentColor = rgb2hex(keyboardBlock.style.background);
    console.log(currentColor);
    if (currentColor !== green) {
      keyboardBlock.style.background = color;
    }
  };
  const handleBackspace = function () {
    if (index > 0) {
      index -= 1;
      const formerBlock = document.querySelector(
        `.board-cell[data-index='${attempts}${index}']`
      );
      formerBlock.innerText = "";
    }
  };
  const handleEnterkey = async () => {
    let correct = 0;
    const response = await fetch("/answer");
    const solutionObject = await response.json();
    const solution = solutionObject.answer;
    const nextLine = function () {
      if (attempts === 5) gameOver();
      attempts += 1;
      index = 0;
      correct = 0;
    };
    const gameOver = function () {
      window.removeEventListener("keydown", handleKeydown);
      displayGameOver();
      stopTimer();
    };
    const displayGameOver = function () {
      const div = document.createElement("div");
      div.innerText = "GAME IS OVER";
      div.style =
        "position: absolute; top: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.5); display: flex; justify-content: center; align-items: center;";
      document.body.appendChild(div);
    };
    for (let i = 0; i < 5; i++) {
      const boardBlock = document.querySelector(
        `.board-cell[data-index='${attempts}${i}']`
      );

      const letter = boardBlock.innerText;
      const solutionChar = solution[i];
      //green
      if (letter === solutionChar) {
        boardBlock.style.background = green;
        changeKeyboardColor(letter, green);
        correct += 1;
      } else if (solution.includes(letter)) {
        boardBlock.style.background = yellow;
        changeKeyboardColor(letter, yellow);
      } else {
        boardBlock.style.background = grey;
      }
      boardBlock.style.color = "white";
      boardBlock.style.border = "none";
    }
    if (correct === 5) gameOver();
    else nextLine();
  };

  const handleKeydown = function (event) {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    thisBlock = document.querySelector(
      `.board-cell[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
    // keyArr = [
    //   "q",
    //   "w",
    //   "e",
    //   "r",
    //   "t",
    //   "y",
    //   "u",
    //   "i",
    //   "o",
    //   "p",
    //   "a",
    //   "s",
    //   "d",
    //   "f",
    //   "g",
    //   "h",
    //   "j",
    //   "k",
    //   "l",
    //   "z",
    //   "x",
    //   "c",
    //   "v",
    //   "b",
    //   "n",
    //   "m",
    // ];
    // keyArr.includes(key) ? (thisBlock.innerText = key.toUpperCase()) : true;
  };

  window.addEventListener("keydown", handleKeydown);
};

appStart();

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

const solution = "apple".toUpperCase();
let index = 0;
let attempts = 0;
let correct = 0;

const appStart = function () {
  const handleBackspace = function () {
    if (index > 0) {
      index -= 1;
      const formerBlock = document.querySelector(
        `.board-cell[data-index='${attempts}${index}']`
      );
      formerBlock.innerText = "";
    }
  };
  const handleEnterkey = function () {
    const nextLine = function () {
      if (attempts === 5) gameOver();
      attempts += 1;
      index = 0;
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
      const block = document.querySelector(
        `.board-cell[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const solutionChar = solution[i];
      if (letter === solutionChar) {
        block.style.background = "#6AAA64";
        correct += 1;
      } else if (solution.includes(letter)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787c7e";
      }
      block.style.color = "white";
      block.style.border = "none";
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

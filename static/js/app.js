const start = new Date();

const setTimer = function () {
  const current = new Date();
  const passed = new Date(current - start);
  const minutes = passed.getMinutes().toString();
  const seconds = passed.getSeconds().toString();
  const timeBlock = document.querySelector(".timer-time");

  timeBlock.innerText = `${minutes.padStart(2, 0)}: ${seconds.padStart(2, 0)}`;
};

setInterval(setTimer, 1000);

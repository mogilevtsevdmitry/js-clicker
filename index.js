const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const audio = new Audio(); 
audio.src = 'faffc4680144f12.mp3'; 

const COLORS = [
  "#FDEB71,#F8D800",
  "#ABDCFF,#0396FF",
  "#FEB692,#EAS4SS",
  "#CE9FFC,#7367F0",
  "#90F7EC,#32CCBC",
  "#FFF6B7,#F6416C",
  "#81FBBB,#28C76F",
  "#E2B0FF,#9F44D3",
  "#F97794,#623AA2",
  "#FCCF31,#F55555",
];
let timerId;
let time = 2;
let score = 0;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    audio.play();
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  timeEl.parentNode.classList.remove("hide");
  board.innerHTML = "";
  score = 0;
  timerId = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (time < 10) current = `0${time}`;
    setTime(current);
  }
}

function setTime(val) {
  timeEl.innerHTML = `00:${val}`;
}

function finishGame() {
  clearInterval(timerId);
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `
        <h1>Ваш счет: <span class="primary">${score}</span></h1>
        <a href="#" id="restart" class="restart">Начать сначала</a>
    `;

  const restartBtn = document.querySelector("#restart");
  restartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    screens[1].classList.remove("up");
    screens[0].classList.add("up");
  });
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomSize(25, 60);
  const { height, width } = board.getBoundingClientRect();
  const x = getRandomSize(0, width - size);
  const y = getRandomSize(0, height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `linear-gradient(${color})`;

  board.append(circle);
}

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const idx = Math.floor(Math.random() * COLORS.length);
  return COLORS[idx];
}

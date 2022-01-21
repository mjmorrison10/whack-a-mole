"use strict";

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const resetBtn = document.querySelector(".reset");

let result;
let hitPosition;
let currentTime;
let timerId;
let canPlay = true;
const moveMoleTimer = 1;

function removeMole() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
}

function randomSquare() {
  removeMole();

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;
}

function flashSquare(sq) {
  sq.style.backgroundColor = "red";
  setInterval(() => {
    sq.style.backgroundColor = "transparent";
  }, 100);
}


squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    if (square.id == hitPosition) {
      flashSquare(e.target)
      result++;
      score.textContent = result;
      hitPosition = null;
      randomSquare();
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, moveMoleTimer * 1000);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime <= 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("GAME OVER! Your final score is " + result);
    canPlay = true;
    removeMole();
  }
}

let countDownTimerId;

function init() {
  if (!canPlay) return;
  result = 0;
  hitPosition;
  currentTime = 60;
  timerId;
  canPlay = false;

  score.textContent = result;
  timeLeft.textContent = currentTime;

  randomSquare();
  moveMole();

  countDownTimerId = setInterval(countDown, 1000);
}

init();

resetBtn.addEventListener("click", init);

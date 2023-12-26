const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start-game'); // Updated to the new start button
const scoreDisplay = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let lastHole;
let timeUp = false;
let score = 0;
let gameTimer;
let difficulty = 'normal'; // Default difficulty

// Function to generate a random integer
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to set delay based on difficulty
function setDelay(difficulty) {
  if (difficulty === 'easy') {
    return 1500;
  } else if (difficulty === 'normal') {
    return 1000;
  } else { // 'hard'
    return randomInteger(600, 1200);
  }
}

// Function to choose a random hole
function chooseHole(holes) {
  const idx = randomInteger(0, holes.length - 1);
  const hole = holes[idx];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Function to toggle mole visibility
function toggleVisibility(hole) {
  hole.classList.toggle('show');
}

// Function to show and hide a mole after a delay
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  setTimeout(() => {
    toggleVisibility(hole);
    if (!timeUp) {
      showUp();
    }
  }, delay);
}

// Function to show a mole
function showUp() {
  const time = setDelay(difficulty); 
  const hole = chooseHole(holes);
  showAndHide(hole, time);
}

// Function to start the game
function startGame() {
  score = 0;
  scoreDisplay.textContent = '0';
  timeUp = false;
  startTimer();
  showUp();
  setTimeout(() => timeUp = true, 10000); // Game length based on difficulty
}

// Function to handle mole clicks (score increment)
function whack(e) {
  if(!e.isTrusted) return; // Check for simulated events
  score++;
  scoreDisplay.textContent = score;
}

// Function to start the game timer
function startTimer() {
  let timeLeft = 10; // Game length in seconds
  timerDisplay.textContent = timeLeft;
  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
    }
  }, 1000);
}

// Function to read selected difficulty and start game
document.getElementById('start-game').addEventListener('click', () => {
  // Hide the start screen
  document.getElementById('start-screen').style.display = 'none';

  // Read selected difficulty
  difficulty = document.querySelector('input[name="difficulty"]:checked').value;

  // Start the game
  startGame();
});

// Add event listeners to each mole
moles.forEach(mole => mole.addEventListener('click', whack));

// Refresh Button to start the game over
function resetGame() {
  // Reset score and display
  score = 0;
  scoreDisplay.textContent = '0';

  // Stop the game timer
  clearInterval(gameTimer);
  timerDisplay.textContent = '0';

  // Reset game variables
  timeUp = false;
  lastHole = null;

  // Start a new game
  startGame();
}

// Add an event listener to the "Refresh" button
document.getElementById('refresh-button').addEventListener('click', resetGame);

// Music added for background sound as user plays
const song = new Audio("music/What's The Problem.mp3");

//adding in snow for the winter season


function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
}

//Just the script for the snow effect

document.addEventListener('DOMContentLoaded', function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
  script.onload = function(){
      particlesJS("snow", {
          "particles": {
              "number": {
                  "value": 200,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#ffffff"
              },
              "opacity": {
                  "value": 0.7,
                  "random": false,
                  "anim": {
                      "enable": false
                  }
              },
              "size": {
                  "value": 5,
                  "random": true,
                  "anim": {
                      "enable": false
                  }
              },
              "line_linked": {
                  "enable": false
              },
              "move": {
                  "enable": true,
                  "speed": 1,
                  "direction": "bottom",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": true,
                      "rotateX": 300,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "events": {
                  "onhover": {
                      "enable": false
                  },
                  "onclick": {
                      "enable": false
                  },
                  "resize": false
              }
          },
          "retina_detect": true
      });
  }
  document.head.append(script);
});

// Export functions for testing
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;

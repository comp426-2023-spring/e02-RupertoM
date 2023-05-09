import { rps, rpsls } from './rpsls.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('game-type').addEventListener('change', updateShots);
  document.getElementById('opponent-choice').addEventListener('change', showShots);
  document.getElementById('play-button').addEventListener('click', playGame);
});

function showShots() {
    console.log("showShots called");
    const gameType = document.getElementById('game-type').value;
    const opponentChoice = document.getElementById('opponent-choice').value;
    const playButton = document.getElementById('play-button');
    const shotSelect = document.getElementById('shot');
    let shots = [];

    if (gameType === 'rps') {
        shots = ['rock', 'paper', 'scissors'];
    } else if (gameType === 'rpsls') {
        shots = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    }

    if (opponentChoice === 'opp') {
        console.log("showShots called");
        shotSelect.innerHTML = '';
        for (const s of shots) {
            const option = document.createElement('option');
            option.value = s;
            option.textContent = s.charAt(0).toUpperCase() + s.slice(1);
            shotSelect.appendChild(option);
        }
        document.querySelector('.shot-choice').style.display = 'block';
    } else {
        document.querySelector('.shot-choice').style.display = 'none';
        shotSelect.innerHTML = '';
    }

    if (gameType && opponentChoice) {
        playButton.disabled = false;
    } else {
        playButton.disabled = true;
    }
}

function updateShots() {
    const gameType = document.getElementById('game-type').value;
    const shotSelect = document.getElementById('shot');
    let shots = [];

    if (gameType === 'rps') {
        shots = ['rock', 'paper', 'scissors'];
    } else if (gameType === 'rpsls') {
        shots = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    }

    shotSelect.innerHTML = '';
    for (const s of shots) {
        const option = document.createElement('option');
        option.value = s;
        option.textContent = s.charAt(0).toUpperCase() + s.slice(1);
        shotSelect.appendChild(option);
    }
    showShots();
}

async function sendPlayCallWith(gameType, playerShot) {
    try {
      const response = await fetch(`/app/play/${gameType}/${playerShot}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
}

async function sendPlayCallWithout(gameType) {
  try {
    const response = await fetch(`/app/play/${gameType}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
  
async function playGame() {
    console.log("game played")
    const opponent = document.getElementById('opponent-type').value;
    const game = document.getElementById('game-type').value;
    let gameResult;
    if(opponent == "with") {
        const playerShot = document.getElementById('shot').value;
        gameResult = await sendPlayCallWith(game, playerShot);
    } else {
        gameResult = await sendPlayCallWithout(game);
    }
    localStorage.setItem('gameResult', JSON.stringify(gameResult));
  }
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('game-type').addEventListener('change', updateShots);
  document.getElementById('opponent-choice').addEventListener('change', showShots);
  document.getElementById('play-button').addEventListener('click', playGame);
});

function showShots() {
    const gameType = document.getElementById('game-type').value;
    const opponentChoice = document.getElementById('opponent-choice').value;
    const playButton = document.getElementById('play-button');

    if (gameType && opponentChoice) {
        console.log("showShots called");
        playButton.disabled = false;
        if(opponentChoice == "opp") {
            document.querySelector('.shot-choice').style.display = 'block';
        }
    } else {
        document.querySelector('.shot-choice').style.display = 'none';
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

async function sendOppShot(gameType, playerShot) {
    try {
      const response = await fetch(`/app/play/${gameType}/${playerShot}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
}

async function sendNoOppShot(gameType) {
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
    const opponent = document.getElementById('opponent-choice').value;
    const game = document.getElementById('game-type').value;
    let gameResult;
    if(opponent == "opp") {
        const playerShot = document.getElementById('shot').value;
        gameResult = await sendOppShot(game, playerShot);
    } else {
        gameResult = await sendNoOppShot(game);
    }
    localStorage.setItem('gameResult', JSON.stringify(gameResult));
  }
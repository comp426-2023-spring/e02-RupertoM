try {
    const gameResult = JSON.parse(localStorage.getItem('gameResult'));
    console.log(gameResult);

    const randomShotElem = document.getElementById('random-shot');
    const playerShotElem = document.getElementById('player-shot');
    const opponentShotElem = document.getElementById('opponent-shot');
    const gameResultElem = document.getElementById('game-result');

    randomShotElem.textContent = gameResult.player;
    playerShotElem.textContent = gameResult.player;
    opponentShotElem.textContent = gameResult.opponent;
    gameResultElem.textContent = gameResult.result;

    const opponentLineElem = document.getElementById('opponent-line');
    const resultLineElem = document.getElementById('result-line');
    const playerLineElem = document.getElementById('player-line');
    const randomLineElem = document.getElementById('random-line');

    if (!gameResult.opponent) {
        opponentLineElem.hidden = true;
        resultLineElem.hidden = true;
        playerLineElem.hidden = true;
    } else {
        randomLineElem.hidden = true;
    }
} catch (error) {
    console.error('Error displaying results:', error);
}
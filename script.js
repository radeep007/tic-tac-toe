const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const winnerPopup = document.getElementById('winnerPopup');
const startGameButton = document.getElementById('startGameButton');
const boardContainer = document.getElementById('boardContainer');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
startGameButton.addEventListener('click', startGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== null || checkWinner()) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#ff6b6b' : '#6b6bff';

    if (checkWinner()) {
        showWinner(currentPlayer);
    } else if (gameState.every(cell => cell !== null)) {
        showWinner('Draw');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function showWinner(winner) {
    winnerPopup.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} Wins!`;
    winnerPopup.style.display = 'block';
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#333';
    });
    winnerPopup.style.display = 'none';
    currentPlayer = 'X';
}

function startGame() {
    document.querySelector('.start-game').style.display = 'none';
    boardContainer.style.display = 'flex';
}

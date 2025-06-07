const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

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

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (!gameBoard[index] && !isGameOver) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                message.textContent = `${currentPlayer} wins!`;
                isGameOver = true;
            } else if (gameBoard.every(cell => cell !== '')) {
                message.textContent = "It's a draw!";
                isGameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

// Check for winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
    });
}

// Restart the game
restartButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
});

// assign status display from DOM to variable
let statusDisplay = document.querySelector('.gameStatus');

// assign state of game, active player x turn and empty cells
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// declare messages for win, draw and current player
let winningMessage = () => `Player ${currentPlayer} has won!`;
let drawMessage = () => `The game ended in a draw!`;
let currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// display the current player
statusDisplay.innerHTML = currentPlayerTurn();

// declare the winning combinations according to the cells
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// function to handle the cell getting clicked and assign the proper player
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// function to handle change of player's turn
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// function to see if game has been won
function handleResultValidation() {
    let roundWon = false;
    // there are 7 winning combination indices. We iterate through each
    for (let i = 0; i <= 7; i++) {
        let winCondition = winningConditions[i];
        // check each of the combinations via index within index (index[i])
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        // if there is an empty cell, continue
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // if all three are marked the same player, that player has won
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    // if round won, display winner message and change status to inactive
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    // if draw, (no empty cell) display draw message and change status to inactive
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // invoke change player function
    handlePlayerChange();
}

// function that upon cell click, targets the cell that is clicked and gets the cell index
function handleCellClick(clickedCellEvent) {
    let clickedCell = clickedCellEvent.target;
    let clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // invoke assign player to cell upon click function
    handleCellPlayed(clickedCell, clickedCellIndex);
    // invoke function that checks if there is a winner
    handleResultValidation();
}


// function to restart the game. Reset cells, player x turn and active game status
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// add event listeners to the cells and the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.gameRestart').addEventListener('click', handleRestartGame);


//Adding x and circle classes
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"

//Declaring winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

//Declaring data attributes and classes
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageElement = document.getElementById("winningMessage")
const restartButton = document.getElementById("restart")
const winImage = document.getElementById("winImage")
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
)
let circleTurn

//Start game as soon as the page loads
startGame()

//Adding an event listener to restart button to start the game again
restartButton.addEventListener("click", startGame)

//Creating startGame function
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener("click", userClick)
    cell.addEventListener("click", userClick, { once: true })
  })
  hoverTurns()
  winningMessageElement.classList.remove("show")
  winImage.classList.remove("show")
}

//Check whether the user clicks and also handle that whose turn it is
function userClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    hoverTurns()
  }
}

//Check for winner. If none then draw match and restart
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML =
      "Draw"
      winningMessageElement.classList.add("show")
  } else {
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
    winningMessageTextElement.innerHTML = `${
      circleTurn
        ? "O"
        : "X"
    } wins!`
    winImage.classList.add("show")
    winningMessageElement.classList.add("show")
  }
  // winningMessageElement.classList.add("show")
}

//Checking where the user actually clicks
function isDraw() {
  return [...cellElements].every(cell => {
    return (
      cell.classList.contains(X_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS)
    )
  })
}

//Add X or O to the cell clicked
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//Change Turns
function swapTurns() {
  circleTurn = !circleTurn
}

//Shows whose turn when hovering over cell
function hoverTurns() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

//Check to find a winning combination
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combinations => {
    return combinations.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

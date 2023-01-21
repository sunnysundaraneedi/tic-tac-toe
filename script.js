const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = Array.from(document.getElementsByClassName("cell"));
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById(
  "winning-message-text"
);
let circleTurn;
const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const swapTurns = () => {
  circleTurn = !circleTurn;
};

const setBoardHoverClass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
};

const checkWin = (currentClass) => {
  return WINNING_COMBINATION.some((combo) => {
    return combo.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

const isDraw = () => {
  return cellElements.every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
};

const endGame = (draw) => {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${
      circleTurn ? "O's " : "X's "
    } Win!`;
  }
  winningMessage.classList.add("show");
};

const clickHandler = (event) => {
  const cell = event.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
};

const startGame = () => {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", clickHandler);
    cell.addEventListener("click", clickHandler, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
};
restartButton.addEventListener("click", startGame);

startGame();

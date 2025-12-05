let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => makeMove(index));
    boardElement.appendChild(div);
  });
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;
  board[index] = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  renderBoard();
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusElement.textContent = `Jugador ${board[a]} gana!`;
      gameActive = false;
      updateScore(board[a]);
      saveResult(board[a]);
      return;
    }
  }
  if (!board.includes("")) {
    statusElement.textContent = "Empate!";
    gameActive = false;
    updateScore("Empate");
    saveResult("Empate");
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = "";
  renderBoard();
}

function updateScore(winner) {
  if (winner === "X") scoreX++;
  else if (winner === "O") scoreO++;
  else scoreDraw++;

  document.getElementById("scoreX").textContent = scoreX;
  document.getElementById("scoreO").textContent = scoreO;
  document.getElementById("scoreDraw").textContent = scoreDraw;
}

renderBoard();

// Guardar resultado en BD
function saveResult(winner) {
  fetch("/save", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ winner })
  });
}
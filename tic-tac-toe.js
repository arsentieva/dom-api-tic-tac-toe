window.addEventListener("DOMContentLoaded", (event) => {
  //   let counter = 0;
  let currentPlayer = "X";
  let boardSymbols = ["", "", "", "", "", "", "", "", ""];
  let gameWon = false;

  const board = document.getElementById("tic-tac-toe-board");
  board.addEventListener("click", (event) => {
    if (event.target.id === "X" || event.target.id === "O") {
      return;
    }
    if (currentPlayer === "X") {
      createImage("./image/player-x.svg", event.target.id);
      checkStatus();
      currentPlayer = "O";
    } else {
      createImage("./image/player-o.svg", event.target.id);
      checkStatus();
      currentPlayer = "X";
    }
  });

  function createImage(path, id) {
    const img = document.createElement("img");
    img.setAttribute("src", path);
    img.setAttribute("id", currentPlayer);
    let targetDiv = document.getElementById(id);
    populateBoardSymbols(id);
    targetDiv.appendChild(img);
  }

  function populateBoardSymbols(box) {
    let index = box.charAt(box.length - 1);
    boardSymbols[index] = currentPlayer;
    console.log(boardSymbols);
    rowCheck(boardSymbols);
    columnsCheck(boardSymbols);
    diagonalCheck(boardSymbols);
  }

  function rowCheck(array) {
    for (let i = 0; i <= array.length; i += 3) {
      if (
        array[i] === currentPlayer &&
        array[i] === array[i + 1] &&
        array[i + 1] === array[i + 2]
      ) {
        gameWon = true;
      }
    }
  }

  function diagonalCheck(array) {
    if (
      (array[0] === currentPlayer &&
        array[0] === array[4] &&
        array[4] === array[8]) ||
      (array[2] === currentPlayer &&
        array[2] === array[4] &&
        array[4] === array[6])
    ) {
      gameWon = true;
    }
  }

  function columnsCheck(array) {
    for (let i = 0; i < 3; i++) {
      if (
        array[i] === currentPlayer &&
        array[i] === array[i + 3] &&
        array[i + 3] === array[i + 6]
      ) {
        gameWon = true;
      }
    }
  }

  function checkStatus() {
    if (gameWon) {
      let h1 = document.getElementById("game-status");
      let status = `Player ${currentPlayer} won`;
      h1.innerHTML = status;
    }
  }
});

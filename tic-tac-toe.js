let h1 = document.getElementById("game-status");
const board = document.getElementById("tic-tac-toe-board");

//get the first button by the "button" tag
let newGameBtn = document.getElementsByTagName("button")[0];
newGameBtn.id = "new-game";
let giveUpBtn = document.getElementsByTagName("button")[1];
giveUpBtn.id = "give-up";

function intialState() {
  currentPlayer = "X";
  boardSymbols = ["", "", "", "", "", "", "", "", ""];
  gameWon = false;
  h1.innerHTML = "";
  giveUpBtn.disabled = true;
  isFull = false;
  inProgress = false;
}

intialState();

window.addEventListener("DOMContentLoaded", (event) => {
  board.addEventListener("click", (event) => {
    if (event.target.id === "X" || event.target.id === "O" || gameWon) {
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

    toggleNewGameBntStatus();
    toggleGiveUpBtnStatus();
  });

  function createImage(path, id) {
    const img = document.createElement("img");
    img.setAttribute("src", path);
    img.setAttribute("id", currentPlayer);
    let targetDiv = document.getElementById(id);
    populateBoardSymbols(id);
    targetDiv.appendChild(img);
  }

  function populateBoardSymbols(div) {
    let index = div.charAt(div.length - 1);
    boardSymbols[index] = currentPlayer;
    inProgress = true;
    boardCheck();
  }

  function boardCheck() {
    if (boardFull(boardSymbols)) {
      gameWon = undefined;
    } else {
      rowCheck(boardSymbols);
      columnsCheck(boardSymbols);
      diagonalCheck(boardSymbols);
    }
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
    let status = "";
    if (gameWon === undefined) {
      status = "Winner: NONE";
    } else if (gameWon) {
      status = `Player ${currentPlayer} Won!!!`;
    }
    h1.innerHTML = status;
  }
  function boardFull(array) {
    isFull = array.every(function (index) {
      return index !== "";
    });
    return isFull;
  }

  function toggleNewGameBntStatus() {
    if (gameWon === undefined || gameWon) {
      newGameBtn.disabled = false;
    } else {
      newGameBtn.disabled = true;
    }
  }
  toggleNewGameBntStatus();

  function toggleGiveUpBtnStatus() {
    if (inProgress) {
      giveUpBtn.disabled = false;
    } else {
      giveUpBtn.disabled = true;
    }
  }

  function resetBoard() {
    intialState();

    const squareDivs = document.querySelectorAll(".square ");
    squareDivs.forEach((div) => {
      let child = div.firstChild;
      if (child) {
        div.removeChild(child);
      }
    });
    toggleNewGameBntStatus();
  }
  newGameBtn.addEventListener("click", resetBoard);

  function giveUp() {
    gameWon = true;
    let winner = "X";
    if (currentPlayer === "X") {
      winner = "O";
    }
    h1.innerHTML = "Winner is : " + winner;
    toggleNewGameBntStatus();
    inProgress = false;
    toggleGiveUpBtnStatus();
  }

  giveUpBtn.addEventListener("click", giveUp);
});

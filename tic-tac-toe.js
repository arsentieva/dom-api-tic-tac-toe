let h1 = document.getElementById("game-status");
const board = document.getElementById("tic-tac-toe-board");

//get the first button by the "button" tag
let newGameBtn = document.getElementsByTagName("button")[0];
newGameBtn.id = "new-game";
let giveUpBtn = document.getElementsByTagName("button")[1];
giveUpBtn.id = "give-up";
const storageKey = "tic-tac-name";
const squareDivs = document.querySelectorAll(".square ");
const savedGame = localStorage.getItem(storageKey);

const backUp = {
  lastPlayer: "",
  board: [],
  storePlayer: function (player) {
    this.lastPlayer = player;
    return this.lastPlayer;
  },
  storeBoard: function (array) {
    this.board = array.slice(0);
    return this.board;
  },
};

loadSavedGame();
function storeProgress() {
  console.log("This was invoked");
  backUp.storePlayer(currentPlayer);
  backUp.storeBoard(boardSymbols);
  console.log(backUp);
  localStorage.setItem(storageKey, JSON.stringify(backUp));
}

function loadSavedGame() {
  console.log(savedGame);
  if (savedGame === null) {
    intialState();
  } else {
    intialState();
    const restoredGame = JSON.parse(savedGame);
    console.log(restoredGame);
    boardSymbols = restoredGame.board;
    boardSymbols.forEach((value, i) => {
      if (value !== "") {
        let currentDiv = squareDivs[i];
        createImage(currentDiv.id, value);
      }
    });
  }
}

function intialState() {
  //if savedGame === null
  currentPlayer = "X";
  boardSymbols = ["", "", "", "", "", "", "", "", ""];
  gameWon = false;
  h1.innerHTML = "";
  giveUpBtn.disabled = true;
  isFull = false;
  inProgress = false;
  //else
  // currentPlayer = backUp.lastPlayer
}

function populateBoardSymbols(div) {
  let index = div.charAt(div.length - 1);
  boardSymbols[index] = currentPlayer;
  inProgress = true;
  boardCheck();
}

intialState();

function createImage(id, player) {
  const img = document.createElement("img");
  let path = `./image/player-${currentPlayer.toLowerCase()}.svg`;
  if (player !== undefined) {
    path = `./image/player-${player.toLowerCase()}.svg`;
  }

  img.setAttribute("src", path);
  img.setAttribute("id", currentPlayer);
  let targetDiv = document.getElementById(id);
  populateBoardSymbols(id);
  targetDiv.appendChild(img);
}

window.addEventListener("DOMContentLoaded", (event) => {
  board.addEventListener("click", (event) => {
    if (event.target.id === "X" || event.target.id === "O" || gameWon) {
      return;
    }
    createImage(event.target.id);
    checkStatus();
    toggleNewGameBntStatus();
    toggleGiveUpBtnStatus();
    storeProgress();
    updatePlayer();
  });

  newGameBtn.addEventListener("click", resetBoard);

  giveUpBtn.addEventListener("click", giveUp);
});

function updatePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
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

toggleNewGameBntStatus();

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

function resetBoard() {
  intialState();

  squareDivs.forEach((div) => {
    let child = div.firstChild;
    if (child) {
      div.removeChild(child);
    }
  });
  toggleNewGameBntStatus();
}

function toggleGiveUpBtnStatus() {
  if (inProgress) {
    giveUpBtn.disabled = false;
  } else {
    giveUpBtn.disabled = true;
  }
}
function toggleNewGameBntStatus() {
  if (gameWon === undefined || gameWon) {
    newGameBtn.disabled = false;
  } else {
    newGameBtn.disabled = true;
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

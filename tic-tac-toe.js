window.addEventListener("DOMContentLoaded", (event) => {
  //   let counter = 0;
  let currentPlayer = "X";
  let boardSymbols = ["", "", "", "", "", "", "", "", ""];
  let gameWon = false;

  const board = document.getElementById("tic-tac-toe-board");
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
    // console.log(gameWon);
    handleNewGameBtn();
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
    // console.log(boardSymbols);
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
    let h1 = document.getElementById("game-status");
    let status = "";
    if (gameWon === undefined) {
      status = "Winner: NONE";
    } else if (gameWon) {
      status = `Player ${currentPlayer} Won!!!`;
    }
    h1.innerHTML = status;
  }
  function boardFull(array) {
    let isFull = array.every(function (index) {
      return index !== "";
    });
    return isFull;
  }

  function handleNewGameBtn() {
    //get the first button by the "button" tag
    let newGameBtn = document.getElementsByTagName("button")[0];
    newGameBtn.id = "new-game";

    if (gameWon === undefined || gameWon) {
      newGameBtn.disabled = false;
    } else {
      newGameBtn.disabled = true;
    }
  }
  handleNewGameBtn();

  // function clearBoard(event) {
  //   console.log("click from clear");
  //   const reset = document.getElementById("new-game");
  //   console.log(reset);
  //   reset.addEventListener("click", (event) => {
  //     console.log("click with in the button event");
  //     boardSymbols = ["", "", "", "", "", "", "", "", ""];
  //     console.log("here in clearBoard");
  //   });
  //   console.log(boardSymbols);
  // }
  // const actions = document.querySelector(".actions");
  // console.log("click from actions");
  // actions.addEventListener("click", (event) => {
  //   clearBoard(event);
  // });

  const reset = document.getElementById("new-game");
  function resetBoard() {
    boardSymbols = ["", "", "", "", "", "", "", "", ""];
  }
  reset.addEventListener("click", resetBoard);

  //
  //now we need a function to reset the board
  //listening for event on button with id new-game
  //we can access that event.target.id
});

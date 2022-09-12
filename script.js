let startGame = document.getElementById("start-game");
let playerOneName = document.getElementById("player-one");
let playerTwoName = document.getElementById("player-two");
let tictactoeOverlay = document.getElementById("tictactoe");
let playerOneDisplay = document.getElementById("p1");
let playerTwoDisplay = document.getElementById("p2");
let winnerDisplay = document.getElementById("winnerName");
let modalCongratsOverlay = document.getElementById("modalCongratsOverlay");
let restart = document.getElementById("restart");

for (let i = 0; i <= 8; i++) {
  document
    .getElementById(i)
    .addEventListener("click", () =>
      displayController.handleClick(gameBoard, i)
    );
}

const playerFactory = (name, sign, currentMarkers) => {
  return { name, sign, currentMarkers };
};

let gameBoard = (function () {
  return {
    0: " ",
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
  };
})();

let gameForm = (function () {
  startGame.addEventListener("click", () => openGame());
  function storeNames() {
    let p1Name = playerOneName.value;
    let p2Name = playerTwoName.value;
    return { p1Name, p2Name };
  }
  function switchDisplay() {
    playerOneDisplay.textContent = "X: " + storeNames()["p1Name"];
    playerTwoDisplay.textContent = "O: " + storeNames()["p2Name"];
    modalStartOverlay.style.display = "none";
    tictactoeOverlay.style.display = "flex";
    let playerTwoType = document.querySelector("input[name=p2-type]:checked");
    return playerTwoType;
  }
  function openGame() {
    storeNames();
    switchDisplay();
  }
  return { switchDisplay };
})();

let displayController = (() => {
  restart.addEventListener("click", () => window.location.reload());
  function checkIsFull(currentBoard) {
    for (let i = 0; i <= 8; i++) {
      if (currentBoard[i] == " ") {
        return false;
      }
    }
    return true;
  }
  let freezeClic = false;
  document.addEventListener(
    "click",
    (e) => {
      if (freezeClic && e.target.className == "child") {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    true
  );
  function checkEnding(currentBoard) {
    let winner = "";
    if (
      currentBoard[0] == currentBoard[1] &&
      currentBoard[1] == currentBoard[2] &&
      currentBoard[0] !== " "
    ) {
      winner = currentBoard[0];
    } else if (
      currentBoard[3] == currentBoard[4] &&
      currentBoard[4] == currentBoard[5] &&
      currentBoard[3] !== " "
    ) {
      winner = currentBoard[3];
    } else if (
      currentBoard[6] == currentBoard[7] &&
      currentBoard[7] == currentBoard[8] &&
      currentBoard[6] !== " "
    ) {
      winner = currentBoard[6];
    } else if (
      currentBoard[0] == currentBoard[4] &&
      currentBoard[4] == currentBoard[8] &&
      currentBoard[0] !== " "
    ) {
      winner = currentBoard[0];
    } else if (
      currentBoard[2] == currentBoard[4] &&
      currentBoard[4] == currentBoard[6] &&
      currentBoard[2] !== " "
    ) {
      winner = currentBoard[2];
    } else if (
      currentBoard[0] == currentBoard[3] &&
      currentBoard[3] == currentBoard[6] &&
      currentBoard[0] !== " "
    ) {
      winner = currentBoard[0];
    } else if (
      currentBoard[1] == currentBoard[4] &&
      currentBoard[4] == currentBoard[7] &&
      currentBoard[1] !== " "
    ) {
      winner = currentBoard[1];
    } else if (
      currentBoard[2] == currentBoard[5] &&
      currentBoard[5] == currentBoard[8] &&
      currentBoard[2] !== " "
    ) {
      winner = currentBoard[2];
    } else if (checkIsFull(currentBoard) == true) {
      winner = "D";
    } else {
      return " ";
    }
    return winner;
  }
  function displayMarkers(gameBoard) {
    for (let i = 0; i <= 8; i++) {
      document.getElementById(i).textContent = gameBoard[i];
    }
  }
  function placeMarker(gameBoard, boxId) {
    let thisMarker = currentMarker();
    gameBoard[boxId] = thisMarker;
    displayMarkers(gameBoard);
    if (checkEnding(gameBoard) != " ") {
      let winnerName = "";
      freezeClic = true;
      checkEnding(gameBoard) == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : checkEnding(gameBoard) == "O"
        ? (winnerName = playerTwoDisplay.textContent.slice(3))
        : (winnerName = "You drew!");
      checkEnding(gameBoard) == "D"
        ? (winnerDisplay.textContent = winnerName)
        : (winnerDisplay.textContent = winnerName + " Won!");
      modalCongratsOverlay.style.display = "flex";
    }
  }
  let markersUsed = ["X"];
  function currentMarker() {
    if (markersUsed[markersUsed.length - 1] == "O") {
      markersUsed.push("X");
      return "O";
    } else if (markersUsed[markersUsed.length - 1] == "X") {
      markersUsed.push("O");
      return "X";
    }
  }
  function handleClick(gameBoard, i) {
    if (gameBoard[i] == " ") {
      displayController.placeMarker(gameBoard, i);
      if (gameForm.switchDisplay().value == "computer") {
        let clickChoice = ai.chooseMove(gameBoard);
        displayController.placeMarker(gameBoard, clickChoice);
        document.getElementById(i).once = false;
      }
    }
  }
  return { handleClick, checkEnding, placeMarker };
})();
let ai = (function () {
  function recursiveScore(boardContents) {
    // list indexes of empty spaces
    let emptyBoxIndex = [];
    for (let i = 0; i <= 8; i++) {
      if (boardContents[i] == " ") {
        emptyBoxIndex.push(i);
      }
    }
    //get whose turn it is
    let currentSign = " ";
    if (emptyBoxIndex.length % 2 == 0) {
      currentSign = "O";
    } else {
      currentSign = "X";
    }
    //base cases
    if (displayController.checkEnding(boardContents) == "O") {
      return 10;
    } else if (displayController.checkEnding(boardContents) == "D") {
      return 0;
    } else if (displayController.checkEnding(boardContents) == "X") {
      return -10;
    } else {
      //go through every possible move and sum the scores
      let filledUpCopy = boardContents;
      if (currentSign == "X") {
        let scores = [];
        for (let i = 0; i <= emptyBoxIndex.length - 1; i++) {
          let val = emptyBoxIndex[i];
          filledUpCopy[val] = currentSign;
          let nextScore = recursiveScore(filledUpCopy);
          scores.push(nextScore);
          filledUpCopy[val] = " ";
        }
        return Math.min(...scores);
      } else if (currentSign == "O") {
        let scores = [];
        for (let i = 0; i <= emptyBoxIndex.length - 1; i++) {
          let val = emptyBoxIndex[i];
          filledUpCopy[val] = currentSign;
          let nextScore = recursiveScore(filledUpCopy);
          scores.push(nextScore);
          filledUpCopy[val] = " ";
        }
        return Math.max(...scores);
      }
    }
  }
  function chooseMove(boardContents) {
    let moveScores = {};
    let emptyBoxIndex = [];
    for (let i = 0; i <= 8; i++) {
      if (boardContents[i] == " ") {
        emptyBoxIndex.push(i);
      }
    }
    for (let i = 0; i <= emptyBoxIndex.length - 1; i++) {
      let filledUpCopy = boardContents;
      let val = emptyBoxIndex[i];
      filledUpCopy[val] = "O";
      moveScores[val] = recursiveScore(filledUpCopy);
      filledUpCopy[val] = " ";
    }
    let moveChoice = emptyBoxIndex[0];
    for (possibleMove in moveScores) {
      if (moveScores[possibleMove] > moveScores[moveChoice]) {
        moveChoice = possibleMove;
      }
    }
    let bestMoves = []
    for(possibleMove in moveScores){
      if(moveScores[possibleMove] == moveScores[moveChoice]){
        bestMoves.push(possibleMove)
      }
    }
    //pick random best move
    return bestMoves[Math.floor(Math.random()*bestMoves.length)];
  }
  return { chooseMove, recursiveScore };
})();

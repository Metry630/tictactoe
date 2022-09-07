let startGame = document.getElementById("start-game");
let playerOneName = document.getElementById("player-one");
let playerTwoName = document.getElementById("player-two");
let tictactoeOverlay = document.getElementById("tictactoe");
let playerOneDisplay = document.getElementById("p1");
let playerTwoDisplay = document.getElementById("p2");
let winnerDisplay = document.getElementById("winnerName");
let modalCongratsOverlay = document.getElementById("modalCongratsOverlay");
let restart = document.getElementById("restart");
for (let i = 1; i <= 9; i++) {
  let divI = document.getElementById(i);
  divI.addEventListener(
    "click",
    () => displayController.handleClick(gameBoard, i),
    { once: true }
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
    console.log(storeNames());
    playerOneDisplay.textContent = "X: " + storeNames()["p1Name"];
    playerTwoDisplay.textContent = "O: " + storeNames()["p2Name"];
    modalStartOverlay.style.display = "none";
    tictactoeOverlay.style.display = "flex";
  }
  function openGame() {
    storeNames();
    switchDisplay();
  }
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
      document.getElementById(i + 1).textContent = gameBoard[i];
    }
  }
  function placeMarker(gameBoard, boxId) {
    let thisMarker = currentMarker();
    gameBoard[boxId - 1] = thisMarker;
    displayMarkers(gameBoard);
    if (checkEnding(gameBoard) != " ") {
      let winnerName = "";
      console.log(checkEnding(gameBoard), " Won");
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
      console.log(markersUsed);
      return "X";
    }
  }
  function handleClick(gameBoard, i) {
    displayController.placeMarker(gameBoard, i);
  }
  return { placeMarker, handleClick, checkEnding };
})();

let ai = (function () {
  function recursiveScore(boardContents, botSign) {
    console.log(botSign);
    console.log(boardContents);
    // list indexes of empty spaces
    let emptyBoxIndex = [];
    for (let i = 0; i <= 8; i++) {
      if (boardContents[i] == " ") {
        emptyBoxIndex.push(i);
        console.log(i);
      }
    }
    //get whose turn it is
    let currentSign = " ";
    if (emptyBoxIndex.length % 2 == 0) {
      currentSign = "O";
    } else {
      currentSign = "X";
    }
    console.log(currentSign);
    //base cases
    if (displayController.checkEnding(boardContents) == botSign) {
      return 10;
    } else if (displayController.checkEnding(boardContents) == "D") {
      return 0;
    } else if (
      displayController.checkEnding(boardContents) == "O" ||
      displayController.checkEnding(boardContents) == "X"
    ) {
      return -10;
    } else {
      //go through every possible move and sum the scores
      let score = 0;
      for (let i = 0; i <= emptyBoxIndex.length - 1; i++) {
        let filledUpCopy = boardContents;
        let val = emptyBoxIndex[i];
        filledUpCopy[val] = currentSign;
        score += recursiveScore(filledUpCopy, botSign);
        filledUpCopy.splice(val, 1, " ");
      }
      return score;
    }
  }
  function chooseMove(boardContents, botSign) {
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
      moveScores[val] = recursiveScore(filledUpCopy, botSign);
      filledUpCopy.splice(val, 1, " ");
    }
    let moveChoice = emptyBoxIndex[0];
    for (possibleMove in moveScores) {
      if (moveScores[possibleMove] >= moveScores[moveChoice]) {
        moveChoice = possibleMove;
      }
    }
    return moveChoice
  }
  return { chooseMove };
})();

//harusnya 20 skornya
console.log(
  ai.chooseMove(["X", "X", " ", "O", "X", " ", "O", "O", " "], "X")
);
//harusnya 10 skornya
console.log(
  ai.chooseMove(["X", "X", " ", "O", "O", "X", "O", "O", "X"], "X")
);

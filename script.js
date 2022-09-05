let startGame = document.getElementById("start-game");
let playerOneName = document.getElementById("player-one");
let playerTwoName = document.getElementById("player-two");
let tictactoeOverlay = document.getElementById("tictactoe");
let playerOneDisplay = document.getElementById("p1");
let playerTwoDisplay = document.getElementById("p2");
let winnerDisplay = document.getElementById("winnerName");
let modalCongratsOverlay = document.getElementById("modalCongratsOverlay");
let restart = document.getElementById("restart");
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
    console.log(currentBoard);
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

for (let i = 1; i <= 9; i++) {
  let divI = document.getElementById(i);
  divI.addEventListener(
    "click",
    () => displayController.handleClick(gameBoard, i),
    { once: true }
  );
}

/*
ending position naikin skor ke smua yg bs reach dia
baru naikin lagi
habis itu naikin sampe ke posisi "awal"
pilih move pertama yang paling tinggi skornya

return value yg dari diri, baru tinggal += bawah
for(all possivle moves){my score += movescore}
*/
let ai = (function () {
  function recursiveCheck(boardContents, currentTurn, botSign) {
    let numBoxesFilled = 0;
    let emptyBoxIndex = [];
    for (let i = 0; i <= 8; i++) {
      if (boardContents[i] != " ") {
        numBoxesFilled += 1;
        emptyBoxIndex.push(i);
      }
    }
    if (numBoxesFilled == 8) {
      let boardCopy = boardContents;
      boardCopy[emptyBoxIndex][0] == botSign;
      displayController.checkEnding(boardCopy);
    }
  }
})();

console.log(gameBoard);

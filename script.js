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
  restart.addEventListener('click', () => window.location.reload())
  function checkIsFull(currentBoard) {
    for (i = 0; i <= 9; i++) {
      if (currentBoard[i] != " ") {
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
    let winnerName = "";
    if (
      currentBoard[0] == currentBoard[1] &&
      currentBoard[1] == currentBoard[2] &&
      currentBoard[0] !== " "
    ) {
      winner = currentBoard[0];
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (
      currentBoard[3] == currentBoard[4] &&
      currentBoard[4] == currentBoard[5] &&
      currentBoard[3] !== " "
    ) {
      winner = currentBoard[3];
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (
      currentBoard[6] == currentBoard[7] &&
      currentBoard[7] == currentBoard[8] &&
      currentBoard[6] !== " "
    ) {
      winner = currentBoard[6];
      console.log(winner, " Won");
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (
      currentBoard[0] == currentBoard[4] &&
      currentBoard[4] == currentBoard[8] &&
      currentBoard[0] !== " "
    ) {
      winner = currentBoard[0];
      console.log(winner, " Won");
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (
      currentBoard[2] == currentBoard[4] &&
      currentBoard[4] == currentBoard[6] &&
      currentBoard[2] !== " "
    ) {
      winner = currentBoard[2];
      console.log(winner, " Won");
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (
      currentBoard[0] == currentBoard[3] &&
      currentBoard[3] == currentBoard[6] &&
      currentBoard[0] !== " "
    ) {
      winner = currentBoard[0];
      console.log(winner, " Won");
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (
      currentBoard[1] == currentBoard[4] &&
      currentBoard[4] == currentBoard[7] &&
      currentBoard[1] !== " "
    ) {
      winner = currentBoard[1];
      console.log(winner, " Won");
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (
      currentBoard[2] == currentBoard[5] &&
      currentBoard[5] == currentBoard[8] &&
      currentBoard[2] !== " "
    ) {
      winner = currentBoard[2];
      console.log(winner, " Won");
      freezeClic = true;
      winner == "X"
        ? (winnerName = playerOneDisplay.textContent.slice(3))
        : (winnerName = playerTwoDisplay.textContent.slice(3));
      winnerDisplay.textContent = winnerName + " Won!";
      modalCongratsOverlay.style.display = "flex";
    } else if (checkIsFull(currentBoard == true)) {
      console.log("draw");
      freezeClic = true;
      winnerDisplay.textContent = "You drew!";
      modalCongratsOverlay.style.display = "flex";
    }
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
    checkEnding(gameBoard);
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
  return { placeMarker, handleClick };
})();

for (let i = 1; i <= 9; i++) {
  let divI = document.getElementById(i);
  divI.addEventListener(
    "click",
    () => displayController.handleClick(gameBoard, i),
    { once: true }
  );
}

console.log(gameBoard[0]);

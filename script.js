const playerFactory = (name, sign, currentMarkers) => {
  return { name, sign, currentMarkers };
};

let playerOne = playerFactory("player one", "X", []);
let playerTwo = playerFactory("player two", "O", []);

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

let displayController = (() => {
  function checkIsFull(currentBoard) {
    for (i = 0; i <= 9; i++) {
      if (currentBoard[i] != " ") {
        return false;
      }
    }
    return true;
  }
  function checkEnding(currentBoard) {
    console.log(currentBoard);
    let winner = ""
    if (
      currentBoard[0] == currentBoard[1] &&
      currentBoard[1] == currentBoard[2] &&
      currentBoard[0] !== " "
    ) {
      winner = currentBoard[0];
      console.log(winner, " Won");
    } else if (
      currentBoard[3] == currentBoard[4] &&
      currentBoard[4] == currentBoard[5] &&
      currentBoard[3] !== " "
    ) {
        winner = currentBoard[3];
        console.log(winner, " Won");
    } else if (
      currentBoard[6] == currentBoard[7] &&
      currentBoard[7] == currentBoard[8] &&
      currentBoard[6] !== " "
    ) {
        winner = currentBoard[6];
        console.log(winner, " Won");
    } else if (
      currentBoard[0] == currentBoard[4] &&
      currentBoard[4] == currentBoard[8] &&
      currentBoard[0] !== " "
    ) {
        winner = currentBoard[0];
        console.log(winner, " Won");
    } else if (
      currentBoard[2] == currentBoard[4] &&
      currentBoard[4] == currentBoard[6] &&
      currentBoard[2] !== " "
    ) {
        winner = currentBoard[2];
        console.log(winner, " Won");
    } else if (
      currentBoard[0] == currentBoard[3] &&
      currentBoard[3] == currentBoard[6] &&
      currentBoard[0] !== " "
    ) {
        winner = currentBoard[0];
        console.log(winner, " Won");
    } else if (
      currentBoard[1] == currentBoard[4] &&
      currentBoard[4] == currentBoard[7] &&
      currentBoard[1] !== " "
    ) {
        winner = currentBoard[1];
        console.log(winner, " Won");
    } else if (
      currentBoard[2] == currentBoard[5] &&
      currentBoard[5] == currentBoard[8] &&
      currentBoard[2] !== " "
    ) {
        winner = currentBoard[2];
        console.log(winner, " Won");
    } else if (checkIsFull(currentBoard == true)) {
      console.log("draw");
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
  let markersUsed = ["O"];
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
  return { placeMarker };
})();

for (let i = 1; i <= 9; i++) {
  let divI = document.getElementById(i);
  divI.addEventListener("click", () =>
    displayController.placeMarker(gameBoard, i)
  );
}

console.log(gameBoard[0]);
console.log(playerOne["currentMarkers"], playerTwo);

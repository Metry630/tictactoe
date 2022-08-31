const playerFactory = (name, sign, currentMarkers) => {
    return { name, sign, currentMarkers }
}

let playerOne = playerFactory("player one", "X", [])
let playerTwo = playerFactory("player two", "O", [])

let gameBoard = (function(){
    let val1 = null;
    let val2 = null;
    let val3 = null;
    let val4 = null;    
    let val5 = null;
    let val6 = null;
    let val7 = null;
    let val8 = null;
    let val9 = null;
    return {
       val1,
       val2,
       val3,
       val4,
       val5,
       val6,
       val7,
       val8,
       val9
    }
})()

let displayController = (() => {
    function checkEnding(currentBoard){
        console.log('Ending checked')
    }
    function placeMarker(gameBoard, currentSign, boxId){
        console.log(currentSign, boxId)
    }
    return { checkEnding, placeMarker }
})()

for(let i = 1; i <= 9; i++){
    let divI = document.getElementById(i);
    divI.addEventListener("click",() => displayController.placeMarker(
        gameBoard,
        'O',
        i
    ))
}

console.log(gameBoard)
console.log(playerOne["currentMarkers"], playerTwo)
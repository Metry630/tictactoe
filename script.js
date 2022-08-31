const playerFactory = (name, sign, currentMarkers) => {
    return { name, sign, currentMarkers }
}

let playerOne = playerFactory("player one", "X", [])
let playerTwo = playerFactory("player two", "O", [])

let gameBoard = (function(){
    return {

    }
})()

let displayController = (() => {
    function checkEnding(currentBoard){
        console.log('Ending checked')
    }
    function displayMarkers(gameBoard){
        for(let i = 0; i <= 8; i++){
            document.getElementById(i + 1).textContent = gameBoard[i]
        }
    }
    function placeMarker(gameBoard, boxId){
        let thisMarker = currentMarker()
        gameBoard[boxId - 1] = thisMarker;
        displayMarkers(gameBoard)
    }
    let markersUsed = ['O']
    function currentMarker(){
        if(markersUsed[markersUsed.length - 1] == 'O'){
            markersUsed.push('X')
            console.log(markersUsed)
            return 'O'
        }else if(markersUsed[markersUsed.length - 1] == 'X'){
            markersUsed.push('O')
            console.log(markersUsed)
            return 'X'
        }
    }
    return { checkEnding, placeMarker }
})()

for(let i = 1; i <= 9; i++){
    let divI = document.getElementById(i);
    divI.addEventListener("click",() => displayController.placeMarker(
        gameBoard,
        i
    ))
}

console.log(gameBoard[0])
console.log(playerOne["currentMarkers"], playerTwo)
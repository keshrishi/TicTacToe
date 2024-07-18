const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gamegrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game

function initGame(){
    currPlayer = "X";
    gamegrid = [ "", "" , "" , "" , "" , "" , "" , "",""];
    boxes.forEach((box ,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // remove green

        box.classList = `box box${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();
function swapTurn(){
    if(currPlayer === "X"){
        currPlayer = "O";
    } else {
        currPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}
function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        if( gamegrid[position[0]] !== "" && gamegrid[position[1]] !== "" && gamegrid[position[2]] !== "" 
            &&(gamegrid[position[0]] === gamegrid[position[1]])&&(gamegrid[position[1]] === gamegrid[position[2]]))
        {
            if(gamegrid[position[0]] === "X"){
                answer = "X";
            } else {
                answer = "O";
            }
            // disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if( answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // when there is no winner or Tied
    let fillCount = 0;
    gamegrid.forEach((box) => {
        if( box !== ""){
            fillCount++;
        }
    });
    if(fillCount === 9){
        gameInfo.innerText = `Game Tied!`;
        newGameBtn.classList.add("active");

    }

}
function handleClick(index) {
    if( gamegrid[index] === ""){
        boxes[index].innerText = currPlayer;
        gamegrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn(); 

        checkGameOver();
    }
}
boxes.forEach((box,index) => {      // if we write arrow function, and write index it automatically generates indexes,
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
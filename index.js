const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");
let currentplayer;
let gamegrid;

const winningpositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function init(){
    currentplayer = 'X';
    gamegrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";  // Corrected this line
        box.classList = `box box${index+1}`; 
    });
    newgamebtn.classList.remove("active");
    gameinfo.innerText = `CURRENT PLAYER - ${currentplayer}`;
}

init();

function swapturn(){
    currentplayer = (currentplayer === 'X') ? 'O' : 'X';
    gameinfo.innerText = `CURRENT PLAYER - ${currentplayer}`;
}

function checkgameover(){
    let answer = "";

    winningpositions.forEach((pos) => {
        if((gamegrid[pos[0]] !== "" && gamegrid[pos[1]] !== "" && gamegrid[pos[2]] !== "") &&
           (gamegrid[pos[0]] === gamegrid[pos[1]] && gamegrid[pos[1]] === gamegrid[pos[2]])) {  // Fixed condition
            answer = gamegrid[pos[0]];

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });

    if(answer !== ''){
        gameinfo.innerText = `WINNER PLAYER ${answer}`;
        newgamebtn.classList.add("active");
        return;
    }

    let fillcount = 0;
    gamegrid.forEach((box) => {
        if(box !== ""){
            fillcount++;
        }
    });

    if(fillcount === 9){
        gameinfo.innerText = "Game Tied!";
        newgamebtn.classList.add("active");
    }
}

function clickhandler(index){
    if(gamegrid[index] === ""){
        gamegrid[index] = currentplayer;
        boxes[index].innerText = currentplayer;
        boxes[index].style.pointerEvents = "none";
        swapturn();
        checkgameover();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        clickhandler(index);
    });
});

newgamebtn.addEventListener("click", init);

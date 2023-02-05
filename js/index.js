//Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3")
const gameOverSound = new Audio("gameover.mp3")
const moveSound = new Audio("move.mp3")
const musicSound = new Audio("music.mp3")

let speed = 5
let score = 0
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
let food = { x: 3, y: 4 }
let isPaused = true



        //Game functions
        function main(ctime) {
            window.requestAnimationFrame(main)
            // console.log(ctime/1000)
            if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
                return;
            }
            lastPaintTime = ctime
            // console.log(ctime)
            if(isPaused){
                // musicSound.pause()
                gameEngine()
            }
        }
    

function isCollide(snake) {

    for (let j = 1; j < snake.length; j++) {
        if ((snake[0].x === snake[j].x) && (snake[0].y === snake[j].y)) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;

    }

}

function gameEngine() {
    // musicSound.play()
    let board = document.getElementById("board")

    //#############
    //UPDATING SNAKE ARRAY
    // ##############
    if (isCollide(snakeArr)) {
        gameOverSound.play()
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        alert("game over press any key to play again")
        snakeArr = [{ x: 13, y: 15 }]
        // musicSound.play()
        // scoreBox.innnerHTML="Score: 0"
    }
    //if u have eaten the food increase the score and regenerate the food
    if ((snakeArr[0].x === food.x) && (snakeArr[0].y === food.y)) {
        foodSound.play()
        score += 1;
        if (score > hiscoreVal) {
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal))
            hiscoreBox.innerHTML = "Hi Score: " + hiscoreVal;
        }
        scoreBox.innerHTML = "score:" + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y


    //part2
    //displaying snake and food
    //displaying the snake
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x

        if (index === 0) {

            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)


        //displaying the food
        let foodElement = document.createElement("div")
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add("food")
        board.appendChild(foodElement)
    })
}




//game logic
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreVal = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal))
}
else {
    hiscoreVal = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "Hi Score: " + hiscore;
}
console.log(hiscoreVal)

window.requestAnimationFrame(main)


//#####################
//EVENT LISTENER
//####################
document.addEventListener("keydown", e => {
    // inputDir = { x: 0, y: 1 }
    // moveSound.play()
    console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow up")
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play()
            musicSound.play()

            break;

        case "ArrowDown":
            console.log("arrow Down")
            inputDir.x = 0;
            inputDir.y = 1;
            musicSound.play()
            moveSound.play()
            break;

        case "ArrowLeft":
            console.log("arrow Left")
            inputDir.x = -1;
            inputDir.y = 0;
            moveSound.play()
            musicSound.play()
            break;

        case "ArrowRight":
            console.log("arrow uRight")
            inputDir.x = 1;
            inputDir.y = 0;
            moveSound.play()
            musicSound.play()
            break;
        case "p":
            // toggleCase
            isPaused=!isPaused

            break;
    }
})
const canvas = document.getElementById("board")
const scoreE = document.getElementById("score")
const context = canvas.getContext("2d")

const blockSize = 25
const rows = 25
const cols = 25
canvas.height = rows * blockSize
canvas.width = cols * blockSize

let score = 0

let snakeX = blockSize * 5
let snakeY = blockSize * 5
let velocityX = 0
let velocityY = 0
let foodX, foodY

const snakeBody = []
let gameOver = false
document.addEventListener("keyup", changeDirection)
placeFood()

const gameloop = setInterval(animate, 1000 / 18)
function animate() {
  if (gameOver == true) {
    alert("Game Over")
    clearInterval(gameloop)
  }

  if (
    snakeX < 0 ||
    snakeX > canvas.width ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY]
  }

  context.fillStyle = "black"
  context.fillRect(0, 0, canvas.height, canvas.width)

  context.fillStyle = "red"
  context.fillRect(foodX, foodY, blockSize, blockSize)

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY])
    score++
    scoreE.innerText = `Score : ${score}`
    placeFood()
  }

  context.fillStyle = "lime"
  snakeX += velocityX * blockSize
  snakeY += velocityY * blockSize
  context.fillRect(snakeX, snakeY, blockSize, blockSize)

  for (let i = 0; i < snakeBody.length; i++) {
    i
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0
    velocityY = -1
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0
    velocityY = 1
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1
    velocityY = 0
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1
    velocityY = 0
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize
  foodY = Math.floor(Math.random() * rows) * blockSize
}

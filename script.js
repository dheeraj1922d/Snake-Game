const board = document.getElementById("board");
let snakeDir = { x: 0, y: 0 };
let speed = 5;
let lastPaintingTime = 0;
let score = 0;
let snakeArray = [{ x: 16, y: 16 }];

let food = { x: 9, y: 9 };
var foodX;
var foodY;

//game function
const main = (ctime) => {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintingTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintingTime = ctime;
  gameEngine();
};

function isCollide(sarr) {
  //check if snake bite itself
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y) {
      return true;
    }
  }

  //check if snake goes outof the board
  if (sarr[0].x < 0 || sarr[0].x > 18 || sarr[0].y < 0 || sarr[0].y > 18) {
    return true;
  }

  return false;
}

function generateFood() {
  let a = 2;
  let b = 16;
  foodX = Math.round(a + (b - a) * Math.random());
  foodY = Math.round(a + (b - a) * Math.random());
  for (let i = 1; i < snakeArray.length; i++) {
    if (foodX === snakeArray[i].x && foodY === snakeArray[i].y) {
      generateFood();
    }
  }
  return;
}

//gameEngine
function gameEngine() {
  // part1:Updating snake and food
  //update food
  //if snake eat the food then regenerate the food at random place and increament the score
  if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
    score += 1;

    snakeArray.unshift({
      x: snakeArray[0].x + snakeDir.x,
      y: snakeArray[0].y + snakeDir.y,
    });

    generateFood();

    food = {
      x: foodX,
      y: foodY,
    };
  }

  //moving snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += snakeDir.x;
  snakeArray[0].y += snakeDir.y;

  //if collide
  if (isCollide(snakeArray)) {
    snakeDir = { x: 0, y: 0 };
    alert("Game over!!! Press any key to Play Again");
    snakeArray = [{ x: 16, y: 16 }];
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //part2: Displaying snake and food
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic of the game
window.requestAnimationFrame(main);

//change snake direction
document.addEventListener("keydown", (e) => {
  snakeDir = { x: 0, y: -1 }; //start the game

  switch (e.key) {
    case "ArrowUp":
      snakeDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      snakeDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      snakeDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      snakeDir = { x: 1, y: 0 };
      break;

    default:
      break;
  }
});

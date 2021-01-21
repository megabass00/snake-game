import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
import { getValues, setScore } from './settings.js'

let food = getRandomFoodPosition()

export function update() {
  if (onSnake(food)) {
    const { snakeExpansion, snakeSpeed } = getValues()
    expandSnake(snakeExpansion)
    setScore(snakeExpansion * snakeSpeed)
    food = getRandomFoodPosition()
  }
}

export function draw(gameBoard) {
  const { foodColor, foodType } = getValues()
  const foodElement = document.createElement('i')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('fas')
  foodElement.classList.add(`fa-${foodType}`)
  foodElement.classList.add('food')
  foodElement.style.color = foodColor;
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}
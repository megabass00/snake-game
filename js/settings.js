import { 
    SNAKE_EXPANSION,
    SNAKE_SPEED,
    SNAKE_COLOR, 
    FOOD_COLOR, 
    FOOD_TYPES_DATA, 
    FOOD_TYPE 
} from './config.js'

let score, scoreSpan, currentHighScore
let currentSnakeExpansion
let currentSnakeSpeed
let currentSnakeColor
let currentFoodColor
let currentFoodType = FOOD_TYPE
const settingsContainer = document.getElementById('settings')

export function drawSettings() {
    const { 
        snakeExpansion,
        snakeColor,
        snakeSpeed,
        foodColor,
        foodType,
        highScore
    } = getSettings()

    /* Title */
    const title = document.createElement('h2')
    title.innerHTML = 'SETTINGS'
    title.style.width = '100%'
    settingsContainer.appendChild(title)


    /* User Score */
    scoreSpan = document.createElement('span')
    scoreSpan.style.fontSize = '1.8em'
    scoreSpan.style.fontWeight = 'bold'
    scoreSpan.innerHTML = score = 0
    const scoreRow = generateRow('Score', scoreSpan)
    settingsContainer.appendChild(scoreRow)


    /* Snake Velocity */
    const snakeSpeedInput = document.createElement('input')
    snakeSpeedInput.setAttribute('type', 'number')
    snakeSpeedInput.style.width = '35px'
    snakeSpeedInput.value = currentSnakeSpeed = snakeSpeed
    const speedInputRow = generateRow('Speed', snakeSpeedInput)
    settingsContainer.appendChild(speedInputRow)
    snakeSpeedInput.addEventListener('input', (e) => {
        currentSnakeSpeed = parseInt(e.target.value)
        saveSettings()
    })


    /* Snake Expansion */
    const snakeExpansionInput = document.createElement('input')
    snakeExpansionInput.setAttribute('type', 'number')
    snakeExpansionInput.style.width = '35px'
    snakeExpansionInput.value = currentSnakeExpansion = snakeExpansion
    const snakeExpansionRow = generateRow('Snake Grow', snakeExpansionInput)
    settingsContainer.appendChild(snakeExpansionRow)
    snakeExpansionInput.addEventListener('input', (e) => {
        currentSnakeExpansion = parseInt(e.target.value)
        saveSettings()
    })


    /* Snake Color */
    const pickerOptions = {
        popup: 'top',
        alpha: false,
    }
    
    const snakePickerColor = document.createElement('div')
    snakePickerColor.className = 'color-picker'
    snakePickerColor.style.backgroundColor = snakeColor
    const snakePickerRow = generateRow('Snake Color', snakePickerColor)
    settingsContainer.appendChild(snakePickerRow)
    new Picker({
        ...pickerOptions,
        parent: snakePickerColor,
        color: snakeColor,
        onChange: (color) => {
            snakePickerColor.style.backgroundColor = currentSnakeColor = color.hex
            saveSettings()
        }
    })


    /* Food Types */
    const foodTypeSelect = document.createElement('select')
    const foodTypeRow = generateRow('Food Type', foodTypeSelect)
    settingsContainer.appendChild(foodTypeRow)
    Object.keys(FOOD_TYPES_DATA).map(key => foodTypeSelect.options.add(new Option(FOOD_TYPES_DATA[key], key)))
    foodTypeSelect.value = currentFoodType = foodType
    foodTypeSelect.addEventListener('change', (e) => {
        currentFoodType = e.target.value
        saveSettings()
    })


    /* Food Color */
    const foodPickerColor = document.createElement('div')
    foodPickerColor.className = 'color-picker'
    foodPickerColor.style.backgroundColor = foodColor
    const foodColorRow = generateRow('Food Color', foodPickerColor)
    settingsContainer.appendChild(foodColorRow)
    new Picker({
        ...pickerOptions,
        parent: foodPickerColor,
        color: foodColor,
        onChange: (color) => {
            foodPickerColor.style.backgroundColor = currentFoodColor = color.hex
            saveSettings()
        }
    })

    /* High Score */
    const highScoreSpan = document.createElement('span')
    highScoreSpan.style.fontSize = '1.2em'
    highScoreSpan.innerHTML = currentHighScore = highScore
    const highScoreRow = generateRow('Highest Score', highScoreSpan)
    settingsContainer.appendChild(highScoreRow)

    saveSettings()
}

function generateRow(labelText, control) {
    const row = document.createElement('div')
    row.className = 'settings-row'
    const label = document.createElement('label')
    label.className = 'settings-label'
    label.innerHTML = labelText
    row.appendChild(label)
    row.appendChild(control)
    return row
}

export function getValues() {
    return {
        foodType: currentFoodType,
        foodColor: currentFoodColor,
        snakeExpansion: currentSnakeExpansion,
        snakeColor: currentSnakeColor,
        snakeSpeed: currentSnakeSpeed,
        highScore: currentHighScore
    }
}

export function setScore(newScore) {
    score += parseInt(newScore)
    scoreSpan.innerHTML = score
    if (score > currentHighScore) {
        currentHighScore = score
        saveSettings()
    }
}

function saveSettings() {
    const settings = {
        foodType: currentFoodType,
        foodColor: currentFoodColor,
        snakeExpansion: currentSnakeExpansion,
        snakeColor: currentSnakeColor,
        snakeSpeed: currentSnakeSpeed,
        highScore: currentHighScore
    }
    localStorage.setItem('snake-settings', JSON.stringify(settings))
}

function getSettings() {
    const oldSettings = JSON.parse(localStorage.getItem('snake-settings'))
    if (oldSettings) return oldSettings
    return { 
        snakeExpansion: SNAKE_EXPANSION,
        snakeColor: SNAKE_COLOR,
        snakeSpeed: SNAKE_SPEED,
        foodColor: FOOD_COLOR,
        foodType: FOOD_TYPE,
        highScore: 0
    } 
}
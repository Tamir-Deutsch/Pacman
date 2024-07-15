'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍒'
const STEAK = '🥩'

let gSteakInterval
let gGame
let gBoard

function onInit() {
    resetGame()
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gSteakInterval = setInterval(addSteak, 15000)
    closeModal()
}

function resetGame() {
    gGame = {
        score: 0,
        isOn: true,
        isVictory: false,
        foodCount: 0
    }
    updateScore(0)
}

function buildBoard() {
    const size = 10
    const board = []

    for (let i = 0; i < size; i++) {
        board.push([])

        for (let j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    addPowerFood(board)
    return board
}

function addPowerFood(board) {
    board[1][1] = POWER_FOOD
    board[1][board[0].length - 2] = POWER_FOOD
    board[board.length - 2][1] = POWER_FOOD
    board[board.length - 2][board[0].length - 2] = POWER_FOOD
    gGame.foodCount -= 4
}

function renderBoard(board) {
    let strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function addSteak() {
    let emptyLocation = getEmptyLocation(gBoard)
    if (!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = STEAK
    renderCell(emptyLocation, STEAK)
}

function getEmptyLocation(board) {
    let emptyLocations = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    let randIdx = getRandomInt(0, emptyLocations.length)
    return emptyLocations[randIdx]
}

function checkVictory() {
    if (gGame.foodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gGhostsInterval)
    clearInterval(gSteakInterval)
    gGame.isOn = false
    renderCell(gPacman.location, EMPTY)
    let msg = gGame.isVictory ? 'You Won! Well done!' : 'Game Over'
    openModal(msg)
}

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elMsg = elModal.querySelector('.msg')
    elMsg.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

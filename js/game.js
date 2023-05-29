'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🥩'
const Cherry = '🍒'
var gCherryInterval

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var isVictorious

function onInit() {
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    // console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard)
    gGame.isOn = true

    // gCherryInterval = setInterval(addCherry, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    //super
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
    console.log('board:', board)
    return board
}



function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

// function addCherry() {

// }

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}


function gameOver(isVictorious) {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
    showModal(isVictorious)


    // var elModal = document.querySelector('.modal')
    // elModal.style.display = 'block'

    // // if()
    // var elUserMsg = document.querySelector('.user-msg')
    // elUserMsg.innerText
}

function showModal(isWin) {
    var elUserMsg = document.querySelector('.user-msg')
    if (isWin) {
        elUserMsg.innerText = 'You Won!'
    } else {
        elUserMsg.innerText = 'You Lose!'
    }
    displayElement(true, '.modal')
}

'use strict'

const PACMAN = '😀'
var gPacman
// var foodCollected = 0
var foodLeft = 60

function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log('nextCell:', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver

    if (nextCell === SUPERFOOD) {
        if (!gPacman.isSuper) {
            gPacman.isSuper = true
            changeGhostsColor()
            setTimeout(changeGhostsToOriginal, 5000)
        } else {
            return
        }

    }


    // if (gPacman.isSuper) {
    //     return
    // } else {
    //     gPacman.isSuper = true
    //     changeGhostsColor()
    //     setTimeout(changeGhostsToOriginal, 5000)
    // }

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            isVictorious = false
            gameOver(isVictorious)
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        foodLeft--
        if (foodLeft === 0) {
            isVictorious = true
            gameOver(isVictorious)
        }
    }


    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default: return null
    }

    return nextLocation
}
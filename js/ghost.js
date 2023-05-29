'use strict'

const GHOST = '👻'
const EATABLEGHOST = '🥶'
var gGhosts
var gGhostLocationRandIdx
var gIntervalGhosts
var gRemovedGhosts = []

function createGhost(board) {
    var ghost = {
        id: makeId(),
        location: {
            i: 3,
            j: 3
        },
        // location: randGhostLocationIdx(),
        currCellContent: FOOD,
        ghostEmojiToDisplay: GHOST
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    // console.log('gGhosts:', gGhosts)

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location:', ghost.location)
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        isVictorious = false
        gameOver(isVictorious)
        return
    }

    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location:
    // update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // update the DOM
    renderCell(ghost.location, ghost.ghostEmojiToDisplay)
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

// function getGhostHTML(ghost) {
//     return `<span style="color:blue">${GHOST}</span>`
// }

// function randGhostLocationIdx() {
//     var randIdxI = getRandomIntInclusive(1, 8)
//     var randIdxj = getRandomIntInclusive(1, 8)
//     var ghostRandLocation = {
//         i: randIdxI,
//         j: randIdxj
//     }

//     return ghostRandLocation
// }

function changeGhostsColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        currGhost.ghostEmojiToDisplay = gPacman.isSuper ? EATABLEGHOST : GHOST // 🥶 || 👻
    }
}

function changeGhostsToOriginal() {
    gPacman.isSuper = false
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        currGhost.ghostEmojiToDisplay = GHOST
    }
    backToLife()
}


function killGhost(location) {
    //console.log('location', location)
    for (var i = 0; i < gGhosts.length; i++) {
        var removedGhost = null
        var currGhostLoc = gGhosts[i].location
        if (currGhostLoc.i === location.i && currGhostLoc.j === location.j) {
            removedGhost = gGhosts.splice(i, 1)[0] // splice return [splicedItem] -> [0] -> splicedItem
            //removed ghost -> {ghost}
        }

        // var currGhostCellContent = gGhosts[i].currCellContent
        // if (currGhostCellContent === FOOD) updateScore(1)
    }
    gRemovedGhosts.push(removedGhost)
    // console.log('gGhosts', gGhosts)
}

function backToLife() {
    for (var i = 0; i < gRemovedGhosts.length; i++) {
        var ghostAlive = null
        ghostAlive = gRemovedGhosts.splice(i, 1)[0]
        ghostAlive.ghostEmojiToDisplay = GHOST
    }
    gGhosts.push(ghostAlive)
    // console.log('gGhosts', gGhosts)
}
'use strict'

const GHOST = '👻'
let gGhosts
let gDeadGhosts
let gGhostsInterval

function createGhost(board) {
    let ghost = {
        id: makeId(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (let i = 0; i < 3; i++) {
        createGhost(board)
    }
    gDeadGhosts = []
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (let i = 0; i < gGhosts.length; i++) {
        let ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
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
        if (gPacman.isSuper) return
        gameOver()
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
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomInt(1, 5)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span style="background-color:${color};">${GHOST}</span>`
}

function renderGhosts() {
    for (let i = 0; i < gGhosts.length; i++) {
        let currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
}

function killGhost(location) {
    for (let i = 0; i < gGhosts.length; i++) {
        let currLocation = gGhosts[i].location
        if (currLocation.i === location.i &&
            currLocation.j === location.j) {
            const deadGhost = gGhosts.splice(i, 1)[0]
            checkGhostCellContent(deadGhost)
            gDeadGhosts.push(deadGhost)
        }
    }
}

function checkGhostCellContent(ghost) {
    if (ghost.currCellContent === FOOD) {
        handleFood()
        ghost.currCellContent = EMPTY
        console.log('ghost:', ghost)
    }
}

function reviveGhosts() {
    for (let i = 0; i < gDeadGhosts.length; i++) {
        let currDeadGhost = gDeadGhosts[i]
        gGhosts.push(currDeadGhost)
    }
    gDeadGhosts = []
    // console.log('gDeadGhosts:', gDeadGhosts)
    // console.log('gGhosts:', gGhosts)
}
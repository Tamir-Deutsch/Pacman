'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function displayElement(isShow, selector) { // displayElement(false, '.modal')
    const elModal = document.querySelector(selector)
    // var styleProp = 'none'
    // if(isShow){
    //     styleProp = 'block'
    // }
    // el.style.display = styleProp 
    elModal.style.display = isShow ? 'block' : 'none' // true ? block  , false : none
    // if (isShow) ? ''
}

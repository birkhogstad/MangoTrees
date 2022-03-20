

var marked = 24
var pinsRemaining = 33
var pinsRemoved = 0
var moveFromTile = null
var moveFromTileId = 0

let locations = [7, -7, -1, 1]
let openTiles = []


var multiplier = 1

function generate() {
    let board = document.getElementById("board")
    for (let i = 0; i < 7; i++) {
        console.log("test")
        var row = document.createElement("div")
        row.classList.add("row")
        board.appendChild(row)
        for (let j = 0; j < 7; j++) {
            var tile = document.createElement("button")
            row.appendChild(tile)
            tile.classList.add("tile", "pin")
            tile.id = i * 7 + j
            if ((i <= 1 || i >= 5) && (j <= 1 || j >= 5)) {
                tile.classList.add("white")
                tile.style.visibility = "hidden"
                continue
            }
        }
    }
    document.getElementById(marked).classList.add("marked")

}


//rewrite
function move(dir) {
    var next = 0
    if (dir == 'n') {
        next = -7
    } 
    else if (dir == 's') {
        next = 7
    }
    else if (dir == 'w') {
        if (marked % 7 == 0) {
            return
        }
        next = -1
    }
    else {
        if (marked % 7 == 6) {
            return
        }
        next = 1
    }
    var nextId = marked + next
    if (nextId < 0 || nextId > 49) {
        return
    }

    var nextMarked = document.getElementById(nextId)
    if (nextMarked.classList.contains("white")) {
        return
    }
    document.getElementById(marked).classList.remove("marked")
    nextMarked.classList.add("marked")
    marked = nextId
}



function pinSelected(tile) {
    tile.classList.add("selected")
    moveFromTile = tile
    moveFromTileId = marked
    getPossibleIds().forEach(id => {
        var thisTile = document.getElementById(id)
        thisTile.classList.add("open")
        openTiles.push(thisTile.id)
    });

}


function removePrevious() {
    moveFromTile.classList.remove("selected")
    openTiles.forEach(tile => {
        document.getElementById(tile).classList.remove("open")
    });
    moveFromTile = null
    moveFromTileId = null
    openTiles = []
}


function select() {
    var selectedTile = document.getElementById(marked)
    if (pinsRemoved == 0) {
        selectedTile.classList.remove("pin")
        pinsRemoved++
        pinsRemaining--
        
        return

    }

    if (selectedTile.classList.contains("pin")) {
        if (moveFromTile != null) {
            removePrevious()
        }
        pinSelected(selectedTile)
        return
    }

    if (moveFromTile == null) {
        return
    }

    openTiles.forEach(tile => {
        if (tile == selectedTile.id) {
            moveFromTile.classList.remove("pin", "selected", "open")
            selectedTile.classList.add("pin")
            selectedTile.classList.remove("selected", "open")
            document.getElementById((marked + moveFromTileId)/2).classList.remove("pin")
            pinsRemoved++
            pinsRemaining--

        }
    });
    removePrevious()
    
}



// Rename + change names
function getPossibleIds() {
    var potentialIds = []
    for (let i = 0; i < 4; i++) {
        var pot = marked + (locations[i] * 2)
        if (pot > 0 && pot < 49) {
            
            if (pot % 7 != marked % 7) {
                if (marked % 7 < 2 && i == 2) {
                    continue
                }
                if (marked % 7 > 4 && i == 3) {
                    continue
                }
            }
            
            if (document.getElementById(pot).classList.contains("white") || document.getElementById(pot).classList.contains("pin")) {
                continue
            }
            if (document.getElementById((pot + marked)/2).classList.contains("pin")) {
                potentialIds.push(pot)
            }
        }
    }
    return potentialIds
}



document.onkeydown = function () {
    switch(window.event.keyCode) {
        case 37:
        case 65:
            move('w')
            break
        case 38:
        case 87:
            move('n')
            break
        case 39:
        case 68:
            move('e')
            break
        case 40:
        case 83:
            move('s')
            break        
        case 13:
        case 32:
            select()
            break
        
    }

}
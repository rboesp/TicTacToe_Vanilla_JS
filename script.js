class Tile {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.taken = false;
    }
    take() {
        if(!this.isTaken()){
            this.taken = true
            return true
        }
        return false
    }
    isTaken() {
        return this.taken
    }
}

const tileStates = {
    0: new Tile(0,0),
    1: new Tile(0,1),
    2: new Tile(0,2),
    3: new Tile(1,0),
    4: new Tile(1,1),
    5: new Tile(1,2),
    6: new Tile(2,0),
    7: new Tile(2,1),
    8: new Tile(2,2)
}

const players = [{
    color: 'red'
}, {
    color: 'blue'
}]

const board = document.querySelector('#board')
let currentPlayer = 0

//FUNCTIONS
function markTile(tile, color) {
    tile.setAttribute('style', `background-color: ${color};`)
}

function nextPlayer() {
    return Number(currentPlayer = !currentPlayer)
}

function handleClick(e) {
    if(e.target.className !== 'tiles') return
    const tileState = tileStates[e.target.id]
    const takenTile = tileState.take()
    if(!takenTile) return
    let player = nextPlayer()
    console.log(player);
    console.log(tileState);
    markTile(e.target, players[player].color)
}

//EVENTS
document.addEventListener('click', handleClick)


/*
THOUGHTS:
Use paths to win, if two players have same path to win then delete it
to detect three in a row, think about filling up path to win, when filled p then player that filled it up wins
*/


//ENTRY POINT

//make board
let counter = 0
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        //make tile
        const div = document.createElement("DIV")
        div.setAttribute("class", "tiles")
        div.setAttribute("id", `${counter++}`)

        const h1 = document.createElement('H1')
        h1.textContent = `${i+1},${j+1}`
        div.appendChild(h1)
        board.appendChild(div)
    }
}
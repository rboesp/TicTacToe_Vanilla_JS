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

const players = [{
    color: 'red'
}, {
    color: 'blue'
}]

class GameManager{
    constructor() {
        this.currentPlayer = 0
        this.winner = null
        this.tileStates = {
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
        this.moves = 0
    }

    increaseMoves() {
        this.moves++
    }

    checkForWinner() {
        if(this.moves < 5) return
        //here find three in a row
        return 'blue wins!'
    }

    nextPlayer() {
        return Number(this.currentPlayer = !this.currentPlayer)
    }
}

const board = document.querySelector('#board')
const ticTacToe = new GameManager()
const winnerEl = document.querySelector('#winner')

//FUNCTIONS
function markTile(tile, color) {
    tile.setAttribute('style', `background-color: ${color};`)
}

// function nextPlayer() {
//     return Number(currentPlayer = !currentPlayer)
// }

function handleClick(e) {
    if(e.target.className !== 'tiles') return
    const tile = ticTacToe.tileStates[e.target.id]
    const takenTile = tile.take()
    if(!takenTile) return
    let player = ticTacToe.nextPlayer()
    console.log(player);
    console.log(tile);
    markTile(e.target, players[player].color)
    ticTacToe.increaseMoves()
    const winner = ticTacToe.checkForWinner()
    if(winner) winnerEl.textContent = winner
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
        div.setAttribute("id", `${counter}`)

        const h1 = document.createElement('H1')
        h1.textContent = `${counter++}`
        div.appendChild(h1)
        board.appendChild(div)
    }
}

const pathsToWin = {
    
}
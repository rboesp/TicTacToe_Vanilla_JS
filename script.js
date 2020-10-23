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

class PathManager{
    constructor(playerName) {
        this.playerName = playerName
        this.winner = null
        this.tileStates = {}
        this.moves = 0
        this.paths = { //make a path class, takes in tuples
            0: [[1,2],[3,6],[4,8]],
            1: [[4,7]], 
            2: [[0,1],[5,8],[4,6]],
            3: [[4,5]],
            4: [[2,6], [5,3],[1,7],[0,8]],
            5: [[4,3]],
            6: [[3,0],[7,8],[4,2]],
            7: [[4,1]],
            8: [[5,2], [7,6], [4,0]]
        }
    }

    increaseMoves() {
        this.moves++
    }

    checkForWinner(last) {
        if(this.moves < 2) return
        
        //here find three in a row
        const winner = this.findThreeInARow(last)
        return winner
    }

    checkPath(path) {
        let count = 0
        path.forEach(tile => {
            if(this.tileStates[`${tile}`].taken) {
                count++
            }
        })
        return count
    }

    findThreeInARow(last) {
        const paths = this.paths[`${last}`]
        if(!paths) return
        let toReturn
        paths.forEach(path => {
            const result = this.checkPath(path)
            if(result === 2) {
                toReturn = ('Winner: ' + this.playerName);
            }
        })
        return toReturn
    }

    nextPlayer() { //? take this out
        return Number(this.currentPlayer = !this.currentPlayer) 
    }
}

class GameManager {
    constructor() {
        this.player1 = new PathManager("Blue")
        this.player2 = new PathManager("Red")
        this.players = [this.player1, this.player2]
        this.currentPlayerIndex = 0
        this.currentPlayer = this.players[this.currentPlayerIndex]
    }
    
    nextPlayer() {
        const nextIndex = Number(this.currentPlayerIndex = !this.currentPlayerIndex) 
        const next = this.players[nextIndex]
        this.currentPlayer = next
    }
}


//could make this ...
class BoardOnThePage {
    constructor() {
        this.tileStates = {}
    }
}

//FUNCTIONS
function markTile(tile, color) {
    tile.setAttribute('style', `background-color: ${color};`)
}

function handleTileClick(e) { 
    if(e.target.className !== 'tiles') return

    //TODO: use the right player
    const player = ticTacToe.currentPlayer
    console.log(player);
    const tile = player.tileStates[e.target.id]
    console.log(tile);
    const takenTile = tile.take()
    if(!takenTile) return
    console.log(ticTacToe.currentPlayerIndex);
    markTile(e.target, players[Number(ticTacToe.currentPlayerIndex)].color) //color will be in class
    player.increaseMoves() //this needs to go to 3 with two players
    const winner = player.checkForWinner(e.target.textContent)
    console.log(winner);
    if(winner) winnerEl.textContent = winner;
    ticTacToe.nextPlayer()
}


/*EVENTS */
document.addEventListener('click', handleTileClick)



/*ENTRY POINT */

//this alternates between two players
// const y = new GameManager()
// console.log(y.currentPlayer);
// y.nextPlayer()
// console.log(y.currentPlayer);
//

const players = [ {
    color: 'blue'
},{ //put this in class
    color: 'red'
},]

const boardEl = document.querySelector('#board')
const ticTacToe = new GameManager() 
// const 
const winnerEl = document.querySelector('#winner')

function start() {
    //make board
    let counter = 0
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            //make tile
            const div = document.createElement("DIV")
            div.setAttribute("class", "tiles")
            div.setAttribute("id", `${counter}`)
            const p = document.createElement('p')
            p.textContent = `${counter}`
            div.appendChild(p)

            //add tile to board
            boardEl.appendChild(div)

            //make tile state <- do this for other player as well
            ticTacToe.players[0].tileStates[counter] = new Tile(row, col)
            ticTacToe.players[1].tileStates[counter] = new Tile(row, col)
            counter++
        }
    }
}
start()
console.log(ticTacToe);

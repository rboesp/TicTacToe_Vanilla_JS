class Tile {
    constructor(i, j) {
        this.i = i;
        this.j = j; //not sure if needed...
        this.taken = false;
    }
    take() {
        if(this.isTaken()) return false
        this.taken = true
        return true
    }
    isTaken() {
        return this.taken
    }
}

class PathManager{
    constructor(playerColor) {
        this.playerColor = playerColor
        this.tileStates = {}
        this.moves = 0
        this.winningPaths = { 
            0: [[1,2],[3,6],[4,8]],
            1: [[4,7], [0,2]], 
            2: [[0,1],[5,8],[4,6]],
            3: [[4,5], [0,6]],
            4: [[2,6], [5,3],[1,7],[0,8]],
            5: [[4,3], [2,8]],
            6: [[3,0],[7,8],[4,2]],
            7: [[4,1], [6,8]],
            8: [[5,2], [7,6], [4,0]]
        }
    }

    increaseMoveCount() {
        this.moves++
    }

    checkForWinningPath(last) {
        if(this.moves < 3) return
        
        //here find three in a row
        const winner = this.findThreeInARow(last)
        return winner
    }

    findThreeInARow(lastTileChosen) {
        const winningPathsIncludingLastTileChosen = this.winningPaths[`${lastTileChosen}`]
        if(!winningPathsIncludingLastTileChosen) return
        let winner = false
        winningPathsIncludingLastTileChosen.forEach(path => {
            const takenTileCountOnPath = this.countTakenTilesOnPath(path)
            if(takenTileCountOnPath === 3) {
                winner = ('Winner: ' + this.playerColor);
            }
        })
        return winner
    }

    countTakenTilesOnPath(path) {
        let count = 1 //the last one we chose, plus two more we find below to make three
        path.forEach(tile => {
            if(this.tileStates[`${tile}`].isTaken()) {
                count++
            }
        })
        return count
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
        const nextPlayer = this.players[nextIndex]
        this.currentPlayer = nextPlayer
    }
}


class BoardOnThePage {
    constructor() {
        this.tileStates = {}
    }

    markTile(tile, color) {
        tile.setAttribute('style', `background-color: ${color};`)
    }

    clearBoard() {
        for (const key in this.tileStates) {
            if (this.tileStates.hasOwnProperty(key)) {
                const tile = this.tileStates[key];
                tile.take()
            }
        }
    }
}

const boardEl = document.querySelector('#board')
const gameManager = new GameManager() 
const ticTacToeBoard = new BoardOnThePage()
const winnerEl = document.querySelector('#winner')


/*FUNCTIONS*/

//when user clicks on tile
function handleTileClick(event) { 
    if(event.target.className !== 'tiles') return
    const tileNumber = event.target.id

    const player = gameManager.currentPlayer
    const playerTileState = player.tileStates[tileNumber]
    const uiBoardTileState = ticTacToeBoard.tileStates[tileNumber]
    const playerTakenTile = playerTileState.take()
    const uiBoardTakenTile = uiBoardTileState.take()
    if(!playerTakenTile || !uiBoardTakenTile) return

    ticTacToeBoard.markTile(event.target, player.playerColor)
    player.increaseMoveCount() 
    const winner = player.checkForWinningPath(event.target.textContent)

    if(!winner) {
        gameManager.nextPlayer()
        return
    }

    //if here there is a winner
    winnerEl.textContent = winner;
    ticTacToeBoard.clearBoard()
}


/*EVENTS */
document.addEventListener('click', handleTileClick)



/*ENTRY POINT */

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

            //make tile states for both players and the board on the screen
            gameManager.player1.tileStates[counter] = new Tile(row, col)
            gameManager.player2.tileStates[counter] = new Tile(row, col)
            ticTacToeBoard.tileStates[counter] = new Tile(row, col)
            counter++
        }
    }
}
start()

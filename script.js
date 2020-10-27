class Tile {
    constructor(val) {
        this.val = val
        this.taken = "available";
        this.options = ['owned', "taken", "off"]
    }
    labelTile(option) {
        if(this.tileStatus() === this.options[1]) return
        if(this.tileStatus() === this.options[2]) return
        this.taken = option
        return true
    }
    tileStatus() {
        return this.taken
    }
}

class PathManager{
    constructor(playerColor) {
        this.playerColor = playerColor
        this.tileStates = {}
        this.moves = 0
        this.winningPaths = { 
            
            6: [[3,0],[7,8],[4,2]],
            7: [[4,1], [6,8]],
            8: [[5,2], [7,6], [4,0]],
            3: [[4,5], [0,6]],
            0: [[1,2],[3,6],[4,8]],
            1: [[4,7], [0,2]], 
            2: [[0,1],[5,8],[4,6]],
            5: [[4,3], [2,8]],
            4: [[2,6], [5,3],[1,7],[0,8]], //mixed it manually
            
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
            if(this.tileStates[`${tile}`].tileStatus() === 'owned') {
                count++
            }
        })
        return count
    }

    randomProperty = function (obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    };

    getKeyByValue(object, value) { 
        return Object.keys(object).find(key => object[key] === value); 
    } 

    mediumDumbAI_nextMove(number) {
   
        //this is so stupid, but I was tired and this was quick and easy
        //I will refactor later, and call this the medium-dumb AI
        let toReturn = false
        for (const key in this.winningPaths) {
            // if (this.winningPaths.hasOwnProperty(key)) {
        // const element = this.winningPaths[key];
        const element = this.randomProperty(this.winningPaths)
        const key = this.getKeyByValue(this.winningPaths, element)
        element.forEach(path => {
            let count = 0
            path.forEach(tileNumber => {
                console.log(this.tileStates[tileNumber].taken);
                if(!number && this.tileStates[tileNumber].taken === "available") {
                    console.log('pick em');
                    toReturn = tileNumber
                }
                else if(this.tileStates[tileNumber].taken === "owned") {
                    count++
                    console.log("*****" + this.tileStates[tileNumber].taken);
                    if(count === number && this.tileStates[key].taken === "available") {
                        console.log(tileNumber, count);
                        console.log(key, path);
                        toReturn = key
                    }
                }
            })
        })
            // }
        }
        return toReturn
    }

    findNextTile() {
        //this is bad, refactor at later time with above
        let check = this.mediumDumbAI_nextMove(2)
        if(check) return check
        check = this.mediumDumbAI_nextMove(1) 
        if(check) return check
        return this.mediumDumbAI_nextMove(0)
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
        return this.currentPlayer
    }
}


class BoardOnThePage {
    constructor() {
        this.tileStates = {}
    }

    markTile(tile, color) {
        tile.setAttribute('style', `background-color: ${color};`)
    }

    turnOff() {
        for (const key in this.tileStates) {
            if (this.tileStates.hasOwnProperty(key)) {
                const tile = this.tileStates[key];
                tile.labelTile("off")
            }
        }
    }
}

const boardEl = document.querySelector('#board')
const gameManager = new GameManager() 
const ticTacToeBoard = new BoardOnThePage()
const winnerEl = document.querySelector('#winner')


/*FUNCTIONS*/

const coms = '258'
let count = 0
function computerClick(next) {
    // let next = coms[count++]
    let tile = document.getElementById(next)
    tile.click()
}

//when user clicks on tile
function handleTileClick(event) { 
    if(event.target.className !== 'tiles') return
    const tileNumber = event.target.id

    const player = gameManager.currentPlayer
    const playerTileState = player.tileStates[tileNumber]
    const uiBoardTileState = ticTacToeBoard.tileStates[tileNumber]
    const playerTakenTile = playerTileState.labelTile("owned") //owned here means "this player picked this tile"
    const uiBoardTakenTile = uiBoardTileState.labelTile("taken") //taken here means "this tile has been picked marked and cannot be picked again"
    if(!playerTakenTile || !uiBoardTakenTile) return

    ticTacToeBoard.markTile(event.target, player.playerColor)
    player.increaseMoveCount() 
    const winner = player.checkForWinningPath(event.target.textContent) //use id of el

    if(winner) {   
        winnerEl.textContent = winner;
        ticTacToeBoard.turnOff()
        return
    }

    let nextPlayer = gameManager.nextPlayer()
    // console.log(nextPlayer.playerColor);
    if(nextPlayer.playerColor === 'Red') {
        console.log('Red is next');
        //mark blue tile
        nextPlayer.tileStates[tileNumber].labelTile("taken") //taken here means "someone took this and you cannot pick it"

        console.clear()
        console.log(player.playerColor);
        console.log(player.tileStates);
        console.log('**************');
        console.log(nextPlayer.playerColor);
        console.log(nextPlayer.tileStates);

        //here find next tile for next player if computer player
        const next = nextPlayer.findNextTile()
        console.log(`Player ${nextPlayer.playerColor} is playing tile ${next} next!`);
        computerClick(next)
    }
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
            gameManager.player1.tileStates[counter] = new Tile(counter)
            gameManager.player2.tileStates[counter] = new Tile(counter)
            ticTacToeBoard.tileStates[counter] = new Tile(counter)
            counter++
        }
    }
}
start()

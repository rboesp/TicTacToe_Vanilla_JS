class Tile {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.taken = false;
    }
    take() {
        this.taken = true;
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

console.log(tileStates);


//find board
const board = document.querySelector('#board')

//loop
let count = 0
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        //make element
        const div = document.createElement("DIV")
        div.setAttribute("class", "tiles")
        div.setAttribute("id", `${count++}`)

        const h1 = document.createElement('H1')
        div.appendChild(h1)
        board.appendChild(div)
    }
}

//events
document.addEventListener('click', (e) => {
    console.log(e.target.tagName);
    if(e.target.tagName === 'DIV') {
        console.log(numberMapping[e.target.id])

    }
    
})
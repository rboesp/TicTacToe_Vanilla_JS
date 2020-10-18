//find board
const board = document.querySelector('#board')

//loop
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        //make element
        const div = 
        document.createElement("DIV")
        div.setAttribute("class", "tactoes")

        const h1 = document.createElement('H1')
        h1.textContent = `${i + 1}, ${j+1}`
        div.appendChild(h1)
        board.appendChild(div)
    }
}

//events

const tiles = document.querySelector('.tile-container');
const keyboard = document.querySelector('.keyboard');
const messageContent = document.querySelector('.message-container')

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

const wordle = 'ADIEU';

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'row-' + rowIndex)
    row.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'row-' + rowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tiles.append(rowElement)
})

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
})

function handleClick(key) {
    console.log('clicked', key);
    if (key == '«') {
        deleteLetter()
        return
    }

    if (key == 'ENTER') {
        checkRow()
        return
    }
    addLetter(key)
}

const addLetter = (letter) => {
    if (currentRow < 6 && currentTile < 5) {
        const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

function checkRow() {
    const guess = guessRows[currentRow].join('')

    if (currentTile > 4) {
        flipTile()
        if (wordle == guess) {
            showMessage('You won, yay!')
            isGameOver = true;
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage('The Game is Over! Try Again!')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

function showMessage(message) {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageContent.append(messageElement)
    setTimeout(() => { messageContent.removeChild(messageElement) }, 2500);
}
function addColorToKey(keyLetter, color) {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#row-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}
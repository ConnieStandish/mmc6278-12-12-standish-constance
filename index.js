const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if(this.word.includes(letter)) {
      this.correctLetters.push(letter)
      let wordGuessArr = this.word.split("")
      for (let i = 0; i < wordGuessArr.length; i++) {
        if (wordGuessArr[i] === letter) {
          this.replaceUnderscores(i, letter)
        }
      }
    }
    if (!this.word.includes(letter) && !this.incorrectLetters.includes(letter)) {
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
  }

  //Helper function to replace underscores
  replaceUnderscores(index, letter) {
    let showAnswers = this.displayWord
    if (index < this.displayWord.length){
      showAnswers = this.displayWord.substring(0, index) + letter + this.displayWord.substring(index + 1)
    }
    this.displayWord = showAnswers
    return
  }

  // implement the updateScreen function:
  updateScreen() {
    let wordToGuess = document.getElementById('word-to-guess')
    wordToGuess.innerHTML = this.displayWord
    let wordsLeft = document.getElementById('remaining-guesses')
    wordsLeft.innerHTML = this.remainingGuesses
    let wrongGuess = document.getElementById('incorrect-letters')
    wrongGuess.innerHTML = this.incorrectLetters
  }

  // implement the isGameOver function:
  isGameOver() {
    if (this.displayWord !== this.word && this.remainingGuesses > 0) {
      return false
    }
    return true
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return 'win'
    }
    if (!currentWord.isGameOver() && this.remainingGuesses > 0) {
      return null
    }
    return 'loss'
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()
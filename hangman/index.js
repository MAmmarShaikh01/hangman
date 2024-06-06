let keyboard = document.querySelector(".keyboard");
let wordDisplay = document.querySelector(".word-display")
let hangmanImage = document.querySelector(".hangman-container img")
let guessesText = document.querySelector(".guesses-text b")
let hintCont = document.querySelector(".hint-text b")
let playAgainBtn = document.querySelector(".play-again")
let currentWord, correctletters = []
let wrongGuessCount = 0
const maxGuessess = 6, gameModel = document.querySelector(".game-model")


//*! ------------------------------ imp functions ----------------------------- */


const gameOver = isVictory => {
    const modelText = isVictory ? "You found the word" : `the correct word was`;
    gameModel.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`
    gameModel.querySelector("p").innerHTML = `${modelText} : <b>${currentWord}</b> `
    gameModel.querySelector("h4").innerHTML = `${isVictory ? "Congrats!" : "Game Over!"} `
    console.log(gameModel.querySelector("p"))
    setTimeout(() => {
        gameModel.classList.add("show")
    }, 300);
}


const initGame = (button, clickedLetter) => {

    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((curLetter, index) => {
            if (curLetter === clickedLetter) {
                correctletters.push(curLetter)
                wordDisplay.querySelectorAll("li")[index].innerText = curLetter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
        wrongGuessCount++
    }
    guessesText.textContent = `${wrongGuessCount} / ${maxGuessess}`
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    button.disabled = true
    if (wrongGuessCount === maxGuessess) return gameOver(false)
    if (correctletters.length === currentWord.length) return gameOver(true)
}


//* ---------------------------- keyboard buttons ---------------------------- */
for (let i = 97; i <= 122; i++) {
    let btns = document.createElement("button")
    btns.classList.add("btnClass")
    btns.textContent = String.fromCharCode(i)
    keyboard.appendChild(btns)
    btns.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)))
}

//* ----------------------------------- end ---------------------------------- */
const resetGame = () => {
    correctletters = []
    wrongGuessCount = 0
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter "></li>`).join("")
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessess}`
    keyboard.querySelectorAll("button").forEach((b) => { b.disabled = false; })
    gameModel.classList.remove("show")
    hangmanImage.src = "images/hangman-0.svg"
}
const getRandWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    console.log(word)
    hintCont.textContent = hint
    resetGame()

}
playAgainBtn.addEventListener("click", getRandWord)
getRandWord()
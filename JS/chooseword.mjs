window.onload = () => {
    // Check if there's a logged-in user in sessionStorage
    const user = sessionStorage.getItem("loggedInUser");

    // Redirect to login page if no user is logged in
    if (!user) {
        alert("Please log in to play the game.");
        window.location.href = "login.html";
    } else {
        // Load the page if the user is logged in
        startGame();
    }
};

const userscore = localStorage.getItem("topscore"); // The topscore is retreived from the localstorage for the user
console.log("The top score is" + userscore);

// Object in where the random words are stored
const themes = {
    countries: ['england', 'spain', 'switzerland', 'germany', 'australia', 'india', 'russia', 'southkorea'],
    capitalCities: ['london', 'madrid', 'bern', 'berlin', 'canberra', 'newdelhi', 'moscow', 'seoul'],
    sports: ['football', 'cricket', 'hockey', 'golf', 'rugby', 'tennis', 'badminton', 'basketball']
};

// Score is set to 0 when the user first plays the game
let score = 0;

//WordArray is where the individual characters of the new word are stored as an array, 
//but the characters are displayed as a underscore which represent each letter.
const wordArray = [];
const maxGuesses = 5; // Max guesses allowed is 5
const hangmanimage = document.getElementById("hangmanImage")



function startGame() {


    incorrectGuesses = 0;  // Incorrect guesses reset to 0 everytime the user restarts and gets a new word
    updateScore();
    updateIncorrectGuesses();

    //This will clear the message everytime a new word is clicked
    document.getElementById('rightGuess').innerText = "";
    document.getElementById('wrongGuess').innerText = "";


    //The selected theme below gets the theme that the user has choose
    const selectedTheme = document.getElementById("theme").value;
    //The random word chooses a word from the theme and stores it as a new word
    const randomWord = themes[selectedTheme][Math.floor(Math.random() * themes[selectedTheme].length)];

    newWord = randomWord.toLowerCase();
    console.log("The word is:" + newWord);

    // The for loop will loop through the letters of the new word and store them in an array. 
    wordArray.length = 0;
    for (let i = 0; i < newWord.length; ++i) {
        wordArray.push({
            actual: newWord.charAt(i),
            completed: '_'
        });
    }

    // Buttons reset to original state when the game starts again
    document.querySelectorAll('.letter-button').forEach(button => {
        button.disabled = false;
    });

    displayProgress();
    hangmanImage.src = "/Images/hangman0.jpg";  //hangman image is set to initial state

}


function displayProgress() {  
    let str = ""; //Empty string initialisation where its holds the display for each letter
    for (let letter of wordArray) {
        str += letter.completed + " "; // The str represents either an underscore or the actual letter with a space between each other
    }
    document.querySelector('#word-display').innerHTML = str; // Word display will be updated when the correct letter has been guessed
}

// Score is displayed for correct word guessed 
function updateScore() {
    document.getElementById('score').innerText = "Score: " + score;
}

// Incorrect guess is displayed for every incorrect letter chosen by user
function updateIncorrectGuesses() {
    document.getElementById('incorrectGuesses').innerText = "Incorrect Guesses " + incorrectGuesses + "/" + maxGuesses;
}

let myLetter = ""; 

function checkletter(button, letter) {

    myLetter = letter;
    button.disabled = true; // If user selects a letter button it disables it so user can't select the button again
    
    let wordGuessed = false; // The word has not been guessed correctly yet

    for (let letter of wordArray) { // Loops through every letter of the word array to check if the word array conatains that letter
        if (letter.actual == myLetter) { // If the array contains that letter then replace the underscore with that letter
            letter.completed = myLetter;
            wordGuessed = true; // The word has been guessed correctly
        }
    }

    //Each time the letter is guessed incorrectly the incorrect guesses will increment by 1
    if (wordGuessed == false) {
        incorrectGuesses++;
        // Updates the incorrectGuesses and displays it to the user
        updateIncorrectGuesses(); 
        //The hangman image will increment via the file name so it displays the next stage of the hangman
        hangmanimage.src = `/Images/hangman${incorrectGuesses}.jpg`;
        // If the incorrect guesses exceeds the max guesses then the game will be over and all keyboard buttons will be disabled
        if (incorrectGuesses >= maxGuesses) {
            document.querySelectorAll('.keyboard button').forEach(button => button.disabled = true);
            console.log("You lost the word was" + newWord);
            document.getElementById('wrongGuess').innerText = "You lost this game. The correct word was " + newWord + ". To play again press the button to get a new word";
        }

    }

    displayProgress();

    // Check if all the letters are guessed correctly and that there are no unguessed letters
    for (let letterObj of wordArray) {
        if (letterObj.completed === '_') {
            wordGuessed = false;  // If any letter is still '_', the word is not fully guessed
        }
    }

    // Name of logged in user retreived
    const loggedInUserName = sessionStorage.getItem("loggedInUser");
    let loggedInUser = JSON.parse(localStorage.getItem(loggedInUserName));

    if (wordGuessed) {
        document.querySelectorAll('.keyboard button').forEach(button => button.disabled = true);
        document.getElementById('rightGuess').innerText = "You WON! Well done for guessing the word correct! Press button for new word to play again.";
        score++;  // Increment the score for correctly guessing the entire word
        updateScore(); //Score updates everytime a word is guessed correctly
        localStorage.setItem("topscore", score);  // Score will be saved to local storage as topscore

        if (score>loggedInUser.topscore) {
        loggedInUser.topscore = score; // Update the top score in the user object
        localStorage.setItem(loggedInUserName, JSON.stringify(loggedInUser));
        }
    }
    displayProgress();
}

// Logout button for user so there score is saved and another user can play
const logoutButton = document.querySelector("#logout");
logoutButton.onclick = logout;

function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

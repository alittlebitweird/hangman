var words = ['happy'];
var swords = ['acres', 'adult', 'advice', 'arrangement', 'attempt', 'August', 'Autumn', 'border', 'breeze', 'brick', 'calm', 'canal', 'Casey', 'cast', 'chose', 'claws', 'coach', 'constantly', 'contrast', 'cookies', 'customs', 'damage', 'Danny', 'deeply', 'depth', 'discussion', 'doll', 'donkey', 'Egypt', 'Ellen', 'essential', 'exchange', 'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace', 'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother', 'habit', 'happily', 'Harry', 'heading', 'hunter', 'Illinois', 'image', 'independent', 'instant', 'January', 'kids', 'label', 'Lee', 'lungs', 'manufacturing', 'Martin', 'mathematics', 'melted', 'memory', 'mill', 'mission', 'monkey', 'Mount', 'mysterious', 'neighborhood', 'Norway', 'nuts', 'occasionally', 'official', 'ourselves', 'palace', 'Pennsylvania', 'Philadelphia', 'plates', 'poetry', 'policeman', 'positive', 'possibly', 'practical', 'pride', 'promised', 'recall', 'relationship', 'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale', 'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking', 'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope', 'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb', 'tobacco', 'toy', 'trap', 'treated', 'tune', 'University', 'vapor', 'vessels', 'wealth', 'wolf', 'zoo']; 

// Set number of attempts
var lives = 8;
var guesses = 0;
var wrongGuesses = [];
// Pick a random number
var number = 0;
//var number = Math.floor((Math.random() * words.length) + 1);
// Pick word from number 
var word = words[number].toLowerCase();
// Count word length
var wordLength = word.length;

var letterPositions = [];
var playArea = [];

// Build play area
var renderPlayArea = function(type, letter, letterPositions) {
  // loop through each letter in the word
  for ( i = 0; i < wordLength; i++) {
    // if at start, or incorrect guess, display blank lines
    if (type == "start") {
      playArea[i] = ("_");
    // if correct guess, display guessed letter(s)
    } else if (type == "update") {
      if (word[i] === letterPositions[i]) {
        playArea[i] = letterPositions[i];
      } else {
      }
    }
  }
  console.log("\n\n");
  console.log("Guesses Guessed: " + (guesses));
  console.log("Guesses Remaining: " + (lives - guesses)); 
  if (wrongGuesses.length > 0) {
    console.log("Wrong Guesses: " + wrongGuesses);
  }
  console.log("\n\n");
  console.log(playArea.toString().split(',').join(' '));
  console.log("\n\n");
  console.log(letterPositions);
  // if there are no _'s left, win!
  if (playArea.toString().split(',').join(' ').search('_') === -1) {
    console.log("You win!");
  }

};

  // check if letter has been guessed
var doubleCheck = function() {
  for (g = 0; g < wrongGuesses; g++) {
    if (letter == wrongGuesses[g]) {
      console.log("You've already guessed that letter, try again");  
    } else {
      return true;
    }
  }
};   

var guess = function(letter) {
  // loop through each letter in the word
  for (i = 0; i < word.length; i++) {
    // if the guessed letter matches a letter in the word, add to list
    if (word[i] == letter) {
      letterPositions[i] = letter;
    // otherwise, add null to list
    } else {
      letterPositions[i] = null;
    }
  }
  // if the letter is in the word, render
  if (word.search(letter) > -1) {
    renderPlayArea("update", letter, letterPositions);
  // if there are lives available 
  } else if ( guesses < lives - 1 ) {
    // if there has been at least one wrong guess, check if repeat guess
    if (wrongGuesses.length > 0) {
      // loop through wrong guesses
      for (var i = 0; i < wrongGuesses.length; i++) {
        // if it is a repeat guess, tell user
        if (wrongGuesses[i] == letter) {
          console.log("You've already tried that letter");
        // if it's not a repeat guess, dock a life
        } else {
          wrongGuesses.push(letter);
          guesses += 1;
        }
      }
    // if there have been no wrong guesses
    } else {
      wrongGuesses.push(letter);
      guesses += 1;
      renderPlayArea("start");
      console.log("Letter not in word");
    }
  // game over condition
  } else {
    console.log("Hangman. Game Over.");
  }
};

// Initiate Game
console.log(word);
console.log("Guess a letter with guess(letter)");
renderPlayArea("start");



var swords = ['happy'];
var words = ['acres', 'adult', 'advice', 'arrangement', 'attempt', 'August', 'Autumn', 'border', 'breeze', 'brick', 'calm', 'canal', 'Casey', 'cast', 'chose', 'claws', 'coach', 'constantly', 'contrast', 'cookies', 'customs', 'damage', 'Danny', 'deeply', 'depth', 'discussion', 'doll', 'donkey', 'Egypt', 'Ellen', 'essential', 'exchange', 'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace', 'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother', 'habit', 'happily', 'Harry', 'heading', 'hunter', 'Illinois', 'image', 'independent', 'instant', 'January', 'kids', 'label', 'Lee', 'lungs', 'manufacturing', 'Martin', 'mathematics', 'melted', 'memory', 'mill', 'mission', 'monkey', 'Mount', 'mysterious', 'neighborhood', 'Norway', 'nuts', 'occasionally', 'official', 'ourselves', 'palace', 'Pennsylvania', 'Philadelphia', 'plates', 'poetry', 'policeman', 'positive', 'possibly', 'practical', 'pride', 'promised', 'recall', 'relationship', 'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale', 'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking', 'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope', 'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb', 'tobacco', 'toy', 'trap', 'treated', 'tune', 'University', 'vapor', 'vessels', 'wealth', 'wolf', 'zoo']; 

// Set number of attempts
var lives = 8;
var guesses = 0;
var wrongGuesses = [];
// Pick a random number
//var number = 0;
var number = Math.floor((Math.random() * words.length) + 1);
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
      // if letterPositions exists
      if (letterPositions) {
        if (word[i] === letterPositions[i]) {
          playArea[i] = letterPositions[i];
        }
      }
    }
  }
  console.log("\n\n");
  // Guesses remaining
  var guessesRemaining = ("Guesses Remaining: " + (lives - guesses)); 
  console.log(guessesRemaining); 
  if (type == "start") {
    // create GUI elements
    $(".ide").html("<h2 class='guesses-remaining'></h2><h2 class='wrong-guesses'></h2><h2 class='instructions'></h2><h2 class='play-area'></h2><h2 class='win'></h2><form class='guess'><input type='text', placeholder='guess a letter', name: 'guess'/></form>");
  }
  $(".guesses-remaining").html(guessesRemaining);
  
  // Wrong guesses
  if (wrongGuesses.length > 0) {
    var wrongGuessesText = ("Wrong Guesses: " + wrongGuesses);
    console.log(wrongGuessesText);
    $(".wrong-guesses").html(wrongGuessesText);
  }
 
  // Instructions
  $(".instructions").html("Guess a letter");
  console.log("Guess a letter with guess(letter)");
  
  // Play Area
  console.log("\n\n");
  var playAreaString = playArea.toString().split(',').join(' ');
  $(".play-area").html(playAreaString);
  console.log(playAreaString);
  console.log("\n\n");
  
  // if there are no _'s left, win!
  if (playAreaString.search('_') === -1) {
    $(".win").html("You win!");
    console.log("You win!");
  }

};
// Guesses
$(".guess").keypress(function(event) {
  if (event.which == 13) {
    event.preventDefault();
    var $input = $('.guess :input');
    $("form").submit();
    guess($input);
  }
});

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
      wrongGuesses.push(letter);
      guesses += 1;
      renderPlayArea("upate", letter);
      console.log("Letter not in word");
  // game over condition
  } else {
    console.log("Hangman. Game Over.");
  }
};

// Initiate Game
$( document ).ready(function() {
  console.log(word);
  renderPlayArea("start");
});



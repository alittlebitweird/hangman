var swords = ['happy'];
var words = ['acres', 'adult', 'advice', 'arrangement', 'attempt', 'August', 'Autumn', 'border', 'breeze', 'brick', 'calm', 'canal', 'Casey', 'cast', 'chose', 'claws', 'coach', 'constantly', 'contrast', 'cookies', 'customs', 'damage', 'Danny', 'deeply', 'depth', 'discussion', 'doll', 'donkey', 'Egypt', 'Ellen', 'essential', 'exchange', 'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace', 'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother', 'habit', 'happily', 'Harry', 'heading', 'hunter', 'Illinois', 'image', 'independent', 'instant', 'January', 'kids', 'label', 'Lee', 'lungs', 'manufacturing', 'Martin', 'mathematics', 'melted', 'memory', 'mill', 'mission', 'monkey', 'Mount', 'mysterious', 'neighborhood', 'Norway', 'nuts', 'occasionally', 'official', 'ourselves', 'palace', 'Pennsylvania', 'Philadelphia', 'plates', 'poetry', 'policeman', 'positive', 'possibly', 'practical', 'pride', 'promised', 'recall', 'relationship', 'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale', 'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking', 'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope', 'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb', 'tobacco', 'toy', 'trap', 'treated', 'tune', 'University', 'vapor', 'vessels', 'wealth', 'wolf', 'zoo']; 

// Set number of attempts
var lives = 7;
var guesses = 0;
var wrongGuesses = [];
var gameOver = false;
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
  if (type == "start") {
    // create GUI elements
    $("body").append("<div class='ide'></div>");
    $(".ide").append("<div class='hangman-frame'></div>");
    $(".ide").append("<div class='gui-container'></div>");
    $(".ide").after("<form><input type='text', placeholder='guess a letter', name='guess'/></form>");
    $(".gui-container").html("<h2 class='guesses-remaining'></h2><h2 class='wrong-guesses'></h2><h2 class='instructions'></h2><h2 class='play-area'></h2><h2 class='win'></h2><h2 class='win-lose'></h2>");
    // Game Over Scenario
  } else if (type == "gameOver") {
    $('.win-lose').html("Hangman, Game Over!");
    gameOver = true;
    console.log("Hangman. Game Over.");
  }  
  
  // Guesses remaining
  var guessesRemaining = ("Guesses Remaining: " + (lives - guesses)); 
  $(".guesses-remaining").html(guessesRemaining);
  console.log("\n\n");
  console.log(guessesRemaining); 
  
  // Handle wrong guesses
  if (wrongGuesses.length > 0) {
    var wrongGuessesText = ("Wrong Guesses: " + wrongGuesses);
    $(".wrong-guesses").html(wrongGuessesText);
    console.log(wrongGuessesText);
  }
  
  // Display Instructions
  $(".instructions").html("Guess a letter");
  console.log("Guess a letter with guess(letter)");
  
  // Play Area
  renderHangman(wrongGuesses);
  var playAreaString = playArea.toString().split(',').join(' ');
  $(".play-area").html(playAreaString);
  $('input[name=guess]').val("");
  console.log("\n\n");
  console.log(playAreaString);
  console.log("\n\n");
  
  // if there are no _'s left, win!
  if (playAreaString.search('_') === -1) {
    $(".win").html("You win!");
    gameOver = true;
    $('input[name=guess]').attr("placeholder", "Press enter to play again");
    console.log("You win!");
  }
};

// Handle Guesses
// Get letter from form field
$(document).keypress(function(e) {
  if (gameOver === false) {
    if(e.which == 13) {
      e.preventDefault();
      var value = $('input[name=guess]').val();
      // Pass letter to guess function
      guess(value);
    }
  } else {
    // refresh page on enter
    if(e.which == 13) {
      e.preventDefault();
      location.reload();
    }
  }
});

// Guess Function
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
    renderPlayArea("update", letter);
    console.log("Letter not in word");
  // game over condition
  } else {
    wrongGuesses.push(letter);
    guesses += 1;
    renderPlayArea("gameOver", letter);
    $('input[name=guess]').attr("placeholder", "Press enter to play again");
  }
};

// Build Hangman Frame
var renderHangman = function(wrongGuesses) {
  $('.hangman-frame').empty();
  for (var h = 0; h < 7; h++) {
    $('.hangman-frame').append(hangmanFrames[wrongGuesses.length][h] + "<br />");
  }
};


hangman1 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '========='
];

hangman2 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '========='
];

hangman3 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '========='
];

hangman4 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;|',
  '&nbsp;/|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '========='
];

hangman5 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;|',
  '&nbsp;/|\\ &nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '========='
];

hangman6 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;|',
  '&nbsp;/|\\ &nbsp;|',
  '&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '========='
];

hangman7 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;|',
  '&nbsp;/|\\&nbsp;&nbsp;|',
  '&nbsp;/&nbsp;\\&nbsp;&nbsp;|',
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|',
  '========='
];

hangman8 = [
  '&nbsp;&nbsp;+---+',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|',
  '&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;|',
  '&nbsp;/|\\&nbsp;&nbsp;|',
  '&nbsp;/&nbsp;\\&nbsp;&nbsp;|',
  '========='
];

var hangmanFrames = [hangman1, hangman2, hangman3, hangman4, hangman5, hangman6, hangman7, hangman8];

// Initiate Game
$( document ).ready(function() {
  console.log(word);
  renderPlayArea("start");
});



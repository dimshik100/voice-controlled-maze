var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var commands = ['right', 'left', 'up', 'down', 'reset'];
// var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
var commandsList = document.querySelector('.commands-list');
var speakBtn = document.querySelector('.speak-btn');
var stopGameBtn = document.querySelector('.stop-game-btn');
var startGameBtn = document.querySelector('.start-game-btn');

var commandsHTML = '';
commands.forEach(function (v, i, a) {
  console.log(v, i);
  commandsHTML += '<span> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click then say a command to play or reset the game. Try ' + commandsHTML + '.';

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to receive a command.');
// }

speakBtn.onclick = function () {
  recognition.start();
  console.log('Ready to receive a command.');
}

stopGameBtn.onclick = function () {
  recognition.stop();
  console.log('Recognition stopped.');
}

startGameBtn.onclick = function () {
  recognition.start();
  console.log('Ready to receive a command.');
}

// recognition.start();
// console.log('Ready to receive a command.');

recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  var confidence = event.results[0][0].confidence;

  diagnostic.textContent = 'Result received: ' + command + '.';
  // bg.style.backgroundColor = command;
  console.log('Confidence: ' + confidence);


  matchCommand(command, confidence);

}

function matchCommand(command, confidence) {

  console.log('command: ' + command + ' confidence: ' + confidence);

  // because a command can contain multiple words 
  // we need to split it.
  var words = command.split(' ');

  for (word of words) {
    if (commands.indexOf(word) >= 0 && confidence > 0.4) {
      doCommand(word);
      // return;
    }
  }
}

function doCommand(command) {
  commandsList.innerHTML += '<li>' + command + '</li>';

  // this might not be the correct place to call maze
              switch (command) {
                case 'up':
                    maze.moveUp();
                    break;
                case 'down':
                    maze.moveDown();
                    break;
                case 'right':
                    maze.moveRight();
                    break;
                case 'left':
                    maze.moveLeft();
                    break;
            }
}

recognition.onspeechend = function () {
  // recognition.stop();
}

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

// recognition.onend = function(){
//   console.info("voice recognition ended, restarting...");
//     recognition.start();
// }

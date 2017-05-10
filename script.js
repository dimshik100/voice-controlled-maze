var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var commands = ['right', 'left', 'up', 'down', 'restart','new'];
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
// var commandsList = document.querySelector('.commands-list');
var speakBtn = document.querySelector('.speak-btn');
var stopGameBtn = document.querySelector('.stop-game-btn');
var startGameBtn = document.querySelector('.start-game-btn');

var commandsHTML = '';
commands.forEach(function (v, i, a) {
  // console.log(v, i);
  commandsHTML += '<span> ' + v + ' </span>';
});
hints.innerHTML = 'say a command to play or restart the game. Try ' + commandsHTML + '.';

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to receive a command.');
// }

speakBtn.onclick = function () {
  startRecognition();
}

stopGameBtn.onclick = function () {
  stopRecognition();
}

startGameBtn.onclick = function () {
  startRecognition();
}


function stopRecognition() {
  recognition.stop();
  console.log('Recognition stopped.');
  document.querySelector('.mic').classList.remove('listening');
}


function startRecognition() {
  recognition.start();
  console.log('Ready to receive a command.');
  document.querySelector('.mic').classList.add('listening');
}

// recognition.start();
// console.log('Ready to receive a command.');

recognition.onresult = function (event) {


  stopRecognition();

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


  // bg.style.backgroundColor = command;
  console.log('command: ' + command + ' ,confidence: ' + confidence);


  if (confidence > 0.4) {
    // because a command can contain multiple words 
    // we need to split it.
    let words = command.split(' ');
    const commandsFromWords = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (commands.indexOf(word) >= 0) {
        // add word to valid commands 
        commandsFromWords.push(word);

        // wrap the command for highlighting 
        words[i] = '<span class="command" id="com-' + (commandsFromWords.length - 1) + '">' + word + '</span>';
        // return;
      }
    }

    // convert back to string
    command = words.join(' ');

    diagnostic.innerHTML = 'Result received: ' + command + '.';

    executeVoiceCommands(commandsFromWords);


  } else {
    diagnostic.textContent = 'Not sure that i understand your command.';
  }


}


function executeVoiceCommands(commands) {



  var delay = 300;

  var i = 0
  var id = window.setInterval(function () {
    if (i >= commands.length) {
      clearInterval(id);
      // restart recognition again
      startRecognition();
      return;
    }

    doCommand(commands[i], i);

    console.log('Executing command: ' + commands[i] + ' (' + i + ' / ' + commands.length + ')');
    i++;
  }, delay);



  // for (i in commands) {
  //   doCommand(commands[i]);
  // }
}



function doCommand(command, index) {
  // commandsList.innerHTML += '<li>' + command + '</li>';

  let executed = false;
  // this might not be the correct place to call maze
  switch (command) {
    case 'up':
      executed = maze.moveUp();
      break;
    case 'down':
      executed = maze.moveDown();
      break;
    case 'right':
      executed = maze.moveRight();
      break;
    case 'left':
      executed = maze.moveLeft();
      break;
    case 'new':
      maze.newGame();
      break;
    case 'restart':
      maze.restart();
      break;
  }

  // Color the commands in user input
  if (executed) {
    document.getElementById('com-' + index).classList.add('done');
  } else {
    document.getElementById('com-' + index).classList.add('fail');
  }
}

recognition.onspeechend = function () {
  // recognition.stop();
}

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that color.";
  stopRecognition();
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

// recognition.onend = function(){
//   console.info("voice recognition ended, restarting...");
//     recognition.start();
// }

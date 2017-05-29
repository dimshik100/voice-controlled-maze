# Voice controlled Maze

An experimental maze game that you control with voice commands.

Using web speech api.

Currently works best on Chrome desktop.

Check the [LIVE DEMO](https://dimshik100.github.io/voice-controlled-maze/)


## Dev

- Run `npm install` to get all dependencies.
- Run `gulp styles` if you want to generate the `main.css` file.
- Run `gulp` if you want to watch for changes in SCSS files and update `main.css`.

## TODO

- The maze should be controlled with:
  - Voice commands
  - ~~Arrow keys~~
  - Swipe directions
  - ~~UI buttons~~
- Create finish screen / popup
- Add visual feedback when doing illegal move?
- Add voice control feedback when doing illegal move.
  - Voice feedback?
- ~~Add support for multiple voice commands in one phrase~~
- Store not finished mazes in local storage to let the player continue next time
- Add an icon of a microphone that changes from grey to green when the user can talk
- ~~Color the words in user command in green when they are executed~~
- ~~Add delay between commands when executing multiple commands~~
- Add message if voice control is not supported (show supported browsers)
- ~~Add "new game" button\command that will start a new game~~
- ~~Change "reset" to "restart", which will restart the same maze.~~

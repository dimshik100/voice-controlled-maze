
/*
var createMaze = function (hate, width, maze, walls, currentPosition) {
    hate = hate % 2 == 0 ? hate + 1 : hate;
    width = width % 2 == 0 ? width + 1 : width;

    document.getElementById('maze').setAttribute('style', 'height:' + hate * 20 + 'px; width:' + width * 20 + 'px');
    for (var y = 0; y < hate; y++) {
        maze[y] = [];
        for (var x = 0; x < width; maze[y][x++] = 'wall') {
            var el = document.getElementById('maze').appendChild(document.createElement("div"));
            el.className = 'block wall';
            el.setAttribute('id', y + '-' + x);
        }
    }

    function amaze(y, x, addBlockWalls) {
        maze[y][x] = 'maze';
        document.getElementById(y + '-' + x).className = 'block';
        if (addBlockWalls && valid(y + 1, x) && (maze[y + 1][x] == 'wall')) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && valid(y - 1, x) && (maze[y - 1][x] == 'wall')) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && valid(y, x + 1) && (maze[y][x + 1] == 'wall')) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && valid(y, x - 1) && (maze[y][x - 1] == 'wall')) walls.push([y, x - 1, [y, x]]);
    }

    function valid(a, b) {
        return (a < hate && a >= 0 && b < width && b >= 0) ? true : false;
    };

    amaze(currentPosition[0], currentPosition[1], true);

    while (walls.length != 0) {
        var randomWall = walls[Math.floor(Math.random() * walls.length)],
            host = randomWall[2],
            opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
        if (valid(opposite[0], opposite[1])) {
            if (maze[opposite[0]][opposite[1]] == 'maze') walls.splice(walls.indexOf(randomWall), 1);
            else amaze(randomWall[0], randomWall[1], false), amaze(opposite[0], opposite[1], true);
        } else walls.splice(walls.indexOf(randomWall), 1);
    }

    document.getElementById('0-0').className = 'block me';

    document.getElementById((parseInt(hate) - 1) + '-' + (parseInt(width) - 1)).className = 'block finish';

    document.body.onkeydown = function (e) {
        var newPosition = [currentPosition[0] + ((e.keyCode - 39) % 2), currentPosition[1] + ((e.keyCode - 38) % 2)];
        if (valid(newPosition[0], newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') {
            document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block';
            currentPosition = newPosition;
            document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block me';
            if (currentPosition[0] == hate - 1 && currentPosition[1] == width - 1) document.getElementById('complete').setAttribute('style', 'display:block');
        }
    }
};

createMaze(10, 10, [], [], [0, 0]);
*/



class Maze {
    constructor(height, width, maze, walls, currentPosition) {
        this.height = height % 2 == 0 ? height + 1 : height;
        this.width = width % 2 == 0 ? width + 1 : width;
        this.maze = maze;
        this.walls = walls;
        this.currentPosition = currentPosition;

        // this is also set in the CSS under .block
        this.blockHeight = 20;
        this.blockWidth = 20;
    }

    createMaze() {
        let self = this;

        const mazeElement = document.getElementById('maze');
        mazeElement.setAttribute('style', 'height:' + this.height * this.blockHeight + 'px; width:' + this.width * this.blockWidth + 'px');

        for (var y = 0; y < this.height; y++) {
            this.maze[y] = [];
            for (var x = 0; x < this.width; this.maze[y][x++] = 'wall') {
                var el = mazeElement.appendChild(document.createElement("div"));
                el.className = 'block wall';
                el.setAttribute('id', y + '-' + x);
            }
        }

        this.amaze(this.currentPosition.y, this.currentPosition.x, true);


        while (this.walls.length != 0) {
            var randomWall = this.walls[Math.floor(Math.random() * this.walls.length)],
                host = randomWall[2],
                opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
            if (this.valid(opposite[0], opposite[1])) {
                if (this.maze[opposite[0]][opposite[1]] == 'maze') this.walls.splice(this.walls.indexOf(randomWall), 1);
                else this.amaze(randomWall[0], randomWall[1], false), this.amaze(opposite[0], opposite[1], true);
            } else this.walls.splice(this.walls.indexOf(randomWall), 1);
        }

        document.getElementById('0-0').className = 'block me';

        document.getElementById((parseInt(this.height) - 1) + '-' + (parseInt(this.width) - 1)).className = 'block finish';

        document.body.onkeydown = function (e) {
            switch (e.keyCode) {
                case 38:
                    self.moveUp();
                    break;
                case 40:
                    self.moveDown();
                    break;
                case 39:
                    self.moveRight();
                    break;
                case 37:
                    self.moveLeft();
                    break;
            }
            // var newPosition = self.createNewPosition(e.keyCode);
            //self.movePlayer(self, self.currentPosition, newPosition);
        }

    }

    movePlayer(maze, oldPosition, newPosition) {

        if (maze.valid(newPosition.y, newPosition.x) && maze.maze[newPosition.y][newPosition.x] != 'wall') {

            document.getElementById(oldPosition.y + '-' + oldPosition.x).className = 'block';
            // update current position
            maze.currentPosition = newPosition;
            document.getElementById(newPosition.y + '-' + newPosition.x).className = 'block me';
            if (maze.isFinished()) {
                alert('finished')
                // document.getElementById('complete').setAttribute('style', 'display:block');
            }
        }

    }



    amaze(y, x, addBlockWalls) {
        let maze = this.maze;

        maze[y][x] = 'maze';
        document.getElementById(y + '-' + x).className = 'block';
        if (addBlockWalls && this.valid(y + 1, x) && (this.maze[y + 1][x] == 'wall')) this.walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && this.valid(y - 1, x) && (this.maze[y - 1][x] == 'wall')) this.walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && this.valid(y, x + 1) && (this.maze[y][x + 1] == 'wall')) this.walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && this.valid(y, x - 1) && (this.maze[y][x - 1] == 'wall')) this.walls.push([y, x - 1, [y, x]]);
    }

    valid(a, b) {
        return (a < this.height && a >= 0 && b < this.width && b >= 0) ? true : false;
    };

    isFinished() {
        return (this.currentPosition.y == this.height - 1 && this.currentPosition.x == this.width - 1);
    }
    /**
     *  control functions
     */
    moveDown() {
        const newPosition = { x: this.currentPosition.x, y: this.currentPosition.y + 1 };
        // const newPosition = this.createNewPosition('down');
        this.movePlayer(this, this.currentPosition, newPosition);
    }
    moveUp() {
        const newPosition = { x: this.currentPosition.x, y: this.currentPosition.y - 1 };
        // const newPosition = this.createNewPosition('down');
        this.movePlayer(this, this.currentPosition, newPosition);
    }
    moveRight() {
        const newPosition = { x: this.currentPosition.x + 1, y: this.currentPosition.y };
        // const newPosition = this.createNewPosition('down');
        this.movePlayer(this, this.currentPosition, newPosition);
    }
    moveLeft() {
        const newPosition = { x: this.currentPosition.x - 1, y: this.currentPosition.y };
        // const newPosition = this.createNewPosition('down');
        this.movePlayer(this, this.currentPosition, newPosition);
    }
}


/**
 * Creating the maze
 */

let startPosition = { x: 0, y: 0 };
const mazeWidth = 5;
const mazeHeight = 5;
const maze = new Maze(mazeHeight, mazeWidth, [], [], startPosition);
maze.createMaze();


/**
 * UI buttons events
 */

document.querySelector('.down').addEventListener('click', function () { maze.moveDown() });
document.querySelector('.up').addEventListener('click', function () { maze.moveUp() });
document.querySelector('.right').addEventListener('click', function () { maze.moveRight() });
document.querySelector('.left').addEventListener('click', function () { maze.moveLeft() });
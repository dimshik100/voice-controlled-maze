// maze generator from 
// https://codepen.io/nicothin/pen/BzaQGZ

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



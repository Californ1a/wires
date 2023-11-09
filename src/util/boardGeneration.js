/* eslint-disable max-classes-per-file, import/prefer-default-export */
export function formatBoard(board) {
  console.log(board);
  const colorMapping = {
    y: 'yellow',
    r: 'red',
    b: 'blue',
    o: 'orange',
    v: 'purple',
    p: 'pink',
    g: 'green',
    lb: 'lightblue',
    gr: 'grey',
  };
  const formattedBoard = [];
  for (let i = 0; i < board.length; i += 1) {
    const row = [];
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === null) {
        row.push(null);
      } else if (typeof board[i][j] === 'string') {
        if (board[i][j] === board[i][j].toLowerCase()) {
          row.push({
            color: colorMapping[board[i][j]],
            end: false,
          });
        } else {
          row.push({
            color: colorMapping[board[i][j].toLowerCase()],
            end: true,
          });
        }
      }
    }
    formattedBoard.push(row);
  }
  console.log(formattedBoard);
  return formattedBoard;
}

function pickAvailableSpots(board, numSpots = 2) {
  const spots = [];
  for (let i = 0; i < numSpots; i += 1) {
    const x = Math.floor(Math.random() * board.length);
    const y = Math.floor(Math.random() * board.length);
    if (board[x][y].color === null) {
      spots.push({ x, y });
    } else {
      i -= 1;
    }
  }
  return spots;
}

function findMinDistanceBetweenSpots(board, spots) {
  let minDistance = Infinity;
  for (let i = 0; i < spots.length; i += 1) {
    for (let j = i + 1; j < spots.length; j += 1) {
      const distance = Math.abs(spots[i].x - spots[j].x) + Math.abs(spots[i].y - spots[j].y);
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
  }
  return minDistance;
}

class AStar {
  constructor(board, start, end) {
    this.board = board;
    this.start = start;
    this.end = end;
    this.openSet = [start];
    this.closedSet = [];
    this.path = [];
    this.current = null;
  }

  findPath() {
    while (this.openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < this.openSet.length; i += 1) {
        if (this.openSet[i].f < this.openSet[winner].f) {
          winner = i;
        }
      }
      this.current = this.openSet[winner];
      if (this.current.x === this.end.x && this.current.y === this.end.y) {
        // console.log('DONE!');
        let temp = this.current;
        this.path.push(temp);
        while (temp.previous) {
          this.path.push(temp.previous);
          temp = temp.previous;
        }
        return this.path;
      }
      this.openSet = this.openSet.filter((cell) => cell !== this.current);
      // console.log('this.openSet', this.openSet.length);
      this.closedSet.push(this.current);
      const neighbors = this.current.getNeighbors(this.board);
      // console.log('neighbors', neighbors.length);
      for (let i = 0; i < neighbors.length; i += 1) {
        const neighbor = neighbors[i];
        // console.log(neighbor, neighbors);
        if (!this.closedSet.includes(neighbor) && !neighbor.blocked && !neighbor.color) {
          // console.log('neighbor', neighbor);
          const tempG = this.current.g + 1;
          let newPath = false;
          if (this.openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            this.openSet.push(neighbor);
          }
          if (newPath) {
            neighbor.h = this.heuristic(neighbor, this.end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = this.current;
          }
        }
      }
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  heuristic(a, b) {
    // calculates the Manhattan distance between two cells
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.blocked = false;
    this.previous = null;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.color = null;
  }

  getNeighbors(board) {
    const neighbors = [];
    const { x, y } = this;
    if (x > 0) {
      neighbors.push(board[x - 1][y]);
    }
    if (x < board.length - 1) {
      neighbors.push(board[x + 1][y]);
    }
    if (y > 0) {
      neighbors.push(board[x][y - 1]);
    }
    if (y < board.length - 1) {
      neighbors.push(board[x][y + 1]);
    }
    return neighbors;
  }
}

function countPathNeighbors(path, cell) {
  let count = 0;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // Up, Down, Left, Right
  for (const [dx, dy] of directions) {
    const neighborX = cell.x + dx;
    const neighborY = cell.y + dy;
    if (path.some((p) => p.x === neighborX && p.y === neighborY)) {
      count += 1;
    }
  }
  return count;
}

function generateLongestPathFromPoint(board, start) {
  const visited = board.map((row) => row.map(() => false));
  let longestPath = [];
  const path = [];

  function dfs(x, y) {
    visited[x][y] = true;
    path.push(board[x][y]);

    if (path.length > longestPath.length) {
      longestPath = [...path];
    }

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]; // Up, Down, Left, Right
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const potentialCell = {
        x: newX,
        y: newY,
      };
      if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length
        && !visited[newX][newY] && !board[newX][newY].blocked && !board[newX][newY].color
        && countPathNeighbors(path, potentialCell) <= 1) {
        dfs(newX, newY);
      }
    }

    path.pop();
    visited[x][y] = false;
  }

  dfs(start.x, start.y);
  return longestPath;
}

function generateAStarPath(board, start, end) {
  const startCell = new Cell(start.x, start.y);
  const endCell = new Cell(end.x, end.y);
  const astar = new AStar(board, startCell, endCell);
  // console.log(`Finding path between [${start.x}][${start.y}] and [${end.x}][${end.y}]`);
  const path = astar.findPath();
  return path;
}

function generateShortWire(board, color, attempts = 0) {
  // console.log('spots', spots.map((spot) => ` [$ { spot.x }][$ { spot.y }] `));
  const absoluteMinDistance = 3;
  let minDistance = 0;
  let spots = [];
  while (minDistance <= absoluteMinDistance) {
    spots = pickAvailableSpots(board);
    minDistance = findMinDistanceBetweenSpots(board, spots);
    // console.log(`minDistance ${minDistance} <= absoluteMinDistance ${absoluteMinDistance}`);
  }
  // console.log('minDistance', minDistance);
  const path = generateAStarPath(board, spots[0], spots[1]);
  if (!path || path.length < minDistance) {
    // const spot1 = `[${spots[0].x}][${spots[0].y}]`;
    // const spot2 = `[${spots[1].x}][${spots[1].y}]`;
    // console.log(`No path exists between ${spot1} and ${spot2}`);
    if (attempts < 100) {
      return generateShortWire(board, color, attempts + 1);
    }
    return null;
  }
  // console.log('path', path.map((cell) => ` [$ { cell.x }][$ { cell.y }] `));
  const wire = [];
  for (let i = 0; i < path.length; i += 1) {
    path[i].color = color;
    board.flat().filter((cell) => cell.x === path[i].x && cell.y === path[i].y)[0].color = color;
    wire.push(path[i]);
  }
  return wire;
}

function generateLongWire(board, color) {
  const nullCells = [];
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j].color === null) {
        nullCells.push(board[i][j]);
      }
    }
  }
  let longestPath = [];
  for (const cell of nullCells) {
    const path = generateLongestPathFromPoint(board, cell);
    if (path.length > longestPath.length) {
      longestPath = path;
    }
  }
  if (longestPath.length <= 3) {
    console.log('No path exists for the given grid.');
    return null;
  }
  const wire = [];
  for (let i = 0; i < longestPath.length; i += 1) {
    longestPath[i].color = color;
    const { x, y } = longestPath[i];
    board.flat().filter((cell) => cell.x === x && cell.y === y)[0].color = color;
    wire.push(longestPath[i]);
  }
  return wire;
}

function generateWire(board, color, lastColor = false, attempts = 0) {
  // console.log('lastColor', lastColor);
  if (!lastColor) {
    return generateShortWire(board, color, attempts);
  }

  // for the last color we want to find the longest path
  return generateLongWire(board, color);
}

export function createBoard(size) {
  const board = Array.from({ length: size }, () => Array(size).fill(null));
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      board[i][j] = new Cell(i, j);
    }
  }
  return board;
}

export function generateWires(board, colors, attempts = 0) {
  const wires = {};
  for (let i = 0; i < colors.length; i += 1) {
    // console.log(`Generating ${colors[i]} wire`);
    const lastColor = (i >= colors.length - 3);
    const wire = generateWire(board, colors[i], lastColor);
    if (wire === null && attempts < 100) {
      console.log('wire is null, starting over');
      return generateWires(createBoard(board.length), colors, attempts + 1);
    }
    if (wire === null) {
      return null;
    }
    wires[colors[i]] = wire;
    console.log(`${colors[i]} wire`, wire.map((cell) => `[${cell.x}][${cell.y}]`));
  }
  return wires;
}

export function applyWiresToBoard(board, wires) {
  const b = Array.from({ length: board.length }, () => Array(board.length).fill(null));
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const wire in wires) {
    for (let i = 0; i < wires[wire].length; i += 1) {
      const cell = wires[wire][i];
      if (i === 0 || i === wires[wire].length - 1) {
        b[cell.x][cell.y] = wire.toUpperCase();
      } else {
        b[cell.x][cell.y] = wire;
      }
    }
  }
  return b;
}

// const board = createBoard(7);
// const colors = ['y', 'r', 'b', 'o', 'v', 'p', 'g'].sort(() => Math.random() - 0.5);

// const generatedWires = generateWires(board, colors);
// const generatedBoard = applyWiresToBoard(board, generatedWires);

// console.log('generatedBoard', generatedBoard);

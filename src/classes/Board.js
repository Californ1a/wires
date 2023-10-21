import Cell from '@/classes/Cell';
import testBoards from '@/util/testBoards';

export default class Board {
  constructor(board = [], boardSize = 7, wireCount = 7) {
    this.board = board;
    this.boardSize = boardSize;
    this.wireCount = wireCount;
    this.index = 0;
    this.wireColors = [];
    this.wires = new Map();
    this.init();
  }

  init() {
    for (let i = 0; i < this.boardSize; i += 1) {
      this.board[i] = [];
      for (let j = 0; j < this.boardSize; j += 1) {
        this.board[i][j] = new Cell(i, j);
      }
    }
  }

  setBoard(board) {
    if (board.flat().includes(null)) throw new Error('board must not contain null values');
    this.wireColors = [...new Set(board.flat().map((cell) => cell.color)
      .filter((color) => color !== undefined))];
    this.wireCount = this.wireColors.length;
    this.boardSize = board.length;
    this.board = [];
    this.init();
    for (let i = 0; i < this.boardSize; i += 1) {
      for (let j = 0; j < this.boardSize; j += 1) {
        if (board[i][j] !== null) {
          if (typeof board[i][j] === 'string') {
            if (!this.wires.has(board[i][j])) {
              this.board[i][j].setWire(board[i][j]);
              this.board[i][j].wire.addCell(this.board[i][j]);
              this.wires.set(board[i][j], this.board[i][j].wire);
            } else {
              this.board[i][j].setWire(this.wires.get(board[i][j]));
              this.board[i][j].wire.addCell(this.board[i][j]);
            }
          } else if (typeof board[i][j] === 'object') {
            if (!this.wires.has(board[i][j].color)) {
              this.board[i][j].setWire(board[i][j].color);
              this.board[i][j].wire.addCell(this.board[i][j]);
              this.wires.set(board[i][j].color, this.board[i][j].wire);
            } else {
              this.board[i][j].setWire(this.wires.get(board[i][j].color));
              this.board[i][j].wire.addCell(this.board[i][j]);
            }
            this.board[i][j].end = board[i][j].end;
            this.board[i][j].visible = board[i][j].end;
            if (board[i][j].end) {
              this.board[i][j].displayColor = board[i][j].color;
            }
          }
        }
      }
    }
  }

  seedTestBoard() {
    // mod on testBoards.length to loop through testBoards
    this.setBoard(testBoards[this.index]);
    this.index = (this.index + 1) % testBoards.length;
  }

  getCellNeighbors(cell) {
    const neighbors = [];
    const { x, y } = cell.getCoordinates();
    if (x > 0) {
      neighbors.push(this.board[x - 1][y]);
    }
    if (x < this.boardSize - 1) {
      neighbors.push(this.board[x + 1][y]);
    }
    if (y > 0) {
      neighbors.push(this.board[x][y - 1]);
    }
    if (y < this.boardSize - 1) {
      neighbors.push(this.board[x][y + 1]);
    }
    return neighbors;
  }

  checkForWin() {
    const flatBoard = this.board.flat();
    const visibleCells = flatBoard.filter((cell) => cell.visible);
    if (visibleCells.length !== flatBoard.length) return false;
    for (const cell of flatBoard) {
      if (cell.displayColor !== cell.wire.color) return false;
    }
    return true;
  }
}

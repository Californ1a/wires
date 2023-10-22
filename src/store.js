import { defineStore } from 'pinia';
import { ref } from 'vue';
import Board from '@/classes/Board';

export default defineStore('main', () => {
  const game = ref(new Board());
  const dev = ref(false);

  function setDev(isDev) {
    dev.value = isDev;
  }

  function toggleCell(theCell) {
    if (theCell.end) return;
    for (const row of game.value.board) {
      for (const cell of row) {
        if (cell.x === theCell.x && cell.y === theCell.y) {
          cell.setVisible(!cell.visible);
        }
      }
    }
  }

  function seedTestBoard() {
    game.value.seedTestBoard();
  }

  function getColorList() {
    return game.value.wireColors;
  }

  function setDisplayColor(theCell, color) {
    if (theCell.end) return;
    for (const row of game.value.board) {
      for (const cell of row) {
        // eslint-disable-next-line no-continue
        if (cell.end) continue;
        if (cell.x === theCell.x && cell.y === theCell.y) {
          cell.wireDirection = {
            up: false,
            down: false,
            left: false,
            right: false,
          };
          if (cell.displayColor) {
            cell.displayColor = null;
            cell.visible = false;
          } else {
            cell.displayColor = color;
            cell.visible = true;
          }
        }
      }
    }
  }

  function clearDisplayColor(theCell) {
    if (!theCell.displayColor) return;
    const color = theCell.displayColor;
    for (const row of game.value.board) {
      for (const cell of row) {
        // eslint-disable-next-line no-continue
        if (cell.end || cell.displayColor !== color) continue;
        cell.displayColor = null;
        cell.visible = false;
        cell.wireDirection = {
          up: false,
          down: false,
          left: false,
          right: false,
        };
      }
    }
  }

  const getCellFromCoords = (x, y) => game.value.board[x]?.[y];
  const checkForWin = () => game.value.checkForWin();

  return {
    game,
    dev,
    toggleCell,
    seedTestBoard,
    getColorList,
    clearDisplayColor,
    getCellFromCoords,
    checkForWin,
    setDisplayColor,
    setDev,
  };
});

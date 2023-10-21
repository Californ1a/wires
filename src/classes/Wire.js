export default class Wire {
  constructor(color) {
    this.isConnected = false;
    this.color = color ?? null;
    this.cells = [];
  }

  setConnected(isConnected) {
    this.isConnected = isConnected;
  }

  getConnected() {
    return this.isConnected;
  }

  setCells(cells) {
    this.cells = cells;
  }

  addCell(cell) {
    const cellId = `${cell.x},${cell.y}`;
    if (this.cells.some((c) => `${c.x},${c.y}` === cellId)) return;
    this.cells.push(cell);
  }
}

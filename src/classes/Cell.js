import Wire from '@/classes/Wire';

export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wire = null;
    this.blocked = false;
    this.visible = false;
    this.end = false;
    this.isPowered = false;
    this.displayColor = null;
    this.wireDirection = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  setWire(wire) {
    if (wire instanceof Wire) {
      this.wire = wire;
    } else if (typeof wire === 'string') {
      this.wire = new Wire(wire);
    } else {
      throw new Error('wire must be an instance of Wire or a string');
    }
  }

  setPowered(isPowered) {
    if (typeof isPowered !== 'boolean') throw new Error('isPowered must be a boolean');
    this.isPowered = isPowered;
  }

  setEnd(end) {
    if (typeof end !== 'boolean') throw new Error('end must be a boolean');
    this.end = end;
  }

  setVisible(visible) {
    if (typeof visible !== 'boolean') throw new Error('visible must be a boolean');
    this.visible = visible;
  }

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  toString() {
    return this.wire?.color;
  }
}

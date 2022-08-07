class Stack {
  constructor() {
    this._array = new Array();
  }

  push(object) {
    this._array.push(object);
  }

  pop() {
    return this._array.pop();
  }

  peek() {
    return this._array[this._array.length - 1];
  }

  size() {
    return this._array.length;
  }
}

module.exports = Stack;

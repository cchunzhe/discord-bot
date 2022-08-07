class Queue {
  constructor() {
    this._array = new Array();
  }

  enqueue(object) {
    this._array.push(object);
  }

  dequeue() {
    return this._array.shift();
  }

  get(index) {
    return this._array[index];
  }

  size() {
    return this._array.length;
  }
}

module.exports = Queue;

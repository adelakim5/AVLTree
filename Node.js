class Node {
  constructor(key, value, height) {
    this.id = key;
    this.name = value;
    this.height = height;
    this.left = null;
    this.right = null;
  }
}

module.exports = Node;

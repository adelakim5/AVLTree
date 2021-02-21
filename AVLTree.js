const Node = require("./Node.js");

class AVLTree {
  constructor() {
    this.root = null;
  }

  rotateRight(node) {
    const x = node.left;
    node.left = x.right;
    x.right = node;
    node.height = this.tallerHeight(this.height(node.left), this.height(node.right)) + 1;
    x.height = this.tallerHeight(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }

  rotateLeft(node) {
    const x = node.right;
    node.right = x.left;
    x.left = node;
    node.height = this.tallerHeight(this.height(node.left), this.height(node.right)) + 1;
    x.height = this.tallerHeight(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }

  tallerHeight(a, b) {
    return Math.max(a, b);
  }

  height(node) {
    if (!node) return 0;
    return node.height;
  }

  put(key, value) {
    this.root = this.trickleDown(this.root, key, value);
  }

  compareTo(key, id) {
    if (key > id) return 1;
    if (key === id) return 0;
    if (key < id) return -1;
  }

  trickleDown(node, key, value) {
    if (!node) return new Node(key, value, 1);
    const t = this.compareTo(key, node.id);
    if (t > 0) {
      node.right = this.trickleDown(node.right, key, value);
    } else if (t < 0) {
      node.left = this.trickleDown(node.left, key, value);
    } else {
      node.name = value;
      return node;
    }
    node.height = this.tallerHeight(this.height(node.left), this.height(node.right)) + 1;
    return this.balance(node);
  }

  balance(node) {
    if (this.bf(node) > 1) {
      // heavy on left
      if (this.bf(node.left) < 0) node.left = this.rotateLeft(node.left); // node.left has heavy right-tree
      node = this.rotateRight(node);
    } else if (this.bf(node) < -1) {
      // heavy on right
      if (this.bf(node.right) > 0) node.right = this.rotateRight(node.right); // node.right has heavy left-tree
      node = this.rotateLeft(node);
    }
    return node;
  }

  bf(node) {
    return this.height(node.left) - this.height(node.right);
  }
}

module.exports = AVLTree;

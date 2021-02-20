const Node = require("./Node.js");

class AVLTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  insert(data) {
    const node = new Node(data);
    if (!this.root) {
      this.root = node;
      this.size++;
      return;
    }
    this.trickleDown(node, this.root);
  }

  trickleDown(node, root) {
    if (node.data > root.data) {
      // go right
      root.rightChildCnt++;
      if (root.getBF() >= 2) {
        // turn
        if (root.right.data < node.data) {
          // rr turn
          this.turnRR(node, root);
        } else if (root.right.data > node.data) {
          // rl turn

          const temp = root.right;
          root.right = node;
          root.right.leftChildCnt = temp.leftChildCnt;
          root.right.rightChildCnt = temp.rightChildCnt;
          root.right = temp.right;
          root.left = temp.left;
          this.trickleDown(temp, root);
        }
      } else {
        if (root.right) this.trickleDown(node, root.right);
        else {
          root.right = node;
          this.size++;
          return;
        }
      }
    } else if (node.data < root.data) {
      // go left
      root.leftChildCnt++;
      if (root.getBF() >= 2) {
        if (root.left.data > node.data) {
          this.turnLL(node, root);
        } else if (root.left.data < node.data) {
          // this.turnLL(node, root);
          const temp = root.left;
          root.left = node;
          root.left.leftChildCnt = temp.leftChildCnt;
          root.left.rightChildCnt = temp.rightChildCnt;
          root.left = temp.left;
          root.right = temp.right;
          this.trickleDown(temp, root);
        }
      } else {
        if (root.left) this.trickleDown(node, root.left);
        else {
          root.left = node;
          this.size++;
          return;
        }
      }
    }
  }

  turnRR(node, root) {
    const temp = root;
    // root left 있는지 확인해야 함
    root = root.right;
    if (temp === this.root) this.root = root;
    if (temp === this.root.left) this.root.left = root;
    if (temp === this.root.right) this.root.right = root;
    root.left = temp;
    if (temp.rightChildCnt) temp.rightChildCnt--;
    root.leftChildCnt = temp.leftChildCnt + 1;
    root.left.right = null;
    root.left.rightChildCnt = 0;
    this.trickleDown(node, root);
  }

  turnLL(node, root) {
    const temp = root;
    root = root.left;
    if (temp === this.root) this.root = root;
    if (temp === this.root.left) this.root.left = root;
    if (temp === this.root.right) this.root.right = root;
    root.right = temp;
    if (temp.leftChildCnt) temp.leftChildCnt--;
    root.rightChildCnt = temp.rightChildCnt + 1;
    root.right.left = null;
    root.right.leftChildCnt = 0;
    this.trickleDown(node, root);
  }
}

// const data = [50, 60, 70, 80, 40];
const data = [50, 60, 70, 90, 80, 75, 73, 72, 78];

const avl = new AVLTree();
data.forEach((e) => avl.insert(e));
console.log(avl.root);

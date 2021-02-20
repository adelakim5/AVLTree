class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.leftChildCnt = 0;
    this.right = null;
    this.rightChildCnt = 0;
  }

  getBF() {
    return Math.abs(this.leftChildCnt - this.rightChildCnt);
  }
}

module.exports = Node;

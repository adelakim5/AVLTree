const AVLTree = require("./AVLTree.js");

const data = [50, 60, 70, 90, 80, 75, 73, 72, 78];
const avl = new AVLTree();
data.forEach((e) => avl.put(e, e));
console.log(avl);

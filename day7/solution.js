import { input } from "./input.js";

const structure = input.split("\n");

class TreeNode {
  parent = null;
  children = [];
  weight = null;
  originalWeight = null;

  constructor(name) {
    this.name = name;
  }
}

const nodes = [];

// --- PART 1 ---

for (const struct of structure) {
  const [parent, children] = struct.split(" -> ");
  const [name, weight] = parent.replace("(", "").replace(")", "").split(" ");

  let parentNode = nodes.find((x) => x.name === name);

  if (!parentNode) {
    parentNode = new TreeNode(name);
    nodes.push(parentNode);
  }

  parentNode.weight = parseInt(weight);
  parentNode.originalWeight = parseInt(weight);

  if (children) {
    for (const child of children.split(", ")) {
      let childNode = nodes.find((x) => x.name === child);

      if (!childNode) {
        childNode = new TreeNode(child);
        nodes.push(childNode);
      }

      childNode.parent = parentNode;
      parentNode.children.push(childNode);
    }
  }
}

console.log(nodes.find((x) => !x.parent).name);

// --- PART 2 ---

const haveSameWeight = (children) =>
  children.every(
    (x) =>
      new Set(
        children
          .filter((y) => y.parent.name === x.parent.name)
          .map((y) => y.weight)
      ).size === 1
  );

const root = nodes.find((x) => !x.parent);

const traverseWeights = (node) => {
  node.children.forEach((x) => {
    traverseWeights(x);
  });

  if (node.parent) node.parent.weight += node.weight;
};

traverseWeights(root);

const traverse = (node) => {
  if (haveSameWeight(node.children)) return 0;

  const wrongChild = node.children.find(
    (x) => node.children.filter((y) => y.weight === x.weight).length === 1
  );

  const value = traverse(wrongChild);

  if (value) return value;

  const correctChild = node.children.find((x) => x.name !== wrongChild.name);

  return wrongChild.originalWeight + (correctChild.weight - wrongChild.weight);
};

console.log(traverse(root));

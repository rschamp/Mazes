import { makeBinaryTree } from "./binary-tree";
import {
  getDistancesFor,
  getMaxDistance,
  getPathBetween,
  makeDistanceRenderer,
} from "./distances";
import { createGrid, gridToString } from "./grid";

const grid = createGrid(10, 10);
makeBinaryTree(grid);
const distances = getDistancesFor(grid.cells[0]);
const [newStart] = getMaxDistance(distances);

const newDistances = getDistancesFor(newStart);

const [goal, distance] = getMaxDistance(newDistances);

const longestPath = getPathBetween(newStart, goal);

console.log(gridToString(grid, makeDistanceRenderer(longestPath)));

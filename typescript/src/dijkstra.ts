import { makeBinaryTree } from "./binary-tree";
import {
  getDistancesFor,
  getPathBetween,
  makeDistanceRenderer,
} from "./distances";
import { createGrid, gridToString } from "./grid";
import { makeSidewinder } from "./sidewinder";
import { sample } from "./util";

const grid = createGrid(14, 14);
makeSidewinder(grid);

// const distances = getPathBetween(grid.cells[0], sample(grid.cells));
const distances = getPathBetween(
  grid.cells[0],
  grid.cells[grid.cells.length - 1]
);
// const distances = getPathBetween(sample(grid.cells), sample(grid.cells));
// const distances = getDistancesFor(sample(grid.cells));

console.log(gridToString(grid, makeDistanceRenderer(distances)));

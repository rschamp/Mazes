import { makeBinaryTree } from "./binary-tree";
import { createGrid, gridToString } from "./grid";
import { makeSidewinder } from "./sidewinder";

const grid = createGrid(25, 50);

makeSidewinder(grid);

console.log(gridToString(grid));

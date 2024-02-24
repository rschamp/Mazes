import { makeAldousBroder } from "./aldous-broder";
import { makeBinaryTree } from "./binary-tree";
import { createGrid, gridToString } from "./grid";
import { makeSidewinder } from "./sidewinder";
import { makeWilsons } from "./wilsons";

const grid = createGrid(20, 20);

makeWilsons(grid);

console.log(gridToString(grid));

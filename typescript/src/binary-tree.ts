import { linkCells } from "./cell";
import { Grid } from "./grid";
import { sample } from "./util";

function makeBinaryTree(grid: Grid): void {
  grid.cells.forEach((cell) => {
    const neighbors = [cell.north, cell.east].filter(Boolean);
    const neighbor = sample(neighbors);

    if (neighbor) linkCells(cell, neighbor, true);
  });
}

export { makeBinaryTree };

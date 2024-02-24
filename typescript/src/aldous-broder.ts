import { Cell, getNeighbors, linkCells } from "./cell";
import { Grid, gridToString } from "./grid";
import { sample } from "./util";

function makeAldousBroder(grid: Grid, animate = false): void {
  let cell: Cell = sample(grid.cells);
  let unvisited = grid.cells.length - 1;
  while (unvisited > 0) {
    if (animate)
      console.log(
        gridToString(grid, (c) =>
          c === cell ? "X" : c.links.size === 0 ? "█" : " "
        )
      );
    let neighbor = sample(getNeighbors(cell));
    if (neighbor.links.size === 0) {
      linkCells(cell, neighbor);
      unvisited -= 1;
    }
    cell = neighbor;
  }
}

export { makeAldousBroder };

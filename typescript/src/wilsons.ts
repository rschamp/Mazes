import { getNeighbors, linkCells } from "./cell";
import { Grid } from "./grid";
import { sample } from "./util";

function makeWilsons(grid: Grid): void {
  const unvisited = grid.cells.map((c) => c);
  const first = sample(unvisited);
  unvisited.splice(unvisited.indexOf(first), 1);
  while (unvisited.length > 0) {
    let cell = sample(unvisited);
    let path = [cell];
    while (unvisited.indexOf(cell) !== -1) {
      cell = sample(getNeighbors(cell));
      const position = path.indexOf(cell);
      if (position > -1) {
        path = path.slice(0, position + 1);
      } else {
        path.push(cell);
      }
    }

    path.forEach((pathCell, index) => {
      if (path[index + 1]) {
        linkCells(pathCell, path[index + 1]);
        unvisited.splice(unvisited.indexOf(pathCell), 1);
      }
    });
  }
}
export { makeWilsons };

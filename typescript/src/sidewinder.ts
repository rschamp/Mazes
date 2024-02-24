import { Cell, linkCells } from "./cell";
import { Grid, atRowStart } from "./grid";
import { sample } from "./util";

function makeSidewinder(grid: Grid): void {
  let run: Cell[] = [];
  grid.cells.forEach((cell, index) => {
    run.push(cell);
    const atEasternBoundary = !cell.east;
    const atNorthernBoundary = !cell.north;
    const shouldCloseOut =
      atEasternBoundary || (!atNorthernBoundary && Math.random() < 0.75);

    if (shouldCloseOut) {
      const member = sample(run);
      if (member.north) linkCells(member, member.north);
      run.forEach((cell, i) => {
        if (run[i - 1]) linkCells(cell, run[i - 1]);
      });
      run = [];
    }
  });
}

export { makeSidewinder };

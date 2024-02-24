import { Cell, createCell, linked, wallBetween } from "./cell";

interface Grid {
  rows: number;
  columns: number;
  cells: Cell[];
}

function prepareGrid(rows: number, columns: number): Grid {
  return {
    rows,
    columns,
    cells: Array.from({ length: rows * columns }, (_, i) =>
      createCell(Math.floor(i / rows), i % columns)
    ),
  };
}

function configureCells(grid: Grid): void {
  grid.cells.forEach((cell, index) => {
    const row = Math.floor(index / grid.columns);
    const column = index % grid.columns;
    cell.north = getCell(grid, row - 1, column);
    cell.south = getCell(grid, row + 1, column);
    cell.west = getCell(grid, row, column - 1);
    cell.east = getCell(grid, row, column + 1);
  });
}

function getCell(grid: Grid, row: number, column: number): Cell | null {
  if (row < 0 || row >= grid.rows || column < 0 || column >= grid.columns) {
    return null;
  }
  const index = row * grid.columns + column;
  return grid.cells[index];
}

function atRowStart(grid: Grid, index: number): boolean {
  return index % grid.columns === 0;
}

function defaultRenderCell(cell: Cell): string {
  return " ";
}

function gridToString(grid: Grid, renderCell = defaultRenderCell): string {
  let output = "";
  let top = "";
  let mid = "";
  let bot = "";
  grid.cells.forEach((cell, index) => {
    let nw, n, ne, w, body, e, sw, s, se;

    nw =
      index >= grid.columns
        ? ""
        : linked(cell, cell.west)
        ? "━"
        : cell.west
        ? "┳"
        : "┏";
    n = index >= grid.columns ? "" : "━━━";
    ne = index != grid.columns - 1 ? "" : "┓";

    w = linked(cell, cell.west) ? " " : "┃";
    body = ` ${renderCell(cell)} `;
    e = index % grid.columns !== grid.columns - 1 ? "" : "┃";

    sw = wallBetween(cell.west, cell.west?.south)
      ? wallBetween(cell.south, cell.south?.west)
        ? wallBetween(cell, cell.south)
          ? wallBetween(cell, cell.west)
            ? "╋"
            : "┳"
          : wallBetween(cell, cell.west)
          ? "┫"
          : "┓"
        : wallBetween(cell, cell.south)
        ? wallBetween(cell, cell.west)
          ? "┻"
          : "━"
        : wallBetween(cell, cell.west)
        ? "┛"
        : "╸"
      : wallBetween(cell.south, cell.south?.west)
      ? wallBetween(cell, cell.south)
        ? wallBetween(cell, cell.west)
          ? "┣"
          : "┏"
        : wallBetween(cell, cell.west)
        ? "┃"
        : "╻"
      : wallBetween(cell, cell.south)
      ? wallBetween(cell, cell.west)
        ? "┗"
        : "╺"
      : wallBetween(cell, cell.west)
      ? "╹"
      : " ";
    s = linked(cell, cell.south) ? "   " : "━━━";
    se =
      index % grid.columns !== grid.columns - 1
        ? ""
        : cell.south
        ? wallBetween(cell, cell.south)
          ? "┫"
          : "┃"
        : "┛";

    top += `${nw}${n}${ne}`;
    mid += `${w}${body}${e}`;
    bot += `${sw}${s}${se}`;

    if ((index + 1) % grid.columns === 0) {
      output += top ? top + "\n" : "";
      output += mid + "\n";
      output += bot + "\n";
      top = mid = bot = "";
    }
  });
  return output;
}

function createGrid(rows: number, columns: number): Grid {
  const grid = prepareGrid(rows, columns);
  configureCells(grid);
  return grid;
}

export { Grid, createGrid, getCell, gridToString, atRowStart };

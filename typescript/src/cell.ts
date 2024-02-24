import { Distances, addDistance, createDistances } from "./distances";

interface Cell {
  row: number;
  column: number;
  north: Cell | null;
  south: Cell | null;
  west: Cell | null;
  east: Cell | null;
  links: Map<Cell, boolean>;
}

function createCell(row: number, column: number): Cell {
  return {
    row,
    column,
    north: null,
    south: null,
    west: null,
    east: null,
    links: new Map<Cell, boolean>(),
  };
}

function linkCells(cell1: Cell, cell2: Cell, bidi: boolean = true): void {
  cell1.links.set(cell2, true);
  if (bidi) {
    cell2.links.set(cell1, true);
  }
}

function unlinkCells(cell1: Cell, cell2: Cell, bidi: boolean = true): void {
  cell1.links.delete(cell2);
  if (bidi) {
    cell2.links.delete(cell1);
  }
}

function getLinkedCells(cell: Cell): Cell[] {
  return Array.from(cell.links.keys());
}

function linked(
  cell1: Cell | null | undefined,
  cell2: Cell | null | undefined
): boolean {
  if (!cell1 || !cell2) return false;
  return cell1.links.has(cell2);
}

function wallBetween(
  cell1: Cell | null | undefined,
  cell2: Cell | null | undefined
): boolean {
  if (!(cell1 || cell2)) return false;
  if ([cell1, cell2].some((c) => !c)) return true;
  if (getNeighbors(cell1!).indexOf(cell2 as Cell) === -1) return false;
  return !linked(cell1, cell2);
}

function getNeighbors(cell: Cell): Cell[] {
  const neighbors: Cell[] = [];
  if (cell.north) neighbors.push(cell.north);
  if (cell.south) neighbors.push(cell.south);
  if (cell.east) neighbors.push(cell.east);
  if (cell.west) neighbors.push(cell.west);
  return neighbors;
}

export {
  Cell,
  createCell,
  linkCells,
  unlinkCells,
  getLinkedCells,
  linked,
  getNeighbors,
  wallBetween,
};

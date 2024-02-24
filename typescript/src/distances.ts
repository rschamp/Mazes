import { Cell } from "./cell";

interface Distances {
  root: Cell;
  cells: Map<Cell, number>;
}

function createDistances(root: Cell): Distances {
  return {
    root,
    cells: new Map<Cell, number>([[root, 0]]),
  };
}

function addDistance(distances: Distances, cell: Cell, distance: number) {
  distances.cells.set(cell, distance);
}

function makeDistanceRenderer(distances: Distances) {
  return (cell: Cell) => {
    if (distances.cells.has(cell))
      return (distances.cells.get(cell)?.toString(36) ?? " ") as string;
    return " ";
  };
}

function getDistancesFor(root: Cell): Distances {
  const distances = createDistances(root);
  let frontier = [root];
  while (frontier.length > 0) {
    const newFrontier: Cell[] = [];
    frontier.forEach((cell) => {
      cell.links.forEach((_, linked) => {
        if (!distances.cells.has(linked)) {
          addDistance(distances, linked, (distances.cells.get(cell) || 0) + 1);
          newFrontier.push(linked);
        }
      });
    });
    frontier = newFrontier;
  }
  return distances;
}

function compareDistances(distances: Distances, cell1: Cell, cell2: Cell) {
  if (!distances.cells.has(cell1) || !distances.cells.has(cell2)) return 0;
  return distances.cells.get(cell1)! - distances.cells.get(cell2)!;
}

function getPathBetween(start: Cell, finish: Cell) {
  let current = finish;
  const distances = getDistancesFor(start);
  const breadcrumbs = createDistances(current);
  addDistance(breadcrumbs, current, distances.cells.get(current)!);
  while (current !== start) {
    current.links.forEach((_, neighbor) => {
      if (compareDistances(distances, neighbor, current) < 0) {
        addDistance(breadcrumbs, neighbor, distances.cells.get(neighbor)!);
        current = neighbor;
      }
    });
  }
  return breadcrumbs;
}

function getMaxDistance(distances: Distances): [Cell, number] {
  let maxDistance = 0;
  let maxCell = distances.root;

  distances.cells.forEach((distance, cell) => {
    if (distance > maxDistance) {
      maxCell = cell;
      maxDistance = distance;
    }
  });
  return [maxCell, maxDistance];
}

export {
  Distances,
  createDistances,
  addDistance,
  makeDistanceRenderer,
  getDistancesFor,
  getPathBetween,
  getMaxDistance,
};

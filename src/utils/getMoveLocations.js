// This code was writen by AI
const array = [
  ["P", "H", "H", "H", "H", "H", "P", "H", "H", "H", "H", "H", "P"],
  ["V", "B", "B", "B", "B", "B", "V", "B", "B", "B", "B", "B", "V"],
  ["V", "B", "P", "H", "H", "H", "P", "H", "H", "H", "P", "B", "V"],
  ["V", "B", "V", "B", "B", "B", "V", "B", "B", "B", "V", "B", "V"],
  ["V", "B", "V", "B", "P", "H", "P", "H", "P", "B", "V", "B", "V"],
  ["V", "B", "V", "B", "V", "B", "B", "B", "V", "B", "V", "B", "V"],
  ["P", "H", "P", "H", "P", "B", "B", "B", "P", "H", "P", "H", "P"],
  ["V", "B", "V", "B", "V", "B", "B", "B", "V", "B", "V", "B", "V"],
  ["V", "B", "V", "B", "P", "H", "P", "H", "P", "B", "V", "B", "V"],
  ["V", "B", "V", "B", "B", "B", "V", "B", "B", "B", "V", "B", "V"],
  ["V", "B", "P", "H", "H", "H", "P", "H", "H", "H", "P", "B", "V"],
  ["V", "B", "B", "B", "B", "B", "V", "B", "B", "B", "B", "B", "V"],
  ["P", "H", "H", "H", "H", "H", "P", "H", "H", "H", "H", "H", "P"],
];

const saveLocations = {};

const directionDelta = {
  left: [0, -1],
  right: [0, 1],
  up: [-1, 0],
  down: [1, 0],
};

// Function to check if a position is out of bounds or "B"
const isValidPosition = (row, col) => {
  return (
    row >= 0 &&
    row < array.length &&
    col >= 0 &&
    col < array[0].length &&
    array[row][col] !== "B"
  );
};

// Function to save the nearest "P" locations for a given "P" position
const traverseAndSave = (rowStart, colStart) => {
  const directions = ["left", "right", "up", "down"];
  const positionKey = `${rowStart},${colStart}`;
  saveLocations[positionKey] = [];

  for (const direction of directions) {
    const [rowDelta, colDelta] = directionDelta[direction];
    let currentRow = rowStart + rowDelta;
    let currentCol = colStart + colDelta;

    while (isValidPosition(currentRow, currentCol)) {
      if (array[currentRow][currentCol] === "P") {
        saveLocations[positionKey].push(`${currentRow},${currentCol}`);
        break;
      }
      currentRow += rowDelta;
      currentCol += colDelta;
    }
  }
};

// Traverse all even rows
export default function run() {
  for (let row = 0; row < array.length; row += 2) {
    for (let col = 0; col < array[row].length; col++) {
      if (array[row][col] === "P") {
        traverseAndSave(row, col);
      }
    }
  }

  // console.log(saveLocations);
  return saveLocations;
}

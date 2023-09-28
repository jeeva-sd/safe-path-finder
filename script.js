let M;
const numberOfMines = 10;

let destinationX;
let destinationY;

let mineCoordinatesX = [0, 1, 0, 3, 1, 4, 2, 0, 2, 4];
let mineCoordinatesY = [0, 0, 3, 1, 2, 2, 4, 5, 7, 8];
const A = [0, 20, 43, 31, 89, 56, 61, 49, 70, 99, 33];

function promptforPositiveIntegerM() {
  while (true) {
    M = parseInt(prompt('Enter the number of mines (between 5 and 10):'));
    if (M >= 5 && M <= 10) {
      calculateLandminePositions(M);
      break;
    } else {
      alert('Please enter a valid number between 5 and 10.');
    }
  }
}

function calculateLandminePositions(M) {
  for (let i = 0; i < numberOfMines; i++) {
    mineCoordinatesX[i] = Math.floor(A[i] / M);
    mineCoordinatesY[i] = A[i] % M;
  }
}

function generateMines() {
  const mines = {};

  for (let i = 1; i <= numberOfMines; i++) {
    const x = mineCoordinatesX[i];
    const y = mineCoordinatesY[i];
    mines[`${x},${y}`] = true;
  }

  return mines;
}

function markMines(mines) {
  const grid = document.getElementById('grid');
  const cells = grid.getElementsByClassName('cell');

  for (const cell of cells) {
    const position = cell.dataset.position;
    if (mines[position]) {
      cell.classList.add('mine');
      cell.innerText = 'Mine';
    }
  }
}

function markDestination() {
  destinationX = parseInt(document.getElementById('destinationX').value);
  destinationY = parseInt(document.getElementById('destinationY').value);
  const destinationCell = document.querySelector(`[data-position="${destinationX},${destinationY}"]`);
  destinationCell.classList.add('destination');
  destinationCell.innerText = 'Destination';

  const path = findSafestPath(0, 0, destinationX, destinationY, mines);
  markPath(path);
}

function markPath(path) {
  const grid = document.getElementById('grid');
  for (const position of path) {
    const cell = grid.querySelector(`[data-position="${position}"]`);
    cell.classList.add('path');
  }
}

function createGrid() {
  const grid = document.getElementById('grid');

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {


      const cell = document.createElement('div');
      cell.className = `cell`;
      cell.dataset.position = `${col},${row}`;
      cell.innerText = `${col},${row}`;

      if (row === 0 && col === 0) {
        cell.classList.add('start');
        cell.innerText = 'Start';
      }
      grid.appendChild(cell);
    }
  }
}

promptforPositiveIntegerM();
createGrid();
const mines = generateMines();
markMines(mines);

function findSafestPath(startX, startY, destinationX, destinationY, mines) {
  const grid = [];
  const visited = {};
  const distances = {};

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const position = `${col},${row}`;
      grid.push(position);

      visited[position] = false;
      distances[position] = Infinity;
    }
  }

  const start = `${startX},${startY}`;
  const destination = `${destinationX},${destinationY}`;
  distances[start] = 0;

  while (grid.length > 0) {
    grid.sort((a, b) => distances[a] - distances[b]);
    const current = grid.shift();

    if (current === destination) {
      break;
    }

    if (mines[current]) {
      continue;
    }

    const [x, y] = current.split(',').map(Number);

    const neighbors = [
      [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
    ];

    for (const [newX, newY] of neighbors) {
      const neighbor = `${newX},${newY}`;

      if (
        newX >= 0 && newX < 10 && newY >= 0 && newY < 10 &&
        !visited[neighbor] &&
        !mines[neighbor] &&
        distances[current] + 1 < distances[neighbor]
      ) {
        distances[neighbor] = distances[current] + 1;
      }
    }

    visited[current] = true;
  }

  const path = [];
  let current = destination;
  while (current !== start) {
    path.unshift(current);
    const [x, y] = current.split(',').map(Number);

    const neighbors = [
      [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
    ];

    for (const [newX, newY] of neighbors) {
      const neighbor = `${newX},${newY}`;
      if (
        newX >= 0 && newX < 10 && newY >= 0 && newY < 10 &&
        distances[neighbor] === distances[current] - 1
      ) {
        current = neighbor;
        break;
      }
    }
  }

  path.unshift(start);

  return path;
}

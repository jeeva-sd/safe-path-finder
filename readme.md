# Safe Path Finder

This program calculates a safe path on a grid with mines and a destination.

## Usage

1. Open `index.html` in a web browser.
2. Enter the number of number (between 5 and 10) when prompted to calculate mine position.
3. Enter the destination and click mark destination.
4. The program will calculate and display the safest path to the destination.

## Code Explanation

- `promptforPositiveIntegerM`: Prompts the user for the number of mines (M) and ensures it's between 5 and 10.
- `calculateLandminePositions`: Calculates mine coordinates based on M.
- `generateMines`: Generates mines based on calculated coordinates.
- `markMines`: Marks cells containing mines.
- `markDestination`: Marks the chosen destination cell and calculates the safest path.
- `createGrid`: Creates the grid and sets the start cell.
- `findSafestPath`: Finds the safest path using Dijkstra's algorithm.

## Variables

- `M`: Positive integer to create mines using custom algorithm.
- `numberOfMines`: Total number of mines (constant).
- `destinationX`, `destinationY`: Coordinates of the destination cell.
- `mineCoordinatesX`, `mineCoordinatesY`: Arrays containing mine coordinates.
- `A`: Array containing predefined values for mine positions.


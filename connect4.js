/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  for (let i = 0; i < HEIGHT; i++) {
    board.push([])
  } for (let i = 0; i < WIDTH; i++) {
    for (let i = 0; i < HEIGHT; i++) {
      board[i].push(null)
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  const top = document.createElement("tr"); // creating the 'slots' to place pieces
  top.setAttribute("id", "column-top"); // adding id to top variable 
  top.addEventListener("click", handleClick); // handling clicking on the top col to place chip in the slot

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // dynamically making board with (x,y) coordinates to identify the spaces
  // setting all of them with an id

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // write the real version of this, rather than always returning 0
  // Looks gross, use switch statemen? 
  if (board[5][x] === null) {
    return 5;
  } else if (board[4][x] === null) {
    return 4;
  } else if (board[3][x] === null) {
    return 3;
  } else if (board[2][x] === null) {
    return 2;
  } else if (board[1][x] === null) {
    return 1;
  } else if (board[0][x] === null) {
    return 0;
  } else {
    return null;
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add('piece');
  newDiv.classList.add(`p${currPlayer}`);
  const td = document.getElementById(`${y}-${x}`);
  td.appendChild(newDiv);
}

/** endGame: announce game end */

const endGame = (msg) => {
  // TODO: pop up alert message
  window.alert(msg)
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // add line to update in-memory board
  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  if (board.every((val) => { return val === null })) {
    endGame("It's a tie!");
  }
  // switch players
  // switch currPlayer 1 <-> 2 // (MY NOTE: Use ternery?)
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // Essntially chcking for all 4 ways to win
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // only checking for winner if needed
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

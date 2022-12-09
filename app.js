// DOM Elements
const topCells = document.querySelectorAll('.cell.row-top');
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

// columns
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];


// variables
let gameIsLive = true;
let yellowIsNext = true;


// Functions
const getClassListArray = (cell) => {
  const classList = cell.classList;
  return [...classList];
};

const getCellLocation = (cell) => {
  const classList = getClassListArray(cell);
  const rowClass = classList.find(className => className.includes('row'));
  const columnClass = classList.find(className => className.includes('col'));
  const rowIndex = rowClass[4];
  const columnIndex = columnClass[4];
  const rowNumber = parseInt(rowIndex, 10);
  const columnNumber = parseInt(columnIndex, 10);
  return [rowNumber, columnNumber];
};

const getFirstOpenCellForColumn = (columnIndex) => {
  const column = columns[columnIndex];
  const columnWithoutTop = column.slice(0, 6);
  for (const cell of columnWithoutTop) {
    const classList = getClassListArray(cell);
    if (!classList.includes('yellow') && !classList.includes('red')) {
      return cell;
    }
  }
  return null;
};

const clearTopColor = (columnIndex) => {
  const topCell = topCells[columnIndex];
  topCell.classList.remove('yellow');
  topCell.classList.remove('red');
};

const getColorsOfCell = (cell) => {
  const classList = getClassListArray(cell);
  if (classList.includes('yellow')) return 'yellow';
  if (classList.includes('red')) return 'red';
  return null;
};
 
const checkWinningCells = (cells) => {
  if (cells.length < 4) return false;

  gameIsLive = false;
  for (const cell of cells) {
    cell.classList.add('win');
  }
  var obj1 = {"video": {
    "value": "<iframe title='YouTube video player' type=\"text/html\" width='640' height='390' src='<iframe width=",560:"height=",315:" src="https://www.youtube.com/embed/VfX8n14gXeo?clip=Ugkx6SuY4ciyXeoKyamilMIk65etYSuAxC9W&amp;clipt=ELjEDhiQ9g4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' frameborder='0' allowFullScreen></iframe>"
  }};
  var obj2 = {"video": {
    "value": "<iframe title='YouTube video player' type=\"text/html\" width='640' height='390' src='https://youtu.be/BUg4KhMrbyA?t=73' frameborder='0' allowFullScreen></iframe>"
  }};
  
//   document.write(obj2.video.value);
  statusSpan.textContent = `${yellowIsNext ? 'WOLVERINE HAS WON!' : 'SPIDEY HAS WON!'}`
  return true;
  if (statusSpan.textContent  == 'WOLVERINE HAS WON!'){
  document.write(obj1.video.value);
};
};

const checkStatusOfGame = (cell) => {
  const color = getColorsOfCell(cell);
  if (!color) return;
  const [rowIndex, columnIndex] = getCellLocation(cell);

  // Check horizontally
  let winningCells = [cell];
  let rowCheck = rowIndex;
  let columnCheck = columnIndex - 1;
  while (columnCheck >= 0) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      columnCheck--;
    } else {
      break;
    }
  } 

  columnCheck = columnIndex + 1;
  while (columnCheck <= 6) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      columnCheck++;
    } else {
      break;
    }
  } 
  let winningCombo = checkWinningCells(winningCells);
  if (winningCombo) return;


  // Check vertically
  winningCells = [cell];
  rowCheck = rowIndex - 1;
  columnCheck = columnIndex;
  while (rowCheck >= 0) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowCheck--;
    } else {
      break;
    }
  } 
  rowCheck = rowIndex + 1;
  while (rowCheck <= 5) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowCheck++;
    } else {
      break;
    }
  } 
  winningCombo = checkWinningCells(winningCells);
  if (winningCombo) return;


  // Check diagonally /
  winningCells = [cell];
  rowCheck = rowIndex + 1;
  columnCheck = columnIndex - 1;
  while (columnCheck >= 0 && rowCheck <= 5) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowCheck++;
      columnCheck--;
    } else {
      break;
    } 
  }
  rowCheck = rowIndex - 1;
  columnCheck = columnIndex + 1;
  while (columnCheck <= 6 && rowCheck >= 0) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowCheck--;
      columnCheck++;
    } else {
      break;
    } 
  }
  winningCombo = checkWinningCells(winningCells);
  if (winningCombo) return;


  // Check diagonally \
  winningCells = [cell];
  rowCheck = rowIndex - 1;
  columnCheck = columnIndex - 1;
  while (columnCheck >= 0 && rowCheck >= 0) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowCheck--;
      columnCheck--;
    } else {
      break;
    } 
  }
  rowCheck = rowIndex + 1;
  columnCheck = columnIndex + 1;
  while (columnCheck <= 6 && rowCheck <= 5) {
    const cellToCheck = rows[rowCheck][columnCheck];
    if (getColorsOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowCheck++;
      columnCheck++;
    } else {
      break;
    } 
  }
  winningCombo = checkWinningCells(winningCells);
  if (winningCombo) return;

  // Check to see if we have a tie
  const rowsWithoutTop = rows.slice(0, 6);
  for (const row of rowsWithoutTop) {
    for (const cell of row) {
      const classList = getClassListArray(cell);
      if (!classList.includes('yellow') && !classList.includes('red')) {
        return;
      }
    }
  }

  gameIsLive = false;
  statusSpan.textContent = "GAME IS A BUST / TRY AGAIN!";
};



// Event Handlers
const handleCellMouseOver = (e) => {
  if (!gameIsLive) return;
  const cell = e.target;
  const [rowIndex, columnIndex] = getCellLocation(cell);

  const topCell = topCells[columnIndex];
  topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
};

const handleCellMouseOut = (e) => {
  const cell = e.target;
  const [rowIndex, columnIndex] = getCellLocation(cell);
  clearTopColor(columnIndex);
};

const handleCellClick = (e) => {
  if (!gameIsLive) return;
  const cell = e.target;
  const [rowIndex, columnIndex] = getCellLocation(cell);

  const openCell = getFirstOpenCellForColumn(columnIndex);

  if (!openCell) return;

  openCell.classList.add(yellowIsNext ? 'yellow' : 'red');
  checkStatusOfGame(openCell);

  yellowIsNext = !yellowIsNext;
  clearTopColor(columnIndex);
  if (gameIsLive) {
    const topCell = topCells[columnIndex];
    topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
  }
};




// Adding Event Listeners
for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener('mouseover', handleCellMouseOver);
    cell.addEventListener('mouseout', handleCellMouseOut);
    cell.addEventListener('click', handleCellClick);
  }
}

resetButton.addEventListener('click', () => {
  for (const row of rows) {
    for (const cell of row) {
      cell.classList.remove('red');
      cell.classList.remove('yellow');
      cell.classList.remove('win');
    }
  }
  gameIsLive = true;
  yellowIsNext = true;
  statusSpan.textContent = '';
});

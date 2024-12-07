import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));

  //Lai mainītu ciparu secību laukumā
   function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function isValid(board, row, col, num) {
    // Lai pārbaudītu, vai skaitlis ir derīgs konkrētā rindā un kolonnā
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Lai pārbaudītu, vai skaitlis ir derīgs konkrētā 3x3 laukumā
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
  }

  //Lai aizpildītu spēles laukumu
  function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                //Lai mainītu skaitļu secību pirms katras spēles
                let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]); 

                for (let num of numbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (fillBoard(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
  }

  // Lai noņemtu skaitļus, kurus lietotājam būs jāievada
  function removeNumbers(board, emptyCells) {
    let cellsToRemove = emptyCells;

    while (cellsToRemove > 0) {
        // Lai izvēlētos nejaušu šūnu
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        // Lai pārbaudītu, vai šūna nav jau tukša
        if (board[row][col] !== '') {
            board[row][col] = '';
            cellsToRemove--;
        }
    }
  }

  useEffect(() => {
    fillBoard(board);
    removeNumbers(board, 1);
  }, []);

  const inputNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedCell, setSelectedCell] = useState(0);

  // Lai saglabātu izvēlēto šūnu
  function getCell(rowIndex, colIndex) {
    setSelectedCell([rowIndex, colIndex]);
    console.log(rowIndex, colIndex);
    return selectedCell;
  }

  // Lai pievienotu numuru
  function addNumber(inputNumber) {
    console.log(selectedCell[0]);
    const [rowIndex, colIndex] = selectedCell;
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(rowArr => [...rowArr]);
      newBoard[rowIndex][colIndex] = inputNumber;
      return newBoard;
    });
  }

  return (
    <div className='container'>
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${ 
                  (rowIndex + 1) % 3 === 0 ? 'bottom-border' : '' 
                } ${
                  (colIndex + 1) % 3 === 0 ? 'right-border' : ''
                } ${ 
                  (rowIndex + 1) % 3 === 1 ? 'top-border' : '' 
                } ${ 
                  (colIndex + 1) % 3 === 1 ? 'left-border' : '' 
                } ${ 
                  ((rowIndex === selectedCell[0]) && (colIndex === selectedCell[1])) ? 'selected' : '' 
                }`}
                onClick={() => getCell(rowIndex, colIndex)}
              >
                {number}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='numberList'>
        {inputNumbers.map((inputNumber) => (
          <button 
            key={inputNumber} 
            onClick={() => addNumber(inputNumber)}
          >
            {inputNumber}
          </button>
        ))}
      </div>

    </div>
);

}

export default App
